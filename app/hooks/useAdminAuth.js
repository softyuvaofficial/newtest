import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "@/utils/supabaseClient";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const auth = useProvideAdminAuth();
  return (
    <AdminAuthContext.Provider value={auth}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

function useProvideAdminAuth() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  async function checkIfAdmin(user) {
    if (!user) return false;
    try {
      // Example: Assuming you have a 'role' column in your 'users' table
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data.role === "admin";
    } catch (error) {
      console.error("Admin check error:", error);
      return false;
    }
  }

  // Listen to auth state changes
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const isAdmin = await checkIfAdmin(session.user);
        if (isAdmin) setAdmin(session.user);
        else setAdmin(null);
      } else {
        setAdmin(null);
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const isAdmin = await checkIfAdmin(session.user);
          if (isAdmin) setAdmin(session.user);
          else setAdmin(null);
        } else {
          setAdmin(null);
        }
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Admin login via email/password
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

    // Check if the user is admin
    const isAdmin = await checkIfAdmin(data.user);
    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoading(false);
      throw new Error("Access denied. Not an admin user.");
    }

    setAdmin(data.user);
    setLoading(false);
    return data;
  }

  // Admin logout
  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
      throw error;
    }
    setAdmin(null);
    setLoading(false);
  }

  return {
    admin,
    loading,
    signIn,
    signOut,
  };
}
