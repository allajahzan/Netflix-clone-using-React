import logo from '../../assets/logo.png'
import './navbar-main.css'
import searchIcon from '../../assets/search.svg'
import reminderIcon from '../../assets/reminder.svg'
import avatar from '../../assets/avatar.png'
import dropDown from '../../assets/dropDown.svg'
import { useEffect, useState } from 'react'

function NavbarMain({action}:{action:()=>void}) {


  let [isScrolled, setScroll] = useState<boolean>(false)

  useEffect(() => {

    let handleScroll = () => {
      if (window.scrollY >= 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

  }, [])


  return (
    <nav className={`w-[100%] flex items-center fixed z-50 top-0 sm:top-0 p-1 sm:p-5 pl-5 sm:pl-20 pr-5 sm:pr-20 
     ${isScrolled ? 'bg-black transition-colors duration-400' : 'bg-gradient-to-r from-black to-transparent'}`}>
      <img className="w-16 sm:w-24" src={logo} alt="" />
      <div className='w-full ml-10 nav-items-div'>
        <div className='nav-items gap-5'>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </div>
        <div className='flex gap-5 items-center'>
          <img className='w-4' src={searchIcon} alt="" />
          <li>Children</li>
          <img className='w-5' src={reminderIcon} alt="" />
          <div className='flex peer'>
            <img className='w-10 rounded-md' src={avatar} alt="" />
            <img className='w-5' src={dropDown} alt="" />
          </div>
          <div className='invisible peer-hover:visible hover:visible  flex justify-center items-center rounded-md bg-black bg-opacity-80 absolute right-5 top-14 p-5 h-[40px] cursor-pointer'>
            <p onClick={action} className='text-white underline'>Sign-out-of-netlifx</p>
          </div>
        </div>
      </div>
    </nav>


  )
}

export default NavbarMain
