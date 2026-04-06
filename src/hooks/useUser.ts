"use client";

import { User } from "@supabase/supabase-js"; // optional for typing
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // fetch user once
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user ?? null);
      } catch (error) {
        console.log("Error in useUser hook:", error);
      }
    };

    fetchUser();

    // subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // cleanup
    return () => subscription.unsubscribe();
  }, []);

  return user;
};
