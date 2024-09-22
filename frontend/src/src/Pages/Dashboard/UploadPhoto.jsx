import { Button, Card, FileInput, Label, Spinner } from "flowbite-react"
import FooterComponent from "../../Components/Footer"
import NavbarComponent from "../../Components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfile } from "../../Redux/Features/Profile/profileSlice"
import { HiUpload } from "react-icons/hi"


const UploadPhoto = () => {
  document.title = 'Upload Photo'

  const dataProfile = useSelector(state => state.profile.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])
  const [image, setImage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const uploadImage = async () => {
    const token = localStorage.getItem('token')
    setLoading(true)
    const formData = new FormData()
    formData.append('image', image)

    try {
      await axios.post('http://localhost:3000/api/profile/upload-image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      location.reload()
    } catch (error) {
      setErrorMsg(error.response.data.errors.image)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    uploadImage()
  }

  return (
    <div>
        <NavbarComponent/>
        <div>
          <div className="pt-28 px-10 w-full mx-auto max-w-md">
            <Card className="max-w-md my-8 md:w-[800px]">
            <h1 className="text-center text-4xl flex justify-center">
            <HiUpload className={`mt-1 ${localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'text-white' : 'text-black'}`}/>
          </h1>
          <hr />
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3">
                    <Label htmlFor="file-upload-helper-text" value="Image" />
                  </div>
                  <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." onChange={(e) => setImage(e.target.files[0])}/>
                    {errorMsg && <><span className="text-red-600 text-xs">{errorMsg[0]}</span></>}
                </div>
                <Button type="submit" className="mt-3 w-full">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : dataProfile.image ? 'Edit Photo' : 'Upload Photo'}</Button>
              </form>
            </Card>
          </div>
        </div>
        <FooterComponent/>
    </div>
  )
}

export default UploadPhoto
