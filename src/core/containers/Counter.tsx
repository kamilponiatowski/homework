import React from "react";
import { FC, useState } from "react";




class RegularLink extends React.Component<{ to: string, onClick: Function, color: string }>{
    render() {
        return <a>{this.props.children}</a>
    }
}


// /* <RegularLink to="" color="" onClick={() => { }}> */ 
// /* <AutoLink to=""> */ 

// /* HOC - Higher Order Component (mixin) */

const withColor = function (color: string, Component: React.ComponentType<any>) {
    // State
    // Context
    // Component Wrapper (childern)

    return (props: any) => <Component {...props} color={color} />
}

const AutoLink = withColor('hotpink', RegularLink);

<AutoLink to="" onClick={() => { }} />

const withActionState = (Component: React.ComponentType<any>): FC<any> => {
    return (props) => {
        const [counter, setCounter] = useState(0)

        return <Component onClick={() => setCounter(counter + 1)}>{counter}</Component>
    }
}
const Clickable = (props: { children: any, onClick: any }) => <div onClick={props.onClick}>
    {props.children}
</div>;

const Counter = withActionState(Clickable);
<Counter />

// const withColor2 = function <T, C = { color: string }>(color: string, Component: React.ComponentType<T>) {
//     // State
//     // Context
//     // Component Wrapper (childern)

//     return (props: Exclude<typeof Component, C>) => <Component {...props} color={color} />
// }

// const AutoLink2 = withColor2('hotpink', RegularLink);
// <AutoLink2 />


interface Props {

}

export const CounterPage = (props: Props) => {
    return (
        <div>
            <AutoLink to="" onClick={() => { }} >Link</AutoLink>

            <Counter />
        </div>
    )
}
