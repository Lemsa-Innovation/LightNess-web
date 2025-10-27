-- Increase statement timeout for your Supabase project
-- Run this in your Supabase SQL Editor

-- Set timeout for authenticated users (8 seconds default)
ALTER ROLE authenticated SET statement_timeout = '30s';

-- Set timeout for anon users (3 seconds default) 
ALTER ROLE anon SET statement_timeout = '30s';

-- Set timeout for service_role (no default limit)
ALTER ROLE service_role SET statement_timeout = '60s';

