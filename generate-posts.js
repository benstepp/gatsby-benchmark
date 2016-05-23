const OUTPUT_DIR = 'pages/posts'
const POST_COUNT = process.env.POST_COUNT || 500

const path = require('path')
const fs = require('fs')
const exec = require('child_process').execSync
const _ = require('lodash')
const faker = require('faker')
const moment = require('moment')
const random = _.random

function generateSentence(wordCount) {
  return faker.lorem.sentences(wordCount)
}

function generateTitle() {
  return faker.lorem.words(5)
}

function generateDate() {
  const date = faker.date.past()
  return moment(date).format('YYYY[-]MM[-]DD')
}

function generateContent() {
  return faker.lorem.paragraphs(random(15, 30))
}

function createPost(index) {
  const title = generateTitle()
  const description = generateSentence(20)
  const date = generateDate()
  const slug = date + '-' + title.replace(/\s/g, '-').toLowerCase()
  const content = generateContent()

  const post = `
  ===
    title: ${title}
    description: ${description}
  ===
  ${content}
  `

  const file = path.resolve('.', OUTPUT_DIR, `${slug}.md`)
  fs.writeFile(file, post, 'utf-8', function (err) {
  })
}

const output = path.resolve('.', OUTPUT_DIR)
exec(`rm -rf ${output} || true`)
exec(`mkdir ${output}`)

_.times(POST_COUNT, (index) => {
  createPost(index)
})

console.info(`${POST_COUNT} posts generated`)
