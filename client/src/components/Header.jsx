import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom' // will go to specified page without refreshing
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'


const Header = () => {
    const path = useLocation().pathname;
  return (
    <div>
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-x; font-semibold dark:text-white'>
            <span className='px-2 py-1'>The Algorithmic</span>
            Judge
            </Link>
            <form>
                <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon/>
                </Button>
                <Link to='/sign-in'>
                <Button color='gray' pill>
                    Signin
                </Button>
                </Link>
                <Navbar.Toggle/>  {/* Hamburger menu */}
            </div>
            <Navbar.Collapse>
                    <Navbar.Link active={path==='/'} as={'div'}>
                        <Link to='/'>
                        Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path==='/about'} as={'div'}> {/* As 2 links within each other are not allowed */}
                        <Link to='/about'>
                        About
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path==='/projects'} as={'div'}>
                        <Link to='/projects'>
                        Problems
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
        </Navbar>
        
    </div>
  )
}

export default Header