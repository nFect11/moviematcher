export default function MovieCard(props) {
  return (
    <div className="relative w-300px">
      <div className="absolute">
        <h1>Test</h1>
      </div>
      <div>
        <img className="rounded"
          src={props.movie.posterUrl}
          alt={props.movie.title}
          onError={(ev) => {
            ev.target.onError = null;
            ev.target.src = "https://via.placeholder.com/300x450";
          }}
        />
      </div>
    </div>
  );
}
