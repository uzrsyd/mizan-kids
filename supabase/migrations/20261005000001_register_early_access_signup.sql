CREATE OR REPLACE FUNCTION public.register_early_access_signup(
  p_parent_first_name TEXT,
  p_email TEXT,
  p_normalized_email TEXT,
  p_number_of_children INTEGER,
  p_child_age_ranges JSONB,
  p_learning_interests TEXT[],
  p_referral_source TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_utm_content TEXT DEFAULT NULL,
  p_utm_term TEXT DEFAULT NULL,
  p_referrer_url TEXT DEFAULT NULL,
  p_landing_path TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_signup_id UUID;
BEGIN
  INSERT INTO public.early_access_signups (
    parent_first_name,
    email,
    normalized_email,
    number_of_children,
    child_age_ranges,
    learning_interests,
    referral_source,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    referrer_url,
    landing_path,
    status,
    early_access_eligible,
    confirmation_email_status
  )
  VALUES (
    p_parent_first_name,
    p_email,
    p_normalized_email,
    p_number_of_children,
    COALESCE(p_child_age_ranges, '[]'::jsonb),
    COALESCE(p_learning_interests, '{}'::text[]),
    p_referral_source,
    p_utm_source,
    p_utm_medium,
    p_utm_campaign,
    p_utm_content,
    p_utm_term,
    p_referrer_url,
    p_landing_path,
    'registered',
    true,
    'pending'
  )
  RETURNING id INTO v_signup_id;

  INSERT INTO public.promotional_entitlements (
    email,
    normalized_email,
    user_id,
    promotion_code,
    entitlement_type,
    duration_days,
    source,
    status,
    eligible_at,
    expires_at
  )
  VALUES (
    p_email,
    p_normalized_email,
    NULL,
    'EARLY_ACCESS_30_FREE',
    'full_access_trial',
    30,
    'early_access',
    'eligible',
    NOW(),
    NOW() + INTERVAL '30 days'
  );

  RETURN v_signup_id;
END;
$$;

REVOKE ALL ON FUNCTION public.register_early_access_signup(
  TEXT,
  TEXT,
  TEXT,
  INTEGER,
  JSONB,
  TEXT[],
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT
) FROM PUBLIC, anon, authenticated;
