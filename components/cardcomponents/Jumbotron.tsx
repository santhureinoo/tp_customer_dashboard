interface Props {
    children : any;
}
const Jumbotron = ({children}: Props) : JSX.Element => {
    return (
        <div className=" w-full h-full border-2 rounded-lg mx-auto text-center p-6">
            {children}
        </div>
    )
}

export default Jumbotron;