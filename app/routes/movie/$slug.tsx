import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { gql, useQuery } from "@apollo/client";

import { MovieDetails } from "~/components/movie";
import type { Movie } from "~/components/movie";

import MovieStyles from "~/styles/movie.css";
import MobileStyles from "~/styles/mobile.css";

const FETCH_SINGLE_MOVIE_QUERY = gql`
  query Search($id: String!) {
    Movie(_id: $id) {
      title
      _id
      poster
      year
      imdbRating
      plot
      actors {
        name
      }
      genres {
        name
      }
    }
  }
`;

export const links = () => {
  return [
    { rel: "stylesheet", href: MovieStyles },
    { rel: "stylesheet", href: MobileStyles, media: "(max-width: 700px)" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  // this helps remix throw errors when the params.slug does not exist
  invariant(params.slug, "expected params.slug");
  return params.slug;
};

export default function MovieSlug() {
  const movieId = useLoaderData();

  const { data, loading } = useQuery(FETCH_SINGLE_MOVIE_QUERY, {
    variables: {
      id: movieId,
    },
  });

  return (
    <div className="movie-container">
      {loading ? (
        <h1>Loading...</h1>
      ) : data?.Movie ? (
        <MovieDetails movie={data!.Movie[0] as Movie} />
      ) : (
        <h1>The movie entered does not exist</h1>
      )}
    </div>
  );
}
