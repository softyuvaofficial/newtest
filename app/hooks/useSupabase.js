"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client using env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a React Context for Supabase so you can use it anywhere
const SupabaseContext = createContext();

// Provider component
export function SupabaseProvider({ children }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Custom hook to use Supabase client from context
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within SupabaseProvider");
  }
  return context;
}

// Optional: Hook for auth state management
export function useSupabaseAuth() {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  return { user, session, loading };
}

export { supabase };
