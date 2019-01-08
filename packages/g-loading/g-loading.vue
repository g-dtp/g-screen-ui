<template lang="pug">
  .g-loading__contain(v-if="loading")
    component(:is="lType")
    .g-loading__text(v-if="text") {{text}}
</template>

<script>
import boun from './type/double-boun'
import wave from './type/wave'
import circles from './type/circle'
export default {
  components: {
    boun,
    wave,
    circles
  },
  props: ['type', 'loading', 'text'],
  computed: {
    lType () {
      return this.type || 'boun'
    }
  }
}
</script>
