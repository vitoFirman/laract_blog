import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiHome,
  HiInformationCircle,
  HiKey,
  HiPencil,
  HiSearch,
  HiUpload,
} from "react-icons/hi";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);
  
    return (
      <>
        <div className="flex ms-5 items-center justify-center">
          <small className="text-3xl text-gray-500" onClick={() => setIsOpen(true)}><FiMenu/></small>
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
                      <Sidebar.Item href="/dashboard" icon={HiChartPie} active>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item href="/home" icon={HiHome}>
                        Home
                      </Sidebar.Item>
                      <Sidebar.Item href="/dashboard/update-password" icon={HiKey}>
                        Update Password
                      </Sidebar.Item>
                      <Sidebar.Item href="/dashboard/upload-photo" icon={HiUpload}>
                        Upload Photo
                      </Sidebar.Item>
                      <Sidebar.Item href="#" icon={HiPencil}>
                        Sign up
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="#" icon={HiClipboard}>
                        Docs
                      </Sidebar.Item>
                      <Sidebar.Item href="#" icon={HiCollection}>
                        Components
                      </Sidebar.Item>
                      <Sidebar.Item href="#" icon={HiInformationCircle}>
                        Help
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