import { PATHS } from "@/constants/paths";
import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function GET(request: NextRequest) {
    
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;
    if (code) {
        const supabase = createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(`${origin}${PATHS.DASHBAORD}`);
}