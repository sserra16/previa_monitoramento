import express from "express";
import routes from "./routes";
import { json } from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(routes);

app.listen(3000, () => console.log("listening on port 3000"));
