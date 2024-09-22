import { Button, Card } from "flowbite-react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Welcome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            navigate('/home')
        }
    })
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Welcome To Blog Application
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam expedita eius cum voluptatum similique reprehenderit illum, praesentium necessitatibus laborum dolor doloribus odio sed soluta consectetur quam repellat error aspernatur nulla.
                </p>
                <hr className="border-gray-600"/>
                <div className="flex gap-3">
                    <Button color={'success'}><Link to={'/register'}>Register</Link></Button>
                    <Button><Link to={'/login'}>Login</Link></Button>
                </div>
                </Card>
        </div>
    )
}

export default Welcome