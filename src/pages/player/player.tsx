import { useNavigate, useParams } from 'react-router-dom'
import backIcon from '../../assets/back.svg'
import { useEffect, useState } from 'react'

interface Type {
    name: string;
    key: string;
    published_at: string
    type: string
}

function Player() {

    let { id } = useParams()

    let [movieDetails, setDetails] = useState<Type | null>(null)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ0NzVmYjI3NjFjYmM2Yzc5MTQxOGRhOTdiY2MzYSIsIm5iZiI6MTcyNjQ5MzAwOS43MDM4MzIsInN1YiI6IjY2ZTgyZmJiOWRmYmJkZjBlNmQwMDM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eHssFihaGZsR4fLxFjwnoL19mMEyYhAfae0ALNA6fgU'
        }
    };

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then((res) => res.json())
            .then((res) => setDetails(res.results[0]))
            .catch((err) => console.log(err))

    }, [id])

    let navigate = useNavigate()

    let goBack = () => {
        navigate('/home')
    }

    return (
        <div className="player flex flex-col justify-center items-center h-[100vh]">
            <img onClick={goBack} className='absolute top-5 left-5 w-12 cursor-pointer' src={backIcon} alt="" />
            <iframe className="rounded-lg w-[90%] h-[60%] sm:h-[60%] md:h-[60%] lg:h-[90%]" src={`https://www.youtube.com/embed/${movieDetails?.key}`} title='trailer' allowFullScreen></iframe>
            <div className="w-[90%] flex justify-between pt-2">
                <p className="text-white text-xs sm:text-xl font-medium">{movieDetails?.published_at.slice(0, 10)}</p>
                <p className="text-white text-xs sm:text-xl font-medium">{movieDetails?.name}</p>
                <p className="text-white text-xs sm:text-xl  font-medium">{movieDetails?.type}</p>
            </div>
        </div>
    )
}

export default Player