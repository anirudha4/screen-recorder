import { createClient } from "./supabase"

export const getUser = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return user;
}