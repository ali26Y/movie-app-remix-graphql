import { Header } from "~/components/header";
import { Search } from "~/components/search";
import SearchStyles from "~/styles/search.css";
import HeaderStyles from "~/styles/header.css";

import type { MetaFunction } from "remix";

// this is how route based styling works in remixJS. I wanted to avoid using styled-components for demonstration purposes
export const links = () => {
  return [
    { rel: "stylesheet", href: SearchStyles },
    { rel: "stylesheet", href: HeaderStyles },
  ];
};

// Benefits of SSR here :D
export const meta: MetaFunction = () => {
  return {
    title: "Movie Finder",
    description: "Search for any movie you can think of.",
  };
};

export default function Index() {
  return (
    <div className="routeWrapper">
      <Header />
      <Search />
    </div>
  );
}
