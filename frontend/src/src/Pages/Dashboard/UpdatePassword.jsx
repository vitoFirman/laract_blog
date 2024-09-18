import { useEffect, useState } from "react";
import NavbarComponent from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../../Components/Footer";
import { Alert, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { HiKey } from "react-icons/hi";
import axios from "axios";

const UpdatePassword = () => {
    const [formData, setFormdata] = useState({
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    })
    const [succes, setSucces] = useState(null)
    const [error, setError] = useState(null)
    const [validationError, setValidationError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login')
        }
        document.title = 'Update Password'
    }, [navigate])
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/api/user/update-password', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
          if (res.status === 200) {
            setSucces(res.data);
            setError(null);
            setValidationError(null);
            setFormdata({current_password: '', new_password: '', new_password_confirmation:''})
          } 
        } catch (error) {
          setSucces(null);
          setError(error.response?.data?.message || 'An error occurred');
          setValidationError(error.response?.data || {});
        } finally {
          setLoading(false)
        }
    };
  console.log(validationError);
  return (
    <div>
        <NavbarComponent/>
        <div className="flex justify-center items-center h-full py-20 md:py-7">
        <Card className="max-w-md mt-16 md:w-[800px]">
          <h1 className="text-center text-4xl flex justify-center">
            <HiKey className={`mt-1 ${localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'text-white' : 'text-black'}`}/>
          </h1>
          <hr />
          {
            error === 'Password Invalid' && error !== null && (
              <Alert color="failure" className="flex items-center justify-center">
                <span className="font-medium">Error: </span> 
                <p>{error}</p>
              </Alert>
            )
          }
          {
            succes && (
              <Alert color="success" className="flex items-center justify-center">
                <span className="font-medium">{succes.message} : </span> 
                <p>Password Updated</p>
              </Alert>
            )
          }
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="current_password" value="Current Password" className={validationError?.errors?.current_password ? 'text-red-600 ' : ''}/>
              <TextInput value={formData.current_password} id="current_password" type="password" color={validationError?.errors?.current_password ? 'failure' : 'gray'} onChange={(e) => setFormdata({...formData, current_password: e.target.value})}/>
              {validationError?.errors?.current_password && <><span className="text-red-600 text-xs">{validationError?.errors?.current_password[0]}</span></>}
            </div>
            <div>
              <Label htmlFor="new_password" value="new password" className={validationError?.errors?.new_password ? 'text-red-600' : ''}/>
              <TextInput value={formData.new_password} id="new_password" type="password" color={validationError?.errors?.new_password ? 'failure' : 'gray'} onChange={(e) => setFormdata({...formData, new_password: e.target.value})}/>
              {validationError?.errors?.new_password && <><span className="text-red-600 text-xs">{validationError?.errors?.new_password[0]}</span></>}
            </div>
            <div>
              <Label htmlFor="new_password_confirmation" value="new password confirmation" className={validationError?.errors?.new_password_confirmation ? 'text-red-600' : ''}/>
              <TextInput value={formData.new_password_confirmation} id="new_password_confirmation" type="password" color={validationError?.errors?.new_password_confirmation ? 'failure' : 'gray'} onChange={(e) => setFormdata({...formData, new_password_confirmation: e.target.value})}/>
              {validationError?.errors?.new_password_confirmation && <><span className="text-red-600 text-xs">{validationError?.errors?.new_password_confirmation[0]}</span></>}
            </div>
            <Button type="submit">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : 'Update'}</Button>
          </form>
        </Card>
      </div>
        <FooterComponent/>
    </div>
  )
}

export default UpdatePassword