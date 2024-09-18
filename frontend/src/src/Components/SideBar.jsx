import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  HiHome,
  HiKey,
  HiSearch,
  HiUpload,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProfile } from "../Redux/Features/Profile/profileSlice";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dataProfile = useSelector(state => state.profile.data)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchProfile())
    }, [dispatch])

    const handleClose = () => setIsOpen(false);

    const path = useLocation()  
    return (
      <>
        <div className="flex ms-5 items-center justify-center">
          <small className="text-3xl text-gray-500 cursor-pointer" onClick={() => setIsOpen(true)}><FiMenu/></small>
        </div>
        <Drawer open={isOpen} onClose={handleClose}>
          <div className="flex gap-1">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ms-1">Flowbite</span>
            </div>
          <Drawer.Header titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <form className="pb-3 md:hidden">
                    <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="/dashboard" icon={HiHome} active={path.pathname === '/dashboard' ? true : false}>
                        Home
                      </Sidebar.Item>
                      <Sidebar.Item href="/dashboard/update-password" active={path.pathname === '/dashboard/update-password' ? true : false} icon={HiKey}>
                        Update Password
                      </Sidebar.Item>
                      <Sidebar.Item href="/dashboard/upload-photo" icon={HiUpload} active={path.pathname === '/dashboard/upload-photo' ? true : false}>
                      {dataProfile.image ? 'Edit Photo' : 'Upload Photo'}
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </>
    );
}

export default SideBar