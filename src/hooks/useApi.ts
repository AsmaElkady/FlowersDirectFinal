import { baseUrl } from "./../constants/main";
import axios from "axios";

interface IGetAPI {
  api: string;
  query?: string;
}

export const handleGetAPI = async ({ api, query }: IGetAPI) => {
  const res = await axios.get(baseUrl + api + (query ? query : ""));
  return res;
};
