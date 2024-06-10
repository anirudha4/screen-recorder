import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function processVideo(chunks: any, fileName: string, format: string, ffmpeg: FFmpeg, isGif: boolean) {
  const type = format.split('.')[1]
  let buffer: any = new Blob(chunks, { type: `video/${type}` });

  /**
   * convert video to gif using ffmpeg
   */
  const outputName = fileName + (isGif ? '.gif' : format);
  if (isGif) {
    const name = fileName + format;
    await ffmpeg.writeFile(name, await fetchFile(buffer));
    await ffmpeg.exec(["-i", name, outputName, "-r", '24']);
    const fileData = await ffmpeg.readFile(outputName);
    const data = new Uint8Array(fileData as ArrayBuffer);
    buffer = new Blob([data.buffer])
  }


  /**
   * locally download the recorded file
   */
  const a = document.createElement('a');
  a.href = URL.createObjectURL(buffer);
  a.download = outputName;
  a.click();

  /**
   * upload video/gif to supabase
   */
  // const formData = new FormData();
  // formData.append('video', videoBlob);
  // formData.append('fileName', fileName);
  // formData.append('format', format);

  // const response = await fetch('/api/record', {
  //     method: 'POST',
  //     body: formData
  // });
  // const data = await response.json();
  // }
  // return data;

}