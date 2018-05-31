import markdownIt from 'markdown-it'

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

export default markdown.render.bind(markdown)

