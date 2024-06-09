
import { getRecordings } from '@/lib/recording';
import DeleteRecording from './delete-recording';
import { RecordingType } from '@/types/recording';
type Props = {}
const Recordings = async ({ }: Props) => {
    const recordings = await getRecordings();
    return (
        <div className="max-w-[600px] w-full flex flex-col gap-3 mt-4 pt-4 border-t">
            {recordings.length > 0 && (
                <div className="text-lg">
                    Recordings
                </div>
            )}
            {recordings.length === 0 && (
                <div className="text-sm font-medium p-3 bg-slate-100 text-slate-700 border rounded-md">
                    No recordings
                </div>
            )}
            <div className="grid grid-cols-2 gap-2 select-none">
                {recordings.map(file => (
                    <File key={file.id} file={file} />
                ))}
            </div>
        </div >
    )
}
export default Recordings;


export const File = ({ file }: { file: RecordingType }) => {
    return (
        <div title={file.filename} className="truncate flex items-center justify-between cursor-pointer h-10 border rounded-md bg-white w-full border-transparent hover:border-slate-200 transition-all">
            <a
                target='_blank'
                href={file.download_url}
                className='text-sm font-medium text-slate-700 flex-1 h-full flex items-center px-4 truncate'
            >
                {file.filename}
            </a>
            <DeleteRecording id={file.id} />
        </div>
    )
}