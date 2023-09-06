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
        <div className='py-4 h-full'>
            <Wrapper>
                <MiniWrapper>
                    <header className='tracking-wider'>
                        <h2 className='text-2xl leading-relaxed font-medium pb-4'>
                            Submit a Website
                        </h2>
                    </header>
                    <div className='bg-white p-4 border rounded-lg'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-4'
                                onChange={onChange}
                            >
                                <FormField
                                    control={form.control}
                                    name='url'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='https://example.com'
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage className='text-xs tracking-widest' />
                                            <FormDescription>
                                                Please provide the website&apos;s domain only,
                                                rather than a specific page.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' disabled={isPending}>
                                    Submit
                                </Button>
                                {isSubmitted && (
                                    <div className='mt-4 bg-success text-success-foreground p-4 rounded-lg text-xs tracking-widest'>
                                        Website submitted. We&apos;ll review it as soon as possible.
                                    </div>
                                )}
                                {isError && (
                                    <div className='mt-4 bg-destructive text-destructive-foreground p-4 rounded-lg text-xs tracking-widest'>
                                        Ops, something went wrong. Try later.
                                    </div>
                                )}
                            </form>
                        </Form>
                    </div>
                </MiniWrapper>
            </Wrapper>
        </div>
    )
}

export default SubmitForm
