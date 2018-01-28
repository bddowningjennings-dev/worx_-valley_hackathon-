const
  PORT = 5000,
  DATABASE = 'worx',
  bodyParser = require('body-parser'),
  cors = require('cors'),
  express = require('express'),
  app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./server/config/routes')(app);
require('./server/config/mongoose')(DATABASE);

app.listen(PORT, ()=>console.log(`(server): listening on port ${PORT}...`))