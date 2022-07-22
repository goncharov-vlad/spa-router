const path = require('path')
const express = require('express')
const app = express()
const public = path.join(__dirname, 'public')
const ejs = require('ejs')
const port = 3000

app.engine('html', ejs.renderFile);

app.use(express.static(public));

app.set('view engine', 'html');

app.all('*', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Ready on port ${port}`))