import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Container from '../container/Container';
import {Logo , LogoutBtn} from '../index'

const Header = () => {

    const islogin = useSelector((state) => state.auth.status)


    const navItems =[
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !islogin,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !islogin,
        },
        {
            name: "All posts",
            slug: "/all-posts",
            active: islogin,
        },
        {
            name: "Add post",
            slug: "/add-posts",
            active: islogin,
        }
    ]

    return(
        <Container>
            <nav className='flex'>
            <div>
                <Link to="/">
                    <Logo/>
                </Link>
                
            </div>

            <div>
                    <ul className='flex ml-auto'>
                        {navItems.map((navItem) => 
                            navItem.active ? (
                                <li key={navItem.name}>
                                    <button 
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    onClick={() => Navigate(navItem.slug)} >
                                        {navItem.name}
                                    </button>

                                </li>
                            ) : null
                        )}
                    </ul>

                    (!islogin && (
                        <li>
                            <LogoutBtn/>
                        </li>
                        
                    ))
            </div>
        </nav>
        </Container>
        
    )
}


export default Header