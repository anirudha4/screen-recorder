import { PATHS } from "@/constants/paths"
import { getUser } from "@/lib/user"
import isEmpty from "lodash.isempty"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const AuthLayout = async ({ children }: Props) => {
    const user = await getUser();
    if(!isEmpty(user)) redirect(PATHS.DASHBAORD)
    return (
        <div>{children}</div>
    )
}
export default AuthLayout