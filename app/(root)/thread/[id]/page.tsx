import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
const page = async ({params }: {params: { id: string } }) => {
    if (!params.id) return null
    const user = await currentUser();
    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')
    const thread = await fetchThreadById(params.id)
    return (
        <section className="relative ">
            <div className="">
                <ThreadCard key={thread._id} id={thread._id} parentId={thread.parentId} content={thread.text} author={thread.author} community={thread.community} createdAt={thread.createdAt} comments={thread.children} currentUserId={user?.id || ""} />
            </div>
            <div className="mt-7 ">
                <Comment threadId={thread.id} currentUserImage={user.imageUrl} currentUserId={JSON.stringify(userInfo._id)} />
            </div>
        </section>
    )
}

export default page