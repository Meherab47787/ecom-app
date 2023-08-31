'use client';

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { AlertModal } from "@/components/modals/alart-modal";

interface CellActionProps {
    data: BillboardColumn;
}


export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const router = useRouter();
    const params = useParams();


    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Billboard ID copied to clipboard');
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            router.refresh();
            toast.success('Billboard deleated successfully!');
        } catch (error) {
            toast.error('Make sure you remove all categories using this billboard.')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menue</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}