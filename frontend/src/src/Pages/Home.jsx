import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../Components/Navbar";
import { Card, Carousel } from "flowbite-react";
import photo from '../Assets/Images/photo.jpg'
import photo2 from '../Assets/Images/photo2.jpg'
import photo3 from '../Assets/Images/photo3.jpg'
import photo4 from '../Assets/Images/photo4.jpg'
import FooterComponent from "../Components/Footer";

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login')
        }
        document.title = 'Home'
    }, [navigate])
    return (
        <div>
        <NavbarComponent/>
        <div className="container mx-auto px-4 pb-10 pt-20">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-5 max-w-6xl mx-auto">
        <Carousel slideInterval={4000}>
        <img src={photo} alt="..." className="h-[400px] w-full object-cover" />
        <img src={photo2} alt="..." className="h-[400px] w-full object-cover" />
        <img src={photo3} alt="..." className="h-[400px] w-full object-cover" />
        <img src={photo4} alt="..." className="h-[400px] w-full object-cover" />
        <img src={photo2} alt="..." className="h-[400px] w-full object-cover" />
        </Carousel>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            <Card
                className="w-full overflow-hidden"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                renderImage={() => <><img src={photo} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/></>}
            >
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </Card>
            <Card
                className="w-full overflow-hidden"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                renderImage={() => <><img src={photo2} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/></>}
            >
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </Card>
            <Card
                className="w-full overflow-hidden"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                renderImage={() => <><img src={photo3} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/></>}
            >
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </Card>
            <Card
                className="w-full overflow-hidden"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                renderImage={() => <><img src={photo4} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/></>}
            >
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </Card>
        </div>
        </div>
        <FooterComponent/>
        </div>
    )
}

export default Home