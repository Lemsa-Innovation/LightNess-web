-- Creates a single RPC to update validation flags for washers and funeral companies
-- Execute this in your Supabase SQL editor or migration pipeline

create or replace function public.update_validation_status(
  entity_type text,
  target_uid text,
  new_is_validated_identity boolean default null,
  new_is_validated_certification boolean default null
)
returns void
language plpgsql
security definer
as $$
begin
  -- Authorization: must be signed-in and have admin or super_admin role
  if auth.uid() is null then
    raise exception 'forbidden: not authenticated';
  end if;

  if not exists (
    select 1
    from public.user_roles ur
    where ur.user_id::text = auth.uid()::text
      and ur.role in ('admin','super_admin')
  ) then
    raise exception 'forbidden: insufficient role';
  end if;

  if entity_type = 'washer' then
    update public.washer_profiles
    set
      is_validated_identity = coalesce(new_is_validated_identity, is_validated_identity),
      is_validated_certification = coalesce(new_is_validated_certification, is_validated_certification),
      updated_at = now()
    where uid::text = target_uid;

  elsif entity_type = 'funeral' then
    update public.funeral_company_profiles
    set
      is_validated_identity = coalesce(new_is_validated_identity, is_validated_identity),
      is_validated_certification = coalesce(new_is_validated_certification, is_validated_certification),
      updated_at = now()
    where uid::text = target_uid;

  else
    raise exception 'Unknown entity_type: %', entity_type;
  end if;
end;
$$;

-- Optionally expose via RLS: ensure appropriate policies exist on the tables
-- and grant execute on function to authenticated role if needed:
-- grant execute on function public.update_validation_status(text, text, boolean, boolean) to authenticated;


