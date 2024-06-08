"use client";
import { displayMediaOptions } from "@/lib/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Alert, AlertTitle } from "./ui/alert";
import { RocketIcon, Video } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


type Props = {}
const ScreenRecorder = ({ }: Props) => {
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    let recorder = null
    async function startCapture(displayMediaOptions: DisplayMediaStreamOptions | undefined) {
        let stream = null;

        try {
            stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            recorder = new MediaRecorder(stream)
            let chunks: any = []

            recorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    chunks.push(event.data)
                }
            }

            recorder.onstop = async () => {
                let data = null;
                /**
                 * Not the best way.
                 * @todo - Needs optimization
                 */
                for (const chunk of chunks) {
                    const videoBlob = new Blob([chunk], { type: 'video/webm' });
                    const formData = new FormData();
                    formData.append('video', videoBlob);
                    formData.append('fileName', fileName);
                    setLoading(true);
                    const response = await fetch('/api/record', {
                        method: 'POST',
                        body: formData
                    });
                    data = await response.json();
                }
                /**
                 * currently we are only handling the last request, if it is successful or not
                 * @todo - We should check for each chunk request and do a rerequest
                 */
                if (data.status !== 'success') {
                    return setError('Something went wrong. Please try again later. Thank You!')
                }
                setSuccess(data.videoUrl)
                setLoading(false);
            }
            recorder.start(200)
        } catch (err) {
            console.error(`Error: ${err}`);
        }
        return stream;
    }

    const handleStartRecording = async () => startCapture(displayMediaOptions);

    return (
        <div className="max-w-[600px] w-full rounded-md border bg-white">
            <p className="font-semibold text-slate-700 p-4 flex items-center gap-3">
                <Video size={22} />
                Screen Recorder
            </p>
            <div className="flex items-center justify-end gap-4 p-4 border-t">
                <Input
                    placeholder="Enter file name"
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                />
                <Button disabled={!fileName || loading} onClick={handleStartRecording} size={'sm'}>
                    {loading ? 'Saving Recording' : 'Start Recording'}
                </Button>
            </div>
            {success && (
                <div className="p-4 border-t">
                    <Alert className="mt-3">
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle>
                            <a target="_blank" href={success}>View recorded video</a>
                        </AlertTitle>
                    </Alert>
                </div>
            )}
            {error && (
                <div className="p-4 border-t">
                    <Alert variant="destructive" className="mt-3">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Oops!</AlertTitle>
                        <AlertTitle>
                            {error}
                        </AlertTitle>
                    </Alert>
                </div>
            )}
        </div>
    )
}
export default ScreenRecorder