import express from "express";
import routes from "./routes";
import { json } from "body-parser";

const app = express();
app.use(json());
app.use(routes);
app.listen(3000, () => console.log("listening on port 3000"));
