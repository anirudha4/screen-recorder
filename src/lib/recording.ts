"use server"
import { PATHS } from '@/constants/paths';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from './supabase';
import { RecordingType } from '@/types/recording';


export const getRecordings = async () => {
    const supabase = await createClient();
    const userId = cookies().get('user_id');
    if (!userId?.value) {
        redirect(PATHS.AUTH);
    }

    const { data: recordings, error } = await supabase.from('recordings').select('*').eq('user_id', userId.value).returns<RecordingType[]>();

    if (error) {
        return []
    }

    return recordings;
}