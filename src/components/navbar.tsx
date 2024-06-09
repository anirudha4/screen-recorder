"use client";
import { displayFont } from "@/app/display-font"
import { getUser } from "@/lib/user"
import classNames from "classnames"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { LogOut } from "lucide-react"
import { User } from "@supabase/supabase-js";
import { signOut } from "@/actions/auth";
import Logo from "./ui/logo";


type Props = {
    user: User | null
}
const Navbar = ({ user }: Props) => {
    const handleLogout = () => signOut();
    return (
        <div className="py-4 px-6 min-h-16 flex items-center border-b bg-white">
            <div className="max-w-[600px] mx-auto w-full flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-4">
                    <div className="font-medium text-sm">
                        {user?.user_metadata.name || user?.email}
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div onClick={handleLogout} className="h-8 w-8 min-h-8 min-w-8 cursor-pointer flex items-center justify-center bg-rose-50 text-destructive rounded-md">
                                    <LogOut size={16} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-sm">Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
            </div>
        </div >
    )
}
export default Navbar