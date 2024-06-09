import Navbar from "@/components/navbar"
import { getUser } from "@/lib/user"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const Layout = async ({ children }: Props) => {
    const user = await getUser();
    return (
        <div className="flex flex-col h-screen">
        <Navbar user={user} />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
export default Layout