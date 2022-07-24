<template>
  <button @click="setSpoiler">
    set spoiler
  </button>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import { Spoiler } from './spoiler'


const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
    Spoiler,
  ],
})

const setSpoiler = () => editor.value?.chain().focus().setSpoiler().run()
</script>
