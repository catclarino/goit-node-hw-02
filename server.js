const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log("Database connection successful");
        console.log(`Server running on port: ${PORT}`);
    });
})
.catch((error) => {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
});