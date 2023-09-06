'use client'

type Props = {
    children: React.ReactNode
}

const Grid: React.FC<Props> = ({ children }) => {
    return (
        <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {children}
        </div>
    )
}

export default Grid
