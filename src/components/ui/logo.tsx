import { displayFont } from "@/app/display-font"
import classNames from "classnames"

type Props = {}
const Logo = ({ }: Props) => {
    return (
        <div className={classNames(displayFont.className, "font-medium text-primary")}>
            <span className="text-xs">B</span>
            <span className="text-sm">O</span>
            <span className="text-md">O</span>
            <span className="text-lg">O</span>
            <span className="text-xl">O</span>
            <span className="text-2xl">M</span>
            <span className="text-3xl">!</span>
        </div>
    )
}
export default Logo