const createExpressApp = require('./app.js')
const database = require('./config/database')

const app = createExpressApp(database)
//Handle Production
// if (process.env.NODE_ENV === "production") {
//     //Static Folder
//     app.use(express.static(__dirname + "/public"));
//     //Handle SPA
//     app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
//   }
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));


