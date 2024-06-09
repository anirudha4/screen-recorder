"use server"
import { createClient } from "@/lib/supabase"
import { RecordingType } from "@/types/recording";

export const deleteRecording = async (id: number) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('recordings').delete().eq('id', id).select().single<RecordingType>();
    if(error) return;
    await supabase.storage.from('recordings').remove([data.path]);
}