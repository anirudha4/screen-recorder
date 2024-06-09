"use client";

import { deleteRecording } from "@/actions/recording";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    id: number
}

const DeleteRecording = ({ id }: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        if(loading) return;
        setLoading(true);
        try {
            await deleteRecording(id);
            router.refresh();
        } catch (error) {
            alert('Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    return (
        <span className='px-2 mr-1 h-[80%] flex items-center justify-center rounded-md hover:bg-slate-100' onClick={handleDelete}>
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Trash2 size={16} className='text-slate-700' />
            )}
        </span>
    )
}
export default DeleteRecording