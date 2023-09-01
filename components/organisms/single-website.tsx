'use client'

import { WebsiteWithSaves } from '@/types'
import { fetcher } from '@/utils/fetcher'
import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import useSWR from 'swr'
import { MiniWrapper } from '../layout'
import { imageUrl, placeholderUrl } from '@/utils/image'
import Image from 'next/image'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Props = {
    id: string
}

const SingleWebsite: React.FC<Props> = ({ id }) => {
    const { data } = useSession()

    const {
        data: website,
        isLoading,
        error,
    } = useSWR<WebsiteWithSaves>(id ? '/api/website/' + id : null, fetcher)

    if (error) notFound()
    if (isLoading) return <div>is loading</div>

    if (!website) notFound()

    return (
        <section id='website' data-id={website.id} className='py-4'>
            <div className='flex justify-center flex-col gap-10 items-center content-center'>
                <MiniWrapper>
                    <header className='tracking-wider'>
                        <div className='text-xs text-gray-400 leading-relaxed'>
                            {dayjs(website.date_created).fromNow()}
                        </div>
                        <h1 className='text-2xl  text-gray-950 leading-relaxed font-semibold'>
                            {website.name}
                        </h1>
                        <div className='text-lg text-gray-500 leading-relaxed'>
                            Subtitle goes here
                        </div>
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
                        />
                    </figure>
                )}
            </div>
        </section>
    )
}

export default SingleWebsite
