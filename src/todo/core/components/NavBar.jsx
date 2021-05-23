// import React, { useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { UserContext } from '../contexts/UserContext'


// export const NavBar = (props) => {
//     const [collapsed, setCollapsed] = useState(true)
//     return (
//         <div>
//             <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
//                 <div className="container">

//                     <a className="navbar-brand" href="#">MusicApp</a>

//                     <button className="navbar-toggler" type="button" onClick={() => setCollapsed(prev => !prev)}
//                         aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>

//                     <div className={"collapse navbar-collapse " + (collapsed ? '' : 'show')}>
//                         <ul className="navbar-nav">

//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/playlists" activeClassName="placki active">Playlists</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/search">Search</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/tracks">Tracks</NavLink>
//                             </li>
//                             {/* <LinkDecorator to="/playlists" className="nav-link" /> */}
//                         </ul>
//                         <div className="navbar-text ml-auto">
//                             <UserWidget />
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// }