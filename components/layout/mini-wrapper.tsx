'use client'

type Props = {
    children: React.ReactNode
}

const MiniWrapper: React.FC<Props> = ({ children }) => {
    return <div className='px-2 md:px-4 m-auto w-full max-w-lg'>{children}</div>
}

export default MiniWrapper
