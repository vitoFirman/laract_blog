import { useEffect } from "react";
import NavbarComponent from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../../Components/Footer";
import { useThemeMode } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/Features/User/userSlice";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.user)
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          navigate('/login');
      } else {
          dispatch(fetchUser());
      }
  }, [dispatch, navigate]);
  const mode = useThemeMode()
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
            <h1 className={`flex justify-center items-center text-gray-600 text-4xl pt-32 md:pt-25 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>Welcome back, {data?.name}</h1>
          </div>
        <FooterComponent/>
    </div>
  )
}

export default Dashboard