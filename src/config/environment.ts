import dotenv from "dotenv";
dotenv.config({ path: ".env" });

interface Enviroments {
    NODE_ENV: "production" | "development";
    PORT: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    BASE_URL: string;
}

const enviroments: Enviroments = {
    NODE_ENV: process.env.NODE_ENV! as "development" | "production",
    PORT: process.env.PORT!,
    // db
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: Number(process.env.DB_PORT)!,
    DB_NAME: process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_PASS: process.env.DB_PASS!,
    BASE_URL: process.env.BASE_URL!,
};
export default enviroments;
