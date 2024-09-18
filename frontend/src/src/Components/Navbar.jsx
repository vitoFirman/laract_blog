import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import {useDispatch, useSelector} from 'react-redux'
import { clearError, logout } from "../Redux/Features/Auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "../Redux/Features/User/userSlice";
import SideBar from "./SideBar";
import { fetchProfile } from "../Redux/Features/Profile/profileSlice";



const NavbarComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.data)
    const userProfile = useSelector(state => state.profile.data)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            dispatch(fetchUser());
            dispatch(fetchProfile());
        }
    }, [dispatch, navigate]);
    const handleLogout = () => {
        try {
            dispatch(logout())
            dispatch(clearError())
            navigate('/login')
        } catch (error) {
            return error
        }
    }
    const location = useLocation()
    const path = location.pathname
    return (
    <Navbar fluid rounded className="rounded-none min-w-full fixed top-0 z-10">
        <Navbar.Brand href="#">
        {
            !path.startsWith('/dashboard') && (
                <>
                <Navbar.Toggle />
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ms-1">Flowbite</span>
                </>
            )
        }
        {
            path.startsWith('/dashboard') && (
                <>
                <SideBar/>
                </>
            )
        }
        </Navbar.Brand>
        <div className="flex md:order-2">
            <DarkThemeToggle className="me-2"/>
            <Dropdown
            arrowIcon={false}
            inline
            label={ userProfile?.image ? (<>
                <Avatar className="me-4" alt="User settings" img={`http://localhost:3000/${userProfile?.image}`} rounded />
                </>) : <><Avatar className="me-4" placeholderInitials={userProfile?.first_name?.substr(0,1).toUpperCase()} rounded/></>
            }
            >
            <Dropdown.Header>
                <span className="block text-sm">{user?.name}</span>
                <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item><Link to='/dashboard'>Dashboard</Link></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
        {
            !path.startsWith('/dashboard') && (
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                    Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            ) 
        }
        
        </Navbar>
  )
}

export default NavbarComponent