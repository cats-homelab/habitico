import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";
import { stringify } from "@/lib/utils/stringify";

const API_HOST = "http://localhost:4000"

const fetcher = axios.create({
  baseURL: API_HOST + "/api",
});

fetcher.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.set("Authorization", "Bearer " + token)
  }
  return config;
});

fetcher.interceptors.response.use(undefined, async (error: AxiosError) => {
  if (error.response?.status == 401) {
    window.location.href = "/login";
  }

  return Promise.reject(error);
});

type TGetParams = {
  path: string;
  params?: Record<string, string | number | undefined | boolean>;
  headers?: Record<string, string>;
};

type TPostParams = {
  path: string;
  params?: Record<string, string | number | unknown> | FormData;
  headers?: AxiosRequestConfig;
};

export class API {
  fetcher = fetcher;

  get<R>({ path, params = {}, headers = {} }: TGetParams) {
    return this.fetcher.get<R>(`${path}?${stringify(params)}`, {
      headers: {
        ...headers,
      },
    });
  }

  post<R>({ path, params = {}, headers = {} }: TPostParams) {
    return this.fetcher.post<R>(path, params, {
      ...headers,
    });
  }

  patch<R>({ path, params = {}, headers = {} }: TPostParams) {
    return this.fetcher.patch<R>(path, params, {
      ...headers,
    });
  }

  put<R>({ path, params = {}, headers = {} }: TPostParams) {
    return this.fetcher.put<R>(path, params, {
      ...headers,
    });
  }

  delete<R>({ path, params = {} }: TPostParams) {
    return this.fetcher.delete<R>(path, { data: params });
  }
}