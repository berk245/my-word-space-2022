const app = require("../app");
const path = require('path')

require("dotenv").config({path: path.join(__dirname, '..', '.env')})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
