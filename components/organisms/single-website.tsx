import { MiniWrapper, Wrapper } from '../layout'
import { imageUrl } from '@/lib/image'
import Image from 'next/image'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import { getWebsiteQuery } from '@/client/queries'
import SaveButton from '../cards/website/save-button'

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

                        <div className=''>
                            <a
                                href={`${website.url}/?ref=atlante.gallery`}
                                target='_blank'
                                rel='noreferrer noopener'
                                className='border-b border-gray-200 text-lg text-gray-500 leading-relaxed transition-colors hover:border-gray-300 '
                            >
                                {website.url}
                            </a>
                        </div>
                    </header>
                </MiniWrapper>
                <Wrapper>
                    {website.thumbnail && (
                        <figure className='w-full max-w-6xl bg-gray-100 aspect-video rounded-lg relative shadow-lg overflow-hidden m-auto hover:-translate-y-1 transition-transform'>
                            <a
                                href={`${website.url}/?ref=atlante.gallery`}
                                target='_blank'
                                rel='noreferrer noopener'
                                className='hover:opacity-90 transition-opacity'
                            >
                                <Image
                                    src={imageUrl(website.thumbnail, 'large')}
                                    alt={`Screenshot of ${website.url}`}
                                    fill={true}
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    priority
                                    placeholder='blur'
                                    blurDataURL={website.blurData ?? undefined}
                                />
                            </a>
                        </figure>
                    )}
                </Wrapper>
                <MiniWrapper>
                    <div className='flex flex-row justify-between items-center content-center'>
                        <div className='text-xs text-gray-400 leading-relaxed tracking-wider'>
                            Saved {website.save.length}{' '}
                            {website.save.length === 1 ? 'time' : 'times'}
                        </div>
                        <div>
                            <SaveButton isSaved={website.isSaved} website_id={website.id} />
                        </div>
                    </div>
                </MiniWrapper>
            </div>
        </section>
    )
}

export default SingleWebsite
