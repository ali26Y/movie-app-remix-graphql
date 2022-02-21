import { createContext } from "react";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const APOLLO_ENDPOINT = `https://movies.grandstack.io/`;

const isBrowser = typeof window !== "undefined";

// this is used for passing the initial state to the client
const initialState = isBrowser ? window.__INITIAL_STATE__ : {};

export function initApollo(ssrMode = true) {
  return new ApolloClient({
    uri: APOLLO_ENDPOINT,

    // rehydrating the state with data extracted from another cache instance. This ensures client and server are rehydrated
    cache: new InMemoryCache().restore(initialState),
    ssrMode,
  });
}

export default createContext(initialState);
