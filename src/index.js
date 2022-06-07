const express = require('express')
const ejs = require('ejs')
const csv = require("csv")
const fs = require("fs")
const app = express()
const port = 3000
const path = require('path');
const capitals = []
const contingutTotal = []
const contingutNetflix = []
const contingut2021 = []
let continents
let countries

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

fs.createReadStream("maps/capitals.csv")
  .pipe(csv.parse({ 
    delimiter: ";",
    from_line: 2
  }))
  .on("data", (data => capitals.push(data)))

fs.createReadStream("data/contingutTotal.csv")
  .pipe(csv.parse({ 
    delimiter: "|",
    from_line: 2
  }))
  .on("data", (data => contingutTotal.push(data)))

fs.createReadStream("data/contingutNetflix.csv")
.pipe(csv.parse({ 
  delimiter: "|",
  from_line: 2
}))
.on("data", (data => contingutNetflix.push(data)))

fs.createReadStream("data/contingut2021.csv")
.pipe(csv.parse({ 
  delimiter: "|",
  from_line: 2
}))
.on("data", (data => contingut2021.push(data)))

fs.readFile('maps/continents.geojson', (err, data) => {
  continents = JSON.parse(data);
});

fs.readFile('maps/countries.geojson', (err, data) => {
  countries = JSON.parse(data);
});

app.get('/', (req, res) => {
  res.render("index", { 
    continents: continents, 
    countries: countries,
    capitals: capitals,
    contingutTotal: contingutTotal,
    contingutNetflix: contingutNetflix,
    contingut2021: contingut2021,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})