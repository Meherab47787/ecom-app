'use client';

import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";


import { Heading } from '@/components/ui/heading'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, 
         FormControl, 
         FormField, 
         FormItem, 
         FormLabel, 
         FormMessage
        } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlartModal } from "@/components/modals/alart-modal";

interface SettingsFromProps {
    initialData: Store;
};

const formSchema = z.object({
    name: z.string().min(1)
});

type SettingsFromValues = z.infer<typeof formSchema>;

export const SettingsFrom:React.FC<SettingsFromProps> = ({
    initialData
}) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingsFromValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit =async (data: SettingsFromValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success('Store updated')
            
        } catch (error) {
            toast.error('Something Went Wrong!')
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push('/');
            toast.success('Store deleated successfully!');
        } catch (error) {
            toast.error('Make sure you remove all the products and categories first.')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlartModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title='Settings'
                    description='Manage Store Preferences'
                />
                <Button
                disabled={loading}
                    variant="destructive"
                    size='icon'
                    onClick={() => setOpen(true)}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-col-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store Name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    )
}