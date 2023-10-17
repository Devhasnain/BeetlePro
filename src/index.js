import { config } from "dotenv";
import app from "./app.js";
import * as logger from "./utils/logger.js";

if (process.env.NODE_ENV !== "production") {
    config();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});