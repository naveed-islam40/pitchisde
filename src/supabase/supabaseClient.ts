// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://caqijcexfdbdjxrqbrqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWlqY2V4ZmRiZGp4cnFicnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzcyMDksImV4cCI6MjA2MDc1MzIwOX0.RUwxOghqp8qQnRHgE48u1EzS0OvyKbhFvoxfWacKz1w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);