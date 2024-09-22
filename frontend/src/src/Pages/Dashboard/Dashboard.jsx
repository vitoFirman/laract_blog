import { useEffect } from "react";
import NavbarComponent from "../../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/Features/Profile/profileSlice";
import { useThemeMode } from "flowbite-react";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mode = useThemeMode()
  const {data} = useSelector(state => state.profile)
  document.title = 'Dashboard'
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          navigate('/login');
      } else {
          dispatch(fetchProfile());
      }
  }, [dispatch, navigate]);
  return (
    <div>
        <NavbarComponent/>
          <div className={`h-[80vh] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>
            <div className="flex flex-col justify-center items-center pt-32 md:pt-25">
              <h1 className={`mb-2 text-4xl font-extralight`}>Hi ! {data?.first_name} {data?.last_name}</h1>
              <p>selamat datang di dashboard blog app</p>
              {
                data?.image && 
                <img src={`http://localhost:3000/${data?.image}`} alt="profile image" className="w-[300px] md:w-[400px] rounded-lg my-2" />
              }
              {
                !data.image && <Link to={'/dashboard/upload-photo'} className="mt-3 text-blue-600 hover:underline">Upload your photo</Link>
              }
            </div>
          </div>
        <FooterComponent/>
    </div>
  )
}

export default Dashboard