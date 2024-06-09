import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import { getUser } from "@/lib/user";
import { CreateRecordingType } from "@/types/recording";

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user)
            return NextResponse.json({ status: 'Unauthorized' });
        const formData = await req.formData();
        const video: any = formData.get('video');
        const fileName: any = formData.get('fileName')
        const format: any = formData.get('format');
        const arrayBuffer = await video.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const supabase = createClient();
        const type = format.split('.')[1]
        const { data, error } = await supabase.storage.from('recordings').upload(`${user?.id}/${fileName}${format}`, buffer, {
            contentType: `video/${type}`
        });
        if (error) {
            console.log(error);
            return NextResponse.json({ status: "failure", error: 'Something went wrong' });
        }

        const { data: { publicUrl } } = supabase.storage.from('recordings').getPublicUrl(data.path);
        const recording: CreateRecordingType = {
            download_url: publicUrl,
            filename: fileName + Date.now() + format,
            user_id: user.id,
            path: data.path
        }
        await supabase.from('recordings').insert(recording);
        return NextResponse.json({ status: "success" });
    }
    catch (e: any) {
        return NextResponse.json({ status: "failure", data: e })
    }
}