import { MiniWrapper } from '../layout'
import { imageUrl } from '@/utils/image'
import Image from 'next/image'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import { getWebsiteQuery } from '@/client/queries'

dayjs.extend(relativeTime)

type Props = {
    id: string
}

const SingleWebsite: React.FC<Props> = async ({ id }) => {
    const website = await getWebsiteQuery(id)

    return (
        <section id='website' data-id={website.id} className='py-4'>
            <div className='flex justify-center flex-col space-y-4 items-center content-center'>
                <MiniWrapper>
                    <header className='tracking-wider'>
                        <div className='text-xs text-gray-400 leading-relaxed'>
                            {dayjs(website.date_created).fromNow()}
                        </div>
                        <h1 className='text-2xl  text-gray-950 leading-relaxed font-semibold'>
                            {website.name}
                        </h1>
                        {website.description && (
                            <div className='text-lg text-gray-500 leading-relaxed'>
                                {website.description}
                            </div>
                        )}
                    </header>
                </MiniWrapper>
                {website.thumbnail && (
                    <figure className='w-full max-w-6xl bg-gray-100 aspect-video rounded-md relative border border-gray-200 overflow-hidden'>
                        <Image
                            src={imageUrl(website.thumbnail, 'large')}
                            alt={`Screenshot of ${website.url}`}
                            fill={true}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            priority
                            placeholder='blur'
                            blurDataURL={website.blurData ?? undefined}
                        />
                    </figure>
                )}
            </div>
        </section>
    )
}

export default SingleWebsite
