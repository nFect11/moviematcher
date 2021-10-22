export default function MovieCard(props) {
  
    const imgPath = "https://image.tmdb.org/t/p/original"
  return (
    <div className="w-300px h-450px m-auto">
      <div className="absolute">
        <h1>{props.movie.title}</h1>
      </div>
      <div>
        <img
          className="rounded"
          src={`${imgPath}${props.movie.poster_path}`}
          alt={props.movie.title}
          onError={(ev) => {
            ev.target.onError = null;
            ev.target.src = "https://via.placeholder.com/300x450";
          }}
        />
      </div>
      <button>Fetch Information</button>
    </div>
  );
}
