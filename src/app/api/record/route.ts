import { NextResponse } from "next/server";
import fs from 'fs'
import os from 'os'
import path from 'path';
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const video: any = formData.get('video');
        const fileName: any = formData.get('fileName');
        const buffer = await video.arrayBuffer();
        
        const path = `./public/records/${fileName}.webm`
        if(fs.existsSync(path)) {
            fs.appendFileSync(path, Buffer.from(buffer));
        } else {
            fs.writeFileSync(path, Buffer.from(buffer));
        }

        return NextResponse.json({ status: "success", videoUrl: `http://localhost:3000/records/${fileName}.webm` })
    }
    catch (e: any) {
        return NextResponse.json({ status: "fail", data: e })
    }
}