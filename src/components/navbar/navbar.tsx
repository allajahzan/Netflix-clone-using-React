import logo from '../../assets/logo.png'
function Navbar() {
  return (
    <nav className="w-[100%] flex absolute top-5 sm:top-0 p-3 pl-8 sm:pl-40 pr-8 sm:pr-40 z-20 ">
          <img className="w-24 sm:w-44" src={logo} alt="" />
    </nav>
  )
}

export default Navbar
