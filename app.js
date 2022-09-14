import express from 'express'
import _ from 'lodash'
import ejs from 'ejs'
import bodyParser from 'body-parser'

import getDate from './date.js'

const posts = []
const homeStartingContent =
  'Fameye Accused Of Allegedly Defrauding A Music Group- Takoradi-based sound engineer Body Beatz has alleged that Ghanaian music star Fameye has defrauded Ghanaian/Ivorian music group, Climbie Afrika. According to Body Beatz, producer of Fameyes Long Life ft Kwesi Arthur, Climbie Afrika contacted Fameye for a feature for a song through him.The award-winning musician charged GHS3500, which the group paid. The audio was done.'
const aboutContent =
  'Disclaimer: The views and opinions expressed in articles tagged OPINION are those of the authors and do not necessarily reflect the official policy or position of Gossips24.com. Note that authors of Gossips24.com do have opinions as well which are clearly tagged so'
const contactContent =
  'We love to hear from you; send us your opinions, suggestions, inquiries, complaints via the addresses below.'

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('home', {
    kindOfHomeStartingContent: homeStartingContent,
    posts: posts,
  })
})
app.get('/about', (req, res) => {
  res.render('about', { kindOfAboutContent: aboutContent })
})
app.get('/contact', (req, res) => {
  res.render('contact', { kindOfContactContent: contactContent })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.get('/posts/:postName', (req, res) => {
  const foundPost = posts.find((post) => {
    const postTitle = post.title
    const requestedPostTitle = req.params.postName
    return _.lowerCase(postTitle) === _.lowerCase(requestedPostTitle)
  })
  if (foundPost) {
    res.render('post', { foundPost: foundPost })
  } else {
    res.json({
      status: 404,
      message: 'Page Not Found',
    })
  }
})

app.post('/compose', (req, res) => {
  const date = getDate()
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
    imageURL: req.body.postPhotoURL,
    author: req.body.author,
    date: date,
  }
  posts.push(post)
  res.redirect('/')
})

app.listen(5700, () => {
  console.log('server is running on port 5700')
})
