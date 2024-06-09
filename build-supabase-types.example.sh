#!/bin/bash

# chmod 444 build-supabase-types.sh

# Login to Supabase using the provided token
npx supabase login --token <TOKEN>

# Generate TypeScript types for the "public" schema with project ID (Reference ID)
npx supabase gen types typescript --project-id <PROJECT_ID> --schema public > src/types/supabase.ts

echo "Supabase login and type generation completed!"
