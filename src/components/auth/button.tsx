"use client"
import { signInWithOAuth } from "@/actions/auth"
import { RiGithubFill, RiGoogleFill, RiNotionFill } from "@remixicon/react"
import { HTMLAttributes, ReactNode, useState } from "react"
import Loader from "../ui/loader"
import { Provider } from "@supabase/supabase-js"
import { NotionLogoIcon } from "@radix-ui/react-icons"

interface Props extends HTMLAttributes<HTMLButtonElement> {
    social: Provider
}
export const ICON_MAP: Record<string, ReactNode> = {
    'google': <RiGoogleFill size={18} />,
    'github': <RiGithubFill size={18} />,
    'notion': <RiNotionFill size={18} />,
}
const AuthButton = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);
        try {
            await signInWithOAuth(props.social)
        } catch (err) {
            setLoading(false)
        }
    }
    return (
        <button onClick={handleClick} className="cursor-pointer text-center text-sm font-medium text-primary flex items-center justify-center py-2 gap-2">
            {loading ? <Loader size={16} /> : <NotionLogoIcon />}
            <span>
                Continue with Notion
            </span>
        </button>
    )
}
export default AuthButton