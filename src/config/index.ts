import path from "node:path";
import enviroments from "./environment";

export const dirMode = path.resolve(__dirname, "..", "..", "..", "..");

export const BASE_URL = () => enviroments.BASE_URL;
