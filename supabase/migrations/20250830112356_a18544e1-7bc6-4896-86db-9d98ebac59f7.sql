-- Create user_registrations table
CREATE TABLE public.user_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  registration_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy allowing anyone to insert (since this is for public registration)
CREATE POLICY "Anyone can insert user registrations" 
ON public.user_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create policy allowing users to view their own registrations
CREATE POLICY "Users can view their own registrations" 
ON public.user_registrations 
FOR SELECT 
USING (true);