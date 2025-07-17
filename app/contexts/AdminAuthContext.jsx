"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if admin is logged in
  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data?.session) {
        // Optionally check if user is admin, e.g. via user metadata or role in DB
        checkIfAdmin(data.session.user).then((isAdmin) => {
          if (isAdmin) setAdmin(data.session.user);
          else supabase.auth.signOut();
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          checkIfAdmin(session.user).then((isAdmin) => {
            if (isAdmin) setAdmin(session.user);
            else {
              setAdmin(null);
              supabase.auth.signOut();
            }
            setLoading(false);
          });
        } else {
          setAdmin(null);
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkIfAdmin(user) {
    // Here you define how to check if user is admin
    // Example: fetch user role from Supabase table 'profiles' or 'admins'
    const { data, error } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .single();

    return !!data && !error;
  }

  async function signIn({ email, password }) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      throw error;
    }
    const isAdmin = await checkIfAdmin(data.user);
    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoading(false);
      throw new Error("Access denied: Not an admin");
    }
    setAdmin(data.user);
    setLoading(false);
  }

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setAdmin(null);
    setLoading(false);
  }

  return (
    <AdminAuthContext.Provider
      value={{ admin, loading, signIn, signOut }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
