"use server"

import { PATHS } from "@/constants/paths";
import { createClient } from "@/lib/supabase"
import { Provider } from "@supabase/supabase-js";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInWithOAuth = async (provider: Provider) => {
    const supabase = createClient();
    const { data } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: `${headers().get('origin')}/auth/callback`,
        },
    });
    if (data.url) {
        return redirect(data.url)
    }
    throw new Error('Something went wrong!')
}


export const signOut = async () => {
    const supabase = createClient();
    cookies().delete('user_id')
    await supabase.auth.signOut();
    redirect(PATHS.AUTH)
}