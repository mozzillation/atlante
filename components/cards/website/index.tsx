'use client'

import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { website } from '@prisma/client'
import { imageUrl } from '@/utils/image'

import SaveButton from './save-button'

dayjs.extend(relativeTime)

type Props = website & {
    isSaved: boolean
    user_id: string | undefined
}

const WebsiteCard: React.FC<Props> = ({
    id,
    user_id,
    name,
    isSaved,
    thumbnail,
    url,
    date_created,
}) => {
    return (
        <article
            id='website'
            key={id}
            className='bg-white rounded-md overflow-hidden tracking-wide border-2 border-gray-50'
        >
            <header className='p-3 flex flex-row justify-between'>
                <Link href={`/w/${id}`}>
                    <div className='text-xs font-semibold hover:text-gray-500 transition-colors'>
                        {name}
                    </div>
                </Link>
                <time className='text-xs text-gray-400'>{dayjs(date_created).fromNow()}</time>
            </header>
            <figure className='aspect-video bg-gray-50 relative border-t border-b border-gray-100'>
                {thumbnail && (
                    <Image
                        src={imageUrl(thumbnail, 'thumbnail')}
                        fill={true}
                        alt={`Screenshot of ${url}`}
                    />
                )}
            </figure>
            <footer className='p-3 flex flex-row justify-between content-center items-center'>
                <SaveButton isSaved={isSaved} user_id={user_id} website_id={id} />
            </footer>
        </article>
    )
}

export default WebsiteCard
