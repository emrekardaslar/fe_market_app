import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import useViewModel from "../views/ProductPage/viewModel";
import styles from "../styles/search.css";
import SearchView from "~/views/SearchPage/view";

export let loader: LoaderFunction = async ({ request, params }) => {
  const { search } = useViewModel();
  const url = new URL(request.url);
  const searchString = url.searchParams.get("q");
  const result = await search(searchString);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  return { result, baseUrl, searchString };
};

export const meta: MetaFunction<typeof loader> = () => {
  return {
    title: "Search Page",
    description: "Search for products",
  };
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/antd@4.21.6/dist/antd.css",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

function search() {
  const data = useLoaderData();
  let results = data.result;
  const searchString = data.searchString;

  return (
    <>
      <SearchView
        results={results}
        searchString={searchString}
        baseUrl={data.baseUrl}
      />
    </>
  );
}

export default search;
