import UserCard from "@/components/cards/UserCard"
import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async () => {
    const user = await currentUser()
    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')

    const result = await fetchAllUsers({ userId: user.id, searchString: '', pageNumber: 1, pageAmount: 25, sortBy: "desc" });

    return (

        <section>
            <h1 className="head-text mb-10">
                Search
            </h1>
            <div className="mt-14 flex flex-col gap-9">
                {result?.users.length === 0 ? (
                    <p className="no-results">No Users</p>
                ) : (
                    <>
                        {result?.users.map((person) => (
                            <UserCard key={person.id} id={person.id} name={person.name} username={person.username} imgUrl={person.image} personType='User' />
                        ))}
                    </>
                )}

            </div>
        </section>
    )
}

export default page