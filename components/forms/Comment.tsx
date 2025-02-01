"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { CommentValidation } from "@/lib/validations/thread"
import { Input } from "../ui/input"
import Image from "next/image"
import { addCommentToThread } from "@/lib/actions/thread.actions"
import { usePathname, useRouter } from "next/navigation"

interface CommentProps {
    threadId: string,
    currentUserImage: string,
    currentUserId: string,
}


const Comment = ({ threadId, currentUserImage, currentUserId }: CommentProps) => {

    const pathname = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        },
    })
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
        form.reset()
    }
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="comment-form">

                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3 w-full">
                                <FormLabel>
                                    <Image src={currentUserImage} alt='Profile Image' width={48} height={48} className="rounded-full object-cover"></Image>
                                </FormLabel>
                                <FormControl className="bg-transparent border-none">
                                    <Input placeholder="Comment..." type="text" className="text-light-1 no-focus outline-none" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="comment-form_btn">Reply</Button>
                </form>
            </Form>
        </div>
    )
}

export default Comment