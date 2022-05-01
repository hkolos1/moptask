import React, {useEffect, useState} from 'react'
import {Link, useLocation } from "react-router-dom";
import {getUser} from "../../utils/user";


const Nav = () => {

    const [items, setItems] = useState([]);
    const {pathname} = useLocation();

    const updateItems = () => {
        let tempItems = [];

        tempItems.push({
            header: 'Home',
            to: '/homepage'
        });

        if(getUser()) {
            tempItems.push({
                header: 'My Questions',
                to: '/myquestions'
            });
            tempItems.push({
                header: 'Add Question',
                to: '/add-question'
            })
            tempItems.push({
                header: 'Logout',
                onClick: logout,
                to: '/login'
            });
        } else {
            if(pathname === '/login') {
                tempItems.push({
                    header: 'Register',
                    to: '/register'
                });
            }
            else {
                tempItems.push({
                    header: 'Login',
                    to: '/login'
                });
            }
        }
        setItems(tempItems);
    }

    const logout = () => {
        localStorage.removeItem('user');
    }


    useEffect(() => {
        updateItems();
    }, [pathname]);


    /* if (props.name === '') {
         menu = (
             <ul className="navbar-nav mr-auto">
                 <li className="nav-item">
                     <Link className="nav-link" to={"/homepage"}>Home</Link>
                 </li>

                 <li className="nav-item">
                     <Link className="nav-link" to={"/register"}>Register</Link>
                 </li>

                 <li className="nav-item">
                     <Link className="nav-link" to={"/login"}>Login</Link>
                 </li>

             </ul>
         )
     }

     else {
         menu = (
             <ul className="navbar-nav mr-auto">
                 <li className="nav-item">
                     <Link className="nav-link" to={"/homepage"}>Home</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to={"/myquestions"}>My Questions</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to={"/questions"}>Questions</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to={"/profile"}>Profile</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to={"/login"} onClick={logout}>Logout</Link>
                 </li>
             </ul>
         )
     } */

    return (
        <nav className="navbar navbar-expand-md navbar-light">
            <div className="container">
                <Link className="navbar-brand" to={"/homepage"}>MoP Task</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto">
                        {items.map((item) => <li key={item.to} className='nav-item'>
                            <Link  onClick={item.onClick || null} className='nav-link' to={item.to || '/homepage'}>{item.header}</Link>
                        </li> )}
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Nav
