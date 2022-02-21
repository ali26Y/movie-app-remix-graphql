import { Link } from "remix";
import StarIcon from "~/images/star.png";

type Props = {
  movie: Movie;
};

export type Movie = {
  title: string;
  poster: string;
  year: Number;
  imdbRating: string;
  plot: string;
  genres: Genre[];
  actors: Actor[];
};

type Genre = {
  name: string;
};

type Actor = {
  name: string;
};

export const MovieDetails = ({ movie }: Props) => {
  const { title, poster, year, imdbRating, plot, genres, actors } = movie;
  const genresInfo = genres.map((genre) => genre.name).join(", ");
  const actorsInfo = actors.map((actor) => actor.name).join(", ");
  return (
    <div className="movie-details">
      <div className="mobile-link link">
        <Link to="/">Back</Link>
      </div>
      <img className="movie-poster" src={poster} />
      <div className="movie-content">
        <header>
          <h1>{title}</h1>
          <div className=" desktop-link link">
            <Link to="/">Back</Link>
          </div>
        </header>

        <div className="details-wrapper">
          <h3>Plot</h3>
          <p>
            <em>{plot}</em>
          </p>

          <h3>Genre</h3>
          <p>{genresInfo}</p>

          <h3>Cast</h3>
          <p>{actorsInfo}</p>

          <h3>Year</h3>
          <p>{year}</p>

          <h3>IMDB Rating</h3>
          <div className="ratings">
            <img src={StarIcon} />
            <span>{imdbRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
