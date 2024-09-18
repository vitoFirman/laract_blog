import { Alert, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, login } from "../../Redux/Features/Auth/authSlice";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading , error} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  useEffect(() => {
    document.title = "Login"
    dispatch(clearError())
  }, [dispatch])
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        navigate('/home')
    }
  }, [navigate])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap(); 
      navigate('/home');
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
  return (
    <section className="min-h-screen">
      <div className="flex justify-center items-center h-full">
        <Card className="max-w-md mt-16 md:w-full">
          <h1 className="text-center text-5xl flex justify-center gap-2">
            <FiLogIn className={`mt-1 ${localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'text-white' : 'text-black'}`}/>
          </h1>
          <hr />
          {
            error !== 'Unauthenticated.' && error !== null && (
              <Alert color="failure" className="flex items-center justify-center">
                <span className="font-medium">Error: </span> 
                <p>{error}</p>
              </Alert>
            )
          }
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email1" value="Email" />
              <TextInput id="email1" type="email" placeholder="name@flowbite.com" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput id="password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            </div>
            <Button type="submit">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : 'Login'}</Button>
            <small className={`text-center ${localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'text-white' : 'text-black'}`}>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>{" "}
              now
            </small>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Login;