
-- ========================================
-- INVITED USERS TABLE
-- ========================================
create table invited_users (
  id uuid primary key default gen_random_uuid(),
  invited_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email text not null,
  token text unique not null,
  expires_at timestamptz not null,
  accepted boolean default false
);