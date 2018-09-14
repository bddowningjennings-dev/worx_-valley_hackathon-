const
  PORT = 8001,
  DATABASE = 'worx',
  bodyParser = require('body-parser'),
  cors = require('cors'),
  express = require('express'),
  app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public/static'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/public');


require('./server/config/routes')(app);
require('./server/config/mongoose')(DATABASE);

app.get('/worx', (req, res) => res.render('index'))

app.listen(PORT, ()=>console.log(`(server): listening on port ${PORT}...`))