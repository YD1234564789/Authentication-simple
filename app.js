const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const users = require('./models/seeds/users')
const app = express()
const port = 3000


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended:false}))

// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// 驗證資料
app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(user => user.email === email)
  let errorMeg = ''

  if (!user) {
    errorMeg = 'Email error'
    res.render('index', { errorMeg })
    return
  }
  if (user.password !== password) {
    errorMeg = 'Password error'
    res.render('index', { errorMeg })
    return
  }
  res.redirect(`/welcome/${user.firstName}`)
})

// 登入成功
app.get('/welcome/:name', (req, res) => {
  const name = req.params.name
  res.render('welcome', { name })
})


app.listen(port, () =>{
  console.log(`App is running on ${port}`)
})