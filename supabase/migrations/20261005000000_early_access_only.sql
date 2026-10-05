CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.early_access_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  normalized_email TEXT NOT NULL UNIQUE CHECK (length(trim(normalized_email)) > 0),
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

CREATE INDEX IF NOT EXISTS idx_early_access_signups_status ON public.early_access_signups(status);
CREATE INDEX IF NOT EXISTS idx_early_access_signups_created_at ON public.early_access_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_promotional_entitlements_status ON public.promotional_entitlements(status);
CREATE INDEX IF NOT EXISTS idx_promotional_entitlements_created_at ON public.promotional_entitlements(created_at);

ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_entitlements ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.early_access_signups FROM public, anon, authenticated;
REVOKE ALL ON TABLE public.promotional_entitlements FROM public, anon, authenticated;

CREATE TRIGGER set_updated_at_early_access_signups
BEFORE UPDATE ON public.early_access_signups
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_promotional_entitlements
BEFORE UPDATE ON public.promotional_entitlements
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
