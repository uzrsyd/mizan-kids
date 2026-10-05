# Legacy schema reference — NOT executable migrations

**Do not run any file in this directory against Supabase** (local, staging, or production).

The canonical, executable migration history lives in [`supabase/migrations/`](../../supabase/migrations/)
and is applied only with the Supabase CLI (`supabase db push --linked`).

The files here are design reference for future product schema (profiles, child profiles,
curriculum, progress, email logs, etc.). Their Early Access table definitions are out of
date and do **not** match the live database. When a future milestone needs one of these
tables, write a new forward migration in `supabase/migrations/` instead of running these.
