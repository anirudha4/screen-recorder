import Image from "next/image"

type Props = {
    src?: string
    fallback?: string
}
const Avatar = ({ fallback, src }: Props) => {
    return (
        <div className="overflow-hidden flex items-center justify-center h-[32px] w-[32px] min-w-[32px] rounded bg-primary text-slate-100 font-medium uppercase">
            {(src) && <Image src={src} width={32} height={32} alt="avatar" />}
            {(fallback && !src) && fallback}
        </div>
    )
}
export default Avatar