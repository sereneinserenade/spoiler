<script setup lang="ts">
import { Editor, Node, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { Node as ProseMirrorNode } from 'prosemirror-model'
import { Decoration } from 'prosemirror-view'
import { ref } from 'vue';

interface Props {
  editor: Editor
  node: ProseMirrorNode
  decorations: Decoration
  selected: boolean
  extension: Node<any, any>
  getPos: () => number
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}

const isSpoilerVisible = ref(false)
</script>

<template>
  <node-view-wrapper @click="isSpoilerVisible = !isSpoilerVisible" as="span" class="spoiler flex flex-col gap-2" :class="[{ 'hidden': !isSpoilerVisible }]">
    <NodeViewContent />
  </node-view-wrapper>
</template>

<style >
.spoiler {
  display: inline-flex;
  background-color: rgba(128, 128, 128, 0.2);
}
.spoiler.hidden {
  color: transparent;
}
</style>
