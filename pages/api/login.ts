"use server";

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server'; 



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createClient();
    console.log("handled");
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate the incoming data
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Authenticate the user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    // If authentication is successful, return the user data
    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
