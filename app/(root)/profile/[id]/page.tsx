import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
const page = async ({ params }: { params: { id: string } }) => {
    //check if user id onboarded or not
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect('/onboarding')

    return (
        <section>
            <div>
                <ProfileHeader accountId={userInfo.id} authUserId={user.id} name={userInfo.name} username={userInfo.username} imgUrl={userInfo.image} bio={userInfo.bio} />
            </div>
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => {
                            return (
                                <TabsTrigger key={tab.label} value={tab.value}>
                                    <Image src={tab.icon} alt={tab.label} width={24} height={24} className="object-contain" />
                                    <p className="max-sm:hidden">{tab.label}</p>
                                    {tab.label === 'Threads' && (
                                        <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                            {userInfo?.threads?.length}
                                        </p>
                                    )}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>
                    {
                        profileTabs.map((tab) => (
                            <TabsContent key={tab.label} value="tab.value" className="w-full text-light-1">
                                <ThreadsTab accountId={userInfo.id} currentUserId={user.id} accountType="User" />
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
        </section>
    )
}

export default page