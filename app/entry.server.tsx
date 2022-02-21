import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import ApolloContext, { initApollo } from "./context/apollo";
import { ApolloProvider } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const client = initApollo();

  const App = (
    <ApolloProvider client={client}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  );

  return getDataFromTree(App).then(() => {
    // Extract the entirety of the Apollo Client cache's current state
    const initialState = client.extract();

    const markup = renderToString(
      // Wrap the cache state around the top-level component
      <ApolloContext.Provider value={initialState}>
        {App}
      </ApolloContext.Provider>
    );

    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  });
}
