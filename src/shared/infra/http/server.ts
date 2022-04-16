import { logging } from "utils/logging"
import { app } from "./app"

app.listen(3000, () => {
    logging.debug(`🚀 Server is runnnig!`)
    console.log(`🚀 Server is runnnig!`)
})