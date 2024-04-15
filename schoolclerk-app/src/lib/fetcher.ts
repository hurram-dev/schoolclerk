import { Fetcher } from "swr";

const API_URL = "http://localhost:8080";

interface FetcherArgType {
  method?: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  body?: any;
  url: string;
}

interface MutationArgType {
  arg: {
    body: any;
  };
}

type FetcherType = FetcherArgType & MutationArgType;

export const fetcher = (...args: any) => {
  console.log(args);

  const [option, mutationArgs] = args as FetcherType[];

  //@ts-ignore
  return fetch(`${API_URL}${option.url}`, {
    method: option.method,
    body: JSON.stringify(mutationArgs?.arg?.body),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
