import { currentUser } from '@clerk/nextjs/server'
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import PostThread from '@/components/forms/PostThread';
const page = async () => {
    const user = await currentUser();
    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <>
            <h1 className='head-text'>Create Thread</h1>
            <PostThread userId={JSON.parse(JSON.stringify(userInfo._id))} />
        </>
    )
}

export default page