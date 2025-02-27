import Link from "next/link"
import Image from "next/image"
interface ThreadCardsProps {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author: {
        name: string,
        image: string,
        id: string,
    },
    community: {
        id: string,
        name: string,
        image: string,
    } | null,
    createdAt: string,
    comments: {
        author: {
            image: string,
        }
    }[]
    isComment?: boolean
}
const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: ThreadCardsProps) => {
    return (
        <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex justify-between items-start">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image src={author.image} alt="Profile image" fill className='cursor-pointer rounded-full' />
                        </Link>
                        <div className="thread-card_bar" />
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-light-1 text-base-semibold">{author.name}</h4>
                        </Link>
                        <p className="text-light-2 mt-2 text-small-regular">{content}</p>
                        <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3 `}>
                            <div className="flex gap-3.5">
                                <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"></Image>
                                <Link href={`/thread/${id}`}><Image src="/assets/reply.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"></Image></Link>
                                <Image src="/assets/repost.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"></Image>
                                <Image src="/assets/share.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"></Image>
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-4 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadCard