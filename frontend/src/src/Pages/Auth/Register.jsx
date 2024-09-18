import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../../Redux/Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const {loading, error} = useSelector((state) => state.auth)
  useEffect(() => {
    document.title = "Register"
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      dispatch(clearError())
      navigate('/login');
    } catch (err) {
      return err
    }
  };
  return (
    <section className="min-h-screen">
      <div className="flex justify-center items-center h-full">
        <Card className="max-w-full my-5">
          <h1 className="text-center text-5xl flex justify-center gap-2">
            <FiUserPlus className={` ${localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'text-white' : 'text-black'}`}/>
          </h1>
          <hr />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username" value="Username" className={error?.username ? 'text-red-600' : ''}/>
              <TextInput id="username" type="text" placeholder="John Doe" color={error?.username ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, username: e.target.value})}/>
              {error?.username && <><span className="text-red-600 text-xs">{error.username}</span></>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name" value="First Name" className={error?.first_name ? 'text-red-600' : ''}/>
                <TextInput id="first_name" type="text" placeholder="John" color={error?.first_name ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, first_name: e.target.value})}/>
                  {error?.first_name && <><span className="text-red-600 text-xs">{error.first_name}</span></>}
              </div>
              <div>
                <Label htmlFor="last_name" value="Last Name" className={error?.last_name ? 'text-red-600' : ''}/>
                <TextInput id="last_name" type="text" placeholder="Doe" color={error?.last_name ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, last_name: e.target.value})}/>
              {error?.last_name && <><span className="text-red-600 text-xs">{error.last_name}</span></>}
              </div>
            </div>
            <div>
              <Label htmlFor="email" value="Email" className={error?.email ? 'text-red-600' : ''}/>
              <TextInput id="email" type="email" placeholder="name@flowbite.com" color={error?.email ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
              {error?.email && <><span className="text-red-600 text-xs">{error.email}</span></> }
            </div>
            <div>
              <Label htmlFor="password" value="Password" className={error?.password ? 'text-red-600' : ''}/>
              <TextInput id="password" type="password" color={error?.password ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
              {error?.password && <><span className="text-red-600 text-xs">{error.password}</span></>}
            </div>
            <div>
              <Label htmlFor="password_confirmation" value="confirm password" className={error?.password_confirmation ? 'text-red-600' : ''}/>
              <TextInput id="password_confirmation" type="password" color={error?.password_confirmation ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}/>
              {error?.password_confirmation && <><span className="text-red-600 text-xs">{error.password_confirmation }</span></>}
            </div>
            <Button type="submit">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : 'Register'}</Button>
            <small className={`text-center ${localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'text-white' : 'text-black'}`}>
              Have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline" onClick={() => dispatch(clearError())}>
                Login
              </Link>{" "}
              now
            </small>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Register;