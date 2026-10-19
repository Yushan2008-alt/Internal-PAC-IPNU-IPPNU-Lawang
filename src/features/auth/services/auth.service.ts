import { createClient } from "@/lib/supabase/client";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthProfile {
  id: string;
  full_name: string;
  role: "super_admin" | "departemen" | "user";
  department_id: string | null;
  department_name?: string | null;
  department_code?: string | null;
}

/**
 * Service autentikasi pengguna PAC IPNU IPPNU Lawang
 * Menggunakan Supabase Auth Browser Client
 */
export async function signIn({ email, password }: SignInCredentials) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getCurrentProfile(): Promise<AuthProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      role,
      department_id,
      departments:department_id (
        name,
        code
      )
    `)
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    const meta = user.user_metadata || {};
    return {
      id: user.id,
      full_name: (meta.full_name as string) || user.email || "Pengurus PAC",
      role: (meta.role as "super_admin" | "departemen") || "departemen",
      department_id: (meta.department_id as string) || null,
      department_code: (meta.department_code as string) || null,
    };
  }

  // Typecast relasi department
  const deptData = profile.departments as unknown as { name?: string; code?: string } | null;

  return {
    id: profile.id,
    full_name: profile.full_name,
    role: profile.role,
    department_id: profile.department_id,
    department_name: deptData?.name || null,
    department_code: deptData?.code || null,
  };
}
