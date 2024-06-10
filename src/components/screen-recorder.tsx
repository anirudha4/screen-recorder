"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toBlobURL } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { displayMediaOptions } from "@/lib/constants";
import { processVideo } from "@/lib/utils";
import ScreenLoader from "./screen-loader";



type Props = {}
const ScreenRecorder = ({ }: Props) => {
    const [_, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const [activeTab, setActiveTab] = useState('gif');

    const router = useRouter();
    const [conf, setConf] = useState({
        fileName: '',
        format: '.webm'
    })
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    let recorder = null;

    // load ffmpeg wasm
    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = ffmpegRef.current;

        try {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
                wasmURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.wasm`,
                    "application/wasm"
                ),
                workerURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.worker.js`,
                    "text/javascript"
                ),
            });
            setLoaded(true);
        } catch (error: any) {
            console.log("error", error.message);

        }
    };

    async function startCapture(displayMediaOptions: DisplayMediaStreamOptions | undefined) {
        let stream = null;

        try {
            setIsRecording(true);
            stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            recorder = new MediaRecorder(stream)
            let chunks: any = []

            recorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    chunks.push(event.data)
                }
            }

            recorder.onstop = async () => {
                setLoading(true);
                const isGif = activeTab === 'gif'
                await processVideo(chunks, conf.fileName, conf.format, ffmpegRef.current, isGif);
                setLoading(false);
                setConf({ ...conf, fileName: '' })
                setIsRecording(false)
                router.refresh();
            }
            recorder.start(200)
        } catch (err) {
            setIsRecording(false)
        }
        return stream;
    }

    const handleStartRecording = async () => startCapture(displayMediaOptions);

    useEffect(() => {
        load()
    }, []);
    return (
        <div className="max-w-[600px] w-full rounded-md border bg-white">
            {loading && <ScreenLoader message={`Saving ${conf.fileName}${activeTab === 'gif' ? '.gif' : conf.format}`} />}
            <Tabs defaultValue="gif" className="w-full" >
                <div className="px-2 pt-2">
                    <TabsList className="w-full">
                        <TabsTrigger onClick={_ => setActiveTab('gif')} className="flex-1" value="gif">GIF Recorder</TabsTrigger>
                        <TabsTrigger onClick={_ => setActiveTab('video')} className="flex-1" value="video">Video Recorder</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="video">
                    <div className="grid items-center grid-cols-2 gap-4 p-4 border-t">
                        <Input
                            placeholder="Enter recording name. "
                            value={conf.fileName}
                            onChange={e => setConf({ ...conf, fileName: e.target.value })}
                            className="w-full"
                        />
                        <Select value={conf.format} onValueChange={value => setConf({ ...conf, format: value })}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=".mp4">MP4</SelectItem>
                                <SelectItem value=".mkv">MKV</SelectItem>
                                <SelectItem value=".webm">WEBM</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="col-span-2" disabled={!conf.fileName || loading || isRecording} onClick={handleStartRecording} size={'sm'}>
                            {loading ? 'Saving Recording' : 'Start Recording'}
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="gif">
                    <div className="grid items-center grid-cols-1 gap-4 p-4 border-t">
                        <Input
                            placeholder="Enter GIF name"
                            value={conf.fileName}
                            onChange={e => setConf({ ...conf, fileName: e.target.value })}
                            className="w-full"
                        />
                        <Button disabled={!conf.fileName || loading || isRecording} onClick={handleStartRecording} size={'sm'}>
                            {loading ? 'Saving Recording' : 'Start Recording'}
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    )
}
export default ScreenRecorder