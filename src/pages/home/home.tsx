// import NavbarMain from "../../components/navbar/navbar-main"
// import Cards from '../../components/cards/cards'
import banner1 from '../../assets/hero_banner.jpg'
import title1 from '../../assets/hero_title.png'
import play from '../../assets/play.svg'
import info from '../../assets/info.svg'
import spinner from '../../assets/netflix_spinner.gif'
import './home.css'
import { lazy, useEffect, useState } from "react"
import { logout } from '../../firebase/firebase'

const NavbarMain = lazy(() => import("../../components/navbar/navbar-main"))
const Cards = lazy(() => import('../../components/cards/cards'));

function Home({ setUser }: { setUser: React.Dispatch<React.SetStateAction<object | null>> }) {

    let [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])

    let handleSingout = () => {
        const res = logout()
        if (res) {
            setUser(null)
        }
    }

    return (
        <>
            {loading ?
                <div className="h-[100vh] w-full flex justify-center items-center"><img className="w-14" src={spinner} alt="" /></div>
                :
                <div>
                    <div className="banner">
                        <NavbarMain action={handleSingout} />
                        <div className="relative">
                            <div className="relative w-[100%]">
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent via-80% to-transparent z-10"></div>
                                <img src={banner1} className="w-full h-full object-cover z-0" alt="banner" />
                            </div>
                            <div className="flex flex-col absolute z-20 w-[100%] bottom-3 sm:bottom-10 md:bottom-10 lg:bottom-10 pl-5 sm:pl-20 pr-5 sm:pr-20 ">
                                <img className="w-[31%]" src={title1} alt="" />
                                <p className="text-white text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg w-[100%] sm:w-[90%] md:w-[90%] lg:w-[50%] pt-3 sm:pt-5">
                                    Discovering his ties to a secret ancient order,
                                    a young man living in modern Istanbul embarks on
                                    a quest to save the city froman immortal enemy.
                                </p>

                                <div className="flex pt-3 sm:pt-5">
                                    <button className="p-1 sm:p-2 px-4 sm:px-5 text-xs sm:text-base rounded-sm sm:rounded border-none bg-white text-black mr-2 flex items-center justify-between">
                                        <img className="w-3 sm:w-4 relative -left-1" src={play} alt="" />
                                        <p className="font-medium">Play</p>
                                    </button>
                                    <button className="p-1 sm:p-2 px-4 sm:px-5 text-xs sm:text-base rounded-sm sm:rounded border-none bg-black bg-opacity-50 text-white flex items-center justify-between ">
                                        <img className="w-4 sm:w-5 relative -left-1" src={info} alt="" />
                                        <p className="font-medium">More Info</p>
                                    </button>
                                </div>
                                <div className="banner-card">
                                    <Cards title="Popular on Netflix" category={"now_playing"} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="p-5 sm:p-20 pt-0 sm:pt-20">

                        <Cards title="Blockbuster Movies" category="top_rated" />
                        <Cards title="Only on Netflix" category="popular" />
                        <Cards title="Upcoming" category="upcoming" />
                        <Cards title="Top Pics for You" category="now_playing" />
                    </div>
                </div>
            }

        </>
    )
}

export default Home
