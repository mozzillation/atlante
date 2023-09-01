type Props = {
    children: React.ReactNode
}

const Wrapper: React.FC<Props> = ({ children }) => {
    return <div className='w-full px-2 md:px-4 m-auto'>{children}</div>
}

export default Wrapper
