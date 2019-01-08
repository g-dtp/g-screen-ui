<template lang="pug">
  .loading__contain(v-if="loading")
    component(:is="lType")
    .loading__text {{text}}
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
