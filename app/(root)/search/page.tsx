import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async() => {
    const user=await currentUser()
    if(!user) return null
    const userInfo=await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')

    //to fetch all the users
    
    return (
       
        <section>
            <h1 className="head-text mb-10">
                Search
            </h1>
        </section>
    )
}

export default page