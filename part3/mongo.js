const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.b7nt8.mongodb.net/Phonebook_Part3?retryWrites=true`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)


const name = process.argv[3]
const number = process.argv[4]

const phonebook = new Phonebook({
  name: name,
  number: number,
})

if (process.argv.length === 3) {
  console.log('phonebook: \n')
    Phonebook
        .find({})
        .then(result => {
            result.forEach(phonebook => {
                console.log(phonebook)
            })
            mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    phonebook.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })
}
