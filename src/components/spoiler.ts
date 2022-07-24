import { mergeAttributes, Node, VueNodeViewRenderer } from "@tiptap/vue-3"

import SpoilerNodeView from './SpoilerNodeView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spoiler: {
      /**
       * Set a spoiler 
       */
      setSpoiler: () => ReturnType,
    }
  }
}

export const Spoiler = Node.create({
  name: 'spoiler',

  group: 'inline',

  inline: true,

  content: 'inline',

  defining: true,

  addAttributes () {
    return {
      spoiler: {
        default: 'true',
        parseHTML: (el) => (el as HTMLSpanElement).getAttribute('data-spoiler'),
        renderHTML: ({ spoiler }) => ({ 'data-spoiler': spoiler }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-spoiler]',
        getAttrs: (el) => !!(el as HTMLDivElement).getAttribute('data-spoiler')?.trim() && null,
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [ 'span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0 ]
  },

  addCommands() {
    return {
      setSpoiler: () => ({ chain, state }) => {
        const { from, to } = state.selection

        const selectionText = state.doc.textBetween(from, to)

        return chain()
          .focus()
          .insertContentAt({ from, to },
            {
              type: this.name,
              content: [
                {
                  type: 'text',
                  text: selectionText
                },
              ]
            },
          )
          .run()
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(SpoilerNodeView)
  }
})
