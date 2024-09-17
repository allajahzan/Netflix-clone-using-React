import { useEffect, useRef, useState } from "react"
import { Link, } from "react-router-dom"
import spinner from '../../assets/netflix_spinner.gif'

interface Type {
    title: string;
    category: string
}

function Cards({ title, category }: Type) {

    let cardsListsRef = useRef<HTMLDivElement | null>(null)

    const onwheel = (event: any): void => {
        (cardsListsRef.current as HTMLDivElement).scrollLeft += event.deltaY
    }

    let [movieData, setData] = useState<object[]|null>(null)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ0NzVmYjI3NjFjYmM2Yzc5MTQxOGRhOTdiY2MzYSIsIm5iZiI6MTcyNjQ5MzAwOS43MDM4MzIsInN1YiI6IjY2ZTgyZmJiOWRmYmJkZjBlNmQwMDM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eHssFihaGZsR4fLxFjwnoL19mMEyYhAfae0ALNA6fgU'
        }
    };

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then((response) => response.json())
            .then((response) => setData(response.results))
            .catch((err) => console.log(err))

        cardsListsRef.current?.addEventListener('wheel', onwheel)

    }, [])

    return (
        <div className="pt-10 sm:pt-14">
            <h1 className="text-lg sm:text-2xl font-extrabold text-white">{title}</h1>
            <div className="card-list flex gap-5 w-full overflow-scroll overflow-y-hidden" ref={cardsListsRef}>
                {movieData? movieData.map((item: any, index: number) =>
                    <Link to={`/player/${item.id}`} key={index} className="card mt-5 h-24 w-40 sm:h-36 sm:w-64 bg-transparent rounded-md relative flex-shrink-0 overflow-hidden cursor-pointer">
                        <p className="absolute bottom-5 right-4 font-medium text-xs sm:text-lg text-white">{item.original_title}</p>
                        <img src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path} alt="" />
                    </Link>
                ):
                <div className="card mt-5 h-24 w-40 sm:h-36 sm:w-64 bg-black rounded-md relative flex flex-shrink-0 justify-center items-center overflow-hidden cursor-pointer">
                    <img className="w-10" src={spinner} alt="" />
                </div> 
                }
            </div>
        </div>
    )
}

export default Cards
