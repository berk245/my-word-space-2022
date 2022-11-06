const makeApp = require('../app')

const services = require('./services')
const app = makeApp(services)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
