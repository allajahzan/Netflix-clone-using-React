import { useNavigate } from "react-router-dom"
import bgImage from '../../assets/bg-netflix.jpg'
import './signup.css'
import Navbar from "../../components/navbar/navbar"
import Button from "../../components/button/button"
import InputText from "../../components/input-text/input-text"
import { useState } from "react"
import { signup } from "../../firebase/firebase"
import Cookies from 'js-cookie';

function SignUp({ setUser }: { setUser:React.Dispatch<React.SetStateAction<object | null>> }) {

  let [name, setName] = useState<string>('')
  let [email, setEmail] = useState<string>('')
  let [password, setPassword] = useState<string>('')

  let handleSubmit = async (event:React.FormEvent)=>{
    event.preventDefault()

    const user =  await signup(name,email,password)

    if (user) {
      Cookies.set('user', JSON.stringify({isLoggedIn:true}), { expires: 7 });
      const userCookie = Cookies.get('user');
      const isUser = userCookie ? JSON.parse(userCookie) : null;
      setUser(isUser)
    } 

  }

  const navigate = useNavigate()

  const goToSignInPage = () => {
    navigate('/login')
  }

  return (
    <>

      <Navbar />

      <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover'
      }} className="h-[100vh] flex items-center justify-center">

        <div className="absolute h-[100vh] w-[100%] bg-black opacity-50"></div>

        <div className="z-10 bg-black bg-opacity-100 sm:bg-opacity-75 w-[100%] h-[100vh] rounded-none sm:rounded-md sm:w-[450px] sm:h-fit p-10 sm:p-16 pt-24 sm:pt-10">
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <form action="" className="flex flex-col pt-10" onSubmit={handleSubmit}>

            <InputText action={setName} name="floating_name" type="text" label="Name" />

            <InputText action={setEmail} name="floating_email" type="email" label="Email or phone number" />

            <InputText action={setPassword} name="floating_password" type="password" label="Password" />

            <Button text="Sign Up" />

          </form>

          <div className="pt-8 relative flex items-center justify-start">
            <input className="border-solid border-2 border-white rounded-sm h-5 w-5 cursor-pointer" id="box" type="checkbox" />
            <label htmlFor="box" className="text-base text-white ml-2 cursor-pointer">Remember me</label>
          </div>

          <p className="text-white font-medium pt-5 cursor-pointer"><span className="text-gray-300 font-normal cursor-text">Already have an account? </span><span onClick={goToSignInPage}>Sign In now.</span></p>

          <p style={{ fontSize: '13px' }} className="text-gray-400 pt-8">This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-blue-700">Learn more.</span></p>
        </div>

      </div>
    </>
  )
}

export default SignUp