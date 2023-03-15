import axios from "axios";
import { springServerBaseUrl } from "@/config/axios";

export const springServerHttpClient = axios.create({
  baseURL: springServerBaseUrl,
  timeout: 10000,
  headers: { "ngrok-skip-browser-warning": 0 },
});
