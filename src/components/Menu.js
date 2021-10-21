import { useState } from "react"
import GenreSelector from "./genreSelector/GenreSelector"
import GenreSelectorHate from "./genreSelector/GenreSelectorHate"
import Landing from "./landing/Landing"
import MovieList from "./movies/MovieList"

export default function Menu() {
    const [step, changeStep] = useState(0)
    
    const handlePrevious = () => {
        if(step>0){
        changeStep(step - 1)}
    }
    const handleNext = () => {
        changeStep(step + 1)
    }
    return <div className="h-1/2"><div>
        {(() => {switch(step) {
        case 0: return <Landing />;
        case 1: return <GenreSelector />;
        case 2: return <GenreSelectorHate />;
        case 3: return <MovieList />;
        default: <div></div>}})()}</div>
        <button className={`absolute top-10 bg-gray-400 w-28 cursor-pointer ${step===0 && 'hidden'}`} onClick={handlePrevious}>Previous</button>
        <button className={`absolute top-10 ml-48 bg-gray-400 w-28 `} onClick={handleNext}>Next</button>
    </div>
}