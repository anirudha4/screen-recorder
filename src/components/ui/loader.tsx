import { cn } from "@/lib/utils"
import { RiLoader4Line } from "@remixicon/react"
import classNames from 'classnames'
type Props = {
    size?: number
    className?: string
}
const Loader = ({ size, className }: Props) => {
    return (
        <RiLoader4Line size={size} className={cn(classNames("animate-spin", className))} />
    )
}
export default Loader