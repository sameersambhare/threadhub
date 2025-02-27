import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"

interface ThreadsTabProps {
    accountId: string,
    currentUserId: string,
    accountType: string,
}

const ThreadsTab = async ({ accountId, currentUserId, accountType }: ThreadsTabProps) => {
    const results = await fetchUserPosts(accountId)
    if (!results) redirect('/')
    return (
        <section className="mt-9 flex flex-col gap-10">
            {results.threads.map((thread: any) => (
                <ThreadCard key={thread._id} id={thread._id} parentId={thread.parentId} content={thread.text} author={accountType === 'User' ? { name: results.name, image: results.image, id: results.id } : { name: thread.author.name, image: thread.author.image, id: thread.author.id }} community={thread.community} createdAt={thread.createdAt} comments={thread.children} currentUserId={currentUserId} />
            ))}
        </section>
    )
}

export default ThreadsTab