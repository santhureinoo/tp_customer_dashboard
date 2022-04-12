import { render } from "react-dom"

export default function Card(Component: any) {

    // // Copy getInitial props so it will run as well
    // if (Component.getInitialProps) {
    //     Session.getInitialProps = Component.getInitialProps;
    // }

    const MyComp = (props: any) => {
        return (<div className="w-full h-full p-4 rounded-lg bg-white drop-shadow-lg">
            <Component {...props}></Component>
        </div>)
    }
    MyComp.displayName = 'MyComp'
    return MyComp;
}