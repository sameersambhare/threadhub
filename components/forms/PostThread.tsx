"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ThreadValidation } from '@/lib/validations/thread'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { usePathname, useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"
import { createThread } from "@/lib/actions/thread.actions"

const PostThread = ({ userId }: { userId: string }) => {
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        },
    })
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({ text: values.thread, author: userId, communityId: null, path: pathname });
        router.push('/')
    }
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-start gap-10">
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                                <FormLabel className="text-base-semibold text-light-2">
                                    Content
                                </FormLabel>
                                <FormControl className="no-focus bg-dark-3 border-dark-4 border text-light-1">
                                    <Textarea rows={15} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-primary-500">Post Thread</Button>
                </form>
            </Form>
        </div>
    )
}

export default PostThread;