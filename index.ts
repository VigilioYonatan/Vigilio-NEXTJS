import next from "next";
import { createServer } from "http";
import { parse } from "url";
import { connectDB } from "./src/services";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
console.log({ dev: process.env.NODE_ENV });

async function main() {
    try {
        await connectDB();
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }

    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url!, true);
            handle(req, res, parsedUrl);
        }).listen(port);
        console.log(
            `> Server listening at http://localhost:${port} as ${
                dev ? "development" : process.env.NODE_ENV
            }`
        );
    });
}

main();
