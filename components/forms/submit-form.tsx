'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { MiniWrapper, Wrapper } from '../layout'
import { useState, useTransition } from 'react'
import { addSubmission } from '@/client/queries'

const formSchema = z.object({
    url: z.string().url({
        message: 'Submit a valid URL',
    }),
})

const SubmitForm = () => {
    const [isPending, startTransition] = useTransition()
    const [isSubmitted, setSubmitted] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
        },
    })

    const onChange = () => {
        setSubmitted(false)
        setError(false)
    }

    const onSubmit = async ({ url }: z.infer<typeof formSchema>) => {
        startTransition(async () => {
            const action = await addSubmission(url)
            if (action) {
                setSubmitted(true)
            } else {
                setError(true)
            }
        })
    }

    return (
        <div className='py-4'>
            <Wrapper>
                <MiniWrapper>
                    <header className='tracking-wider '>
                        <h2 className='text-2xl  text-gray-950 leading-relaxed font-semibold pb-4'>
                            Submit a Website
                        </h2>
                    </header>
                    <div className='bg-white p-4 shadow-sm rounded-lg'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-8'
                                onChange={onChange}
                            >
                                <FormField
                                    control={form.control}
                                    name='url'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='tracking-wider'>
                                                Website URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='https://example.com'
                                                    {...field}
                                                    className='p-4 h-auto text-xs tracking-widest bg-gray-100 border-none focus-visible:ring-gray-300'
                                                />
                                            </FormControl>
                                            <FormDescription className='text-xs text-gray-400 tracking-widest'>
                                                Please provide the website&apos;s domain only,
                                                rather than a specific page.
                                            </FormDescription>
                                            <FormMessage className='text-xs tracking-widest' />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' disabled={isPending}>
                                    Submit
                                </Button>
                            </form>
                            {isSubmitted && (
                                <div className='mt-4 bg-green-100 text-green-700 p-4 rounded-lg text-xs tracking-widest'>
                                    Website submitted. We&apos;ll review it as soon as possible.
                                </div>
                            )}
                            {isError && (
                                <div className='mt-4 bg-red-100 text-red-700 p-4 rounded-lg text-xs tracking-widest'>
                                    Ops, something went wrong. Try later.
                                </div>
                            )}
                        </Form>
                    </div>
                </MiniWrapper>
            </Wrapper>
        </div>
    )
}

export default SubmitForm
