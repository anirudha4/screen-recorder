import Loader from "./ui/loader"

type Props = {
    message?: string
}
const ScreenLoader = ({ message }: Props) => {
    return (
        <div className="z-50 fixed h-screen top-0 left-0 w-full bg-slate-800 bg-opacity-50 flex flex-col justify-center items-center">
            <Loader size={50} />
            {message && <p className="mt-5 text-lg font-semibold">
                {message}
            </p>}
        </div>
    )
}
export default ScreenLoader