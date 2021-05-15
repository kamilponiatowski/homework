import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

interface Props {

}

export const NavBar = (props: Props) => {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
                <div className="container">

                    <a className="navbar-brand" href="#">MusicApp</a>

                    <button className="navbar-toggler" type="button" onClick={() => setCollapsed(prev => !prev)}
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={"collapse navbar-collapse " + (collapsed ? '' : 'show')}>
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/playlists" activeClassName="placki active">Playlists</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/search">Search</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/tracks">Tracks</NavLink>
                            </li>
                            {/* <LinkDecorator to="/playlists" className="nav-link" /> */}
                        </ul>
                        <div className="navbar-text ml-auto">
                            <UserWidget />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export const UserWidget = () => {
    const { login, logout, user } = useContext(UserContext)

    return user ?
        <span>Welcome {user.display_name} |
    <span className="text-white" onClick={logout}> Logout</span></span>
        :
        <span>Welcome Guest |
    <span className="text-white" onClick={login}> Login</span></span>
}

{/* <UserContext.Consumer>{({ user, login, logout }) => <>
{user ?
    <span>Welcome {user.display_name} |
    <span className="text-white" onClick={logout}> Logout</span></span>
    :
    <span>Welcome Guest |
    <span className="text-white" onClick={login}> Login</span></span>
}
</>}</UserContext.Consumer> */}




export const LinkDecorator: React.FC<
    { to: string } & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({
    to,
    children,
    ...linkProps
}) => {
        return <a {...linkProps} href={to} onClick={e => {
            e.preventDefault()

            linkProps.onClick && linkProps.onClick(e);

            window.history.pushState('', '', to)
        }} >{children}</a>
    }

const IsADecorator: React.FC<{ tag: string }> = ({ tag, children, ...rest }) => React.createElement(tag, { ...rest }, children)


const FancyInput = forwardRef(function ({ ...restProps }: any, ref: React.Ref<any>) {
    const inputRef = useRef<any>();

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }), []);

    return <div>
        <input ref={inputRef} {...restProps} />
    </div>;
});

{/* <FancyInput ref={mojRef} /> */ }