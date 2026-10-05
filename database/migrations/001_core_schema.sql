-- LEGACY REFERENCE ONLY. DO NOT RUN AGAINST SUPABASE.
-- Canonical executable migrations live in supabase/migrations/.
-- See database/migrations/README.md.

CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE,
  email CITEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'parent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  age INTEGER CHECK (age BETWEEN 3 AND 18),
  avatar_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.early_access_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  normalized_email TEXT NOT NULL UNIQUE,
  number_of_children INTEGER NOT NULL CHECK (number_of_children >= 1),
  child_age_ranges JSONB NOT NULL DEFAULT '[]'::jsonb,
  learning_interests TEXT[] NOT NULL DEFAULT '{}',
  referral_source TEXT NULL,
  utm_source TEXT NULL,
  utm_medium TEXT NULL,
  utm_campaign TEXT NULL,
  utm_content TEXT NULL,
  utm_term TEXT NULL,
  referrer_url TEXT NULL,
  landing_path TEXT NULL,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (
    status IN ('registered', 'beta_invited', 'beta_activated', 'launch_invited', 'activated', 'declined')
  ),
  early_access_eligible BOOLEAN NOT NULL DEFAULT true,
  confirmation_email_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    confirmation_email_status IN ('pending', 'sent', 'failed', 'suppressed')
  ),
  confirmation_email_sent_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.promotional_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  normalized_email TEXT NOT NULL,
  user_id UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  promotion_code TEXT NOT NULL,
  entitlement_type TEXT NOT NULL,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  source TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'eligible' CHECK (
    status IN ('eligible', 'activated', 'expired', 'revoked')
  ),
  eligible_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activated_at TIMESTAMPTZ NULL,
  expires_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (normalized_email, promotion_code)
);

CREATE TABLE IF NOT EXISTS email_suppressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_email CITEXT NOT NULL,
  email_category TEXT NOT NULL,
  suppressed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reason TEXT,
  source TEXT,
  UNIQUE (normalized_email, email_category)
);

CREATE TABLE IF NOT EXISTS email_delivery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_key TEXT NOT NULL UNIQUE,
  recipient_email CITEXT NOT NULL,
  template_name TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_message_id TEXT,
  status TEXT NOT NULL,
  error_detail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (subject_id, slug)
);

CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (domain_id, slug)
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_code TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id),
  domain_id UUID REFERENCES domains(id),
  unit_id UUID REFERENCES units(id),
  title TEXT NOT NULL,
  description TEXT,
  learning_objective TEXT,
  age_min INTEGER,
  age_max INTEGER,
  learning_band TEXT,
  difficulty TEXT,
  skill_type TEXT,
  mastery_target INTEGER,
  diagnostic_eligible BOOLEAN NOT NULL DEFAULT FALSE,
  requires_image BOOLEAN NOT NULL DEFAULT FALSE,
  requires_audio BOOLEAN NOT NULL DEFAULT FALSE,
  arabic_required BOOLEAN NOT NULL DEFAULT FALSE,
  memorization_focus BOOLEAN NOT NULL DEFAULT FALSE,
  source_basis TEXT,
  source_reference TEXT,
  madhhab_sensitivity TEXT,
  review_priority INTEGER,
  content_status TEXT,
  religious_review_status TEXT,
  access_tier TEXT,
  search_tags TEXT[],
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (subject_id, slug)
);

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  prompt_arabic TEXT,
  transliteration TEXT,
  image_url TEXT,
  audio_url TEXT,
  explanation TEXT,
  difficulty TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  source_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_arabic TEXT,
  image_url TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  prerequisite_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (skill_id, prerequisite_skill_id)
);

CREATE TABLE IF NOT EXISTS skill_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  recommended_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (skill_id, recommended_skill_id)
);

CREATE INDEX IF NOT EXISTS idx_profiles_auth_user_id ON profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_child_profiles_parent_user_id ON child_profiles(parent_user_id);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_status ON public.early_access_signups(status);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_created_at ON public.early_access_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_promotional_entitlements_status ON public.promotional_entitlements(status);
CREATE INDEX IF NOT EXISTS idx_promotional_entitlements_created_at ON public.promotional_entitlements(created_at);
CREATE INDEX IF NOT EXISTS idx_email_suppressions_email ON email_suppressions(normalized_email);
CREATE INDEX IF NOT EXISTS idx_questions_skill_id ON questions(skill_id);
CREATE INDEX IF NOT EXISTS idx_question_options_question_id ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_skills_subject_id ON skills(subject_id);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_suppressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_delivery_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can read all early access signups"
ON public.early_access_signups
FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can read all promo entitlements"
ON public.promotional_entitlements
FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE TRIGGER set_updated_at_early_access_signups
BEFORE UPDATE ON public.early_access_signups
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_promotional_entitlements
BEFORE UPDATE ON public.promotional_entitlements
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Users can read own child profiles"
ON child_profiles
FOR SELECT
USING (
  parent_user_id = (
    SELECT id FROM profiles WHERE auth_user_id = auth.uid()
  ) OR auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Users can insert own child profiles"
ON child_profiles
FOR INSERT
WITH CHECK (
  parent_user_id = (
    SELECT id FROM profiles WHERE auth_user_id = auth.uid()
  ) OR auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Users can update own child profiles"
ON child_profiles
FOR UPDATE
USING (
  parent_user_id = (
    SELECT id FROM profiles WHERE auth_user_id = auth.uid()
  ) OR auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
  parent_user_id = (
    SELECT id FROM profiles WHERE auth_user_id = auth.uid()
  ) OR auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admin can read email suppressions"
ON email_suppressions
FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can insert email suppression"
ON email_suppressions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin can read email delivery logs"
ON email_delivery_logs
FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can insert delivery logs"
ON email_delivery_logs
FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'admin');
