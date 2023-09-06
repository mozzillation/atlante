import { MiniWrapper, Wrapper } from '../layout'
import { imageUrl } from '@/lib/image'
import Image from 'next/image'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import { getWebsiteQuery } from '@/client/queries'
import SaveButton from '../cards/website/save-button'
import { CategoryPill } from '../atoms'

dayjs.extend(relativeTime)

type Props = {
    id: string
}

const SingleWebsite: React.FC<Props> = async ({ id }) => {
    const website = await getWebsiteQuery(id)

    const styles = website.website_category.filter((i) => i.category.collection === 'style')
    const types = website.website_category.filter((i) => i.category.collection === 'type')

    return (
        <section id='website' data-id={website.id} className='py-4'>
            <div className='flex justify-center flex-col space-y-4 items-center content-center'>
                <MiniWrapper>
                    <header className='tracking-wider'>
                        <div className='text-xs text-tertiary leading-relaxed'>
                            {dayjs(website.date_created).fromNow()}
                        </div>
                        <h1 className='text-2xl leading-relaxed font-medium'>{website.name}</h1>

                        <div className=''>
                            <a
                                href={`${website.url}/?ref=atlante.gallery`}
                                target='_blank'
                                rel='noreferrer noopener'
                                className='text-lg text-secondary leading-relaxed transition-colors hover:text-accent'
                            >
                                {website.url}
                            </a>
                        </div>
                        <div className='flex flex-row justify-between items-center content-center'>
                            <div className='text-xs text-tertiary leading-relaxed tracking-widest'>
                                Saved {website.save.length}{' '}
                                {website.save.length === 1 ? 'time' : 'times'}
                            </div>
                            <div>
                                <SaveButton isSaved={website.isSaved} website_id={website.id} />
                            </div>
                        </div>
                    </header>
                </MiniWrapper>
                <Wrapper>
                    {website.thumbnail && (
                        <figure className='w-full max-w-6xl bg-border border aspect-video rounded-lg relative shadow-lg overflow-hidden m-auto hover:-translate-y-1 transition-transform'>
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
                    <div className='space-y-4'>
                        {types && (
                            <div className='space-y-2'>
                                <div className='text-tertiary text-xs tracking-widest'>Type</div>
                                <div className='flex gap-1 flex-wrap'>
                                    {types.map((type, index) => (
                                        <CategoryPill
                                            key={index}
                                            name={type.category.name}
                                            collection={type.category?.collection}
                                            slug={type.category?.slug}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {styles && (
                            <div className='space-y-2'>
                                <div className='text-tertiary text-xs tracking-widest'>Style</div>
                                <div className='flex gap-1 flex-wrap'>
                                    {styles.map((style, index) => (
                                        <CategoryPill
                                            key={index}
                                            name={style.category.name}
                                            collection={style.category?.collection}
                                            slug={style.category?.slug}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </MiniWrapper>
            </div>
        </section>
    )
}

export default SingleWebsite
