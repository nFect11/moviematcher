import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function MovieInfo(props) {
  const imgPath = "https://image.tmdb.org/t/p/original";
  const ytLink = "https://www.youtube.com/watch?v=";

  const [embededTrailer, changeEmbededTrailer] = useState(null);

  const handleVideo = (key) => {
    if (embededTrailer === key) {
      changeEmbededTrailer(null);
    } else {
      changeEmbededTrailer(key);
    }
  };

  return (
    <div className="fixed left-1/10 top-1/10 w-4/5 h-4/5 md:left-1/5 md:w-3/5 mx-auto rounded-lg bg-gray-900 text-white z-20 ">
      <div className="grid grid-cols-5 w-full h-full gap-4">
        <div className="col-span-2 hidden md:block">
          {console.log(props.movie)}
          <img
            className="object-scale-down h-full"
            src={`${imgPath}${props.movie?.poster_path}`}
            alt={props.movie?.title}
          />
        </div>
        <div className="text-white text-lg col-span-5 md:col-span-3 align-text-top leading-10 ">
          <div className="absolute top-2 right-4">
            <CloseIcon className="cursor-pointer" onClick={props.modal} />{" "}
          </div>
          <div className="text-3xl text-center">{props.movie?.title}</div>
          <table>
            <tr className="leading-8 pb-8">
              <td>Year:</td>
              <td>{props.movie?.release_date.substring(0, 4)}</td>
            </tr>
            <tr className="leading-8 pb-8">
              <td className="align-text-top w-32">Genres:</td>
              <td>
                <ul className="list-disc">
                  {props.movie?.genres.map((x) => (
                    <li>{x.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Score:</td>
              <td>
                <Rating
                  name="half-rating-read"
                  defaultValue={props.movie?.vote_average / 2}
                  precision={0.2}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.25, color: "white" }}
                      fontSize="inherit"
                    />
                  }
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>Runtime:</td>
              <td>{props.movie?.runtime} minutes</td>
            </tr>
          </table>
          {props.movie?.overview}
          <br />
          <ul className="text-blue-500">
            {props.movie?.videos.results
              .filter((x) => x.type === "Trailer")
              .map((y, index) => (
                <li
                  className={`cursor-pointer ${
                    embededTrailer === y.key && `text-green-500`
                  }`}
                  name={y.key}
                  key={y.key}
                  onClick={() => {
                    handleVideo(y.key);
                  }}
                >
                  Trailer #{index + 1}
                </li>
              ))}
          </ul>
          {embededTrailer !== null && (
            <iframe
              className="w-4/5 h-1/5 lg:h-2/5"
              src={`https://www.youtube-nocookie.com/embed/${embededTrailer}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
