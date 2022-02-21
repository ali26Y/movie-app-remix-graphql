import React from "react";
import { Link } from "remix";
import Autosuggest from "react-autosuggest";
import { gql, useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

type Suggestion = {
  title: string;
  _id: string;
  poster: string;
};

const FETCH_MOVIES_QUERY = gql`
  query Search($movie: String!) {
    Movie(filter: { title_regexp: $movie }, first: 5) {
      title
      _id
      poster
    }
  }
`;

const Search = () => {
  const [value, setValue] = React.useState("");

  // this allows us to debounce our graphQL requests
  const [currentMovie] = useDebounce(value, 200);

  const onChange = (event: any, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };
  // these props are required for react-autosuggest
  const onSuggestionsFetchRequested = () => {};
  const onSuggestionsClearRequested = () => {};
  const getSuggestionValue = () => "";

  const renderSuggestion = (suggestion: Suggestion) => (
    <div className="search-option-container">
      <Link to={`/movie/${suggestion._id}`}>
        <div className="image">
          <img src={suggestion.poster} />
        </div>
        <div className="main">
          <span>{suggestion.title}</span>
        </div>
      </Link>
    </div>
  );

  const inputProps = {
    placeholder: "Search for a movie that you are looking for :)",
    value,
    onChange,
  };

  const { data } = useQuery(FETCH_MOVIES_QUERY, {
    variables: {
      // regex for case-insensitive searching
      movie: `(?i)${currentMovie?.trim()}.*`,
    },
    skip: !value,
  });

  return (
    <Autosuggest
      suggestions={data?.Movie || []}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export { Search };
