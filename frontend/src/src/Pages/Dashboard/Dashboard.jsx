import { useEffect } from "react";
import NavbarComponent from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/Features/Profile/profileSlice";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.profile)
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          navigate('/login');
      } else {
          dispatch(fetchProfile());
      }
  }, [dispatch, navigate]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login')
        }
        document.title = 'Dashboard'
    }, [navigate])
  return (
    <div>
        <NavbarComponent/>
          <div className="h-[80vh]">
            <div className="flex flex-col justify-center items-center pt-32 md:pt-25">
              <h1 className={` text-gray-600 text-4xl font-extralight`}>Hi ! {data?.first_name} {data?.last_name}</h1>
              <p className=" text-gray-600">selamat datang di dashboard blog app</p>
              <img src={`http://localhost:3000/${data?.image}`} alt="profile image" className="w-[300px] md:w-[400px] rounded-lg my-2" />
            </div>
          </div>
        <FooterComponent/>
    </div>
  )
}

export default Dashboard