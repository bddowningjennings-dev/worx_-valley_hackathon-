const
  mongoose = require('mongoose')

module.exports = (database) => {
  mongoose.connect(`mongodb://localhost/${database}`)
  .then(()=>console.log(`(database): connected to ${database}...`))
  .catch((err)=>console.log(err))
}
