import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

let Directives = {}
hljs.configure({
  tabReplace: ' '
})
hljs.initHighlighting()
Directives.install = (Vue, options) => {
  Vue.directive('highlight', {
    inserted: (el) => {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i]
        hljs.highlightBlock(item)
      };
    },
    componentUpdated: (el) => {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i]
        hljs.highlightBlock(item)
      };
    }
  })
}

export default Directives
