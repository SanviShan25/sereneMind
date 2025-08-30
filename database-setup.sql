-- Create user_registrations table in Supabase
-- Run this SQL in your Supabase SQL editor

CREATE TABLE user_registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  registration_date date NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE user_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting new registrations
CREATE POLICY "Anyone can insert registrations" ON user_registrations
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading registrations (for admin purposes)
CREATE POLICY "Anyone can read registrations" ON user_registrations
  FOR SELECT USING (true);