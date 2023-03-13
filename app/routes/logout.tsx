import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  // return logout(request);
};

export let loader: LoaderFunction = async () => {
  return redirect("/");
};
