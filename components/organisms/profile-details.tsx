import { MiniWrapper } from '../layout'
import ProfileAvatar from '../atoms/profile-avatar'
import { getProfileQuery } from '@/client/queries'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { SignOutButton } from '../atoms'

const getUserDetails = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) notFound()

    return await getProfileQuery(session?.user.id)
}

const ProfileDetails: React.FC = async () => {
    const user = await getUserDetails()

    return (
        <section className='py-4 space-y-4'>
            <MiniWrapper>
                <div className='flex gap-4 flex-row items-center content-center'>
                    <div>
                        <ProfileAvatar avatar={user.avatar} first_name={user.first_name} />
                    </div>

                    <div className='shrink w-full'>
                        <h2 className='text-lg tracking-wide font-medium'>
                            {user.first_name} {user.last_name}
                        </h2>
                        <div>
                            <SignOutButton />
                        </div>
                    </div>

                    <div className='shrink-0'></div>
                </div>
            </MiniWrapper>
        </section>
    )
}

export default ProfileDetails
