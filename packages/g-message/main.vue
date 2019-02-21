<template lang="pug">
  transition
    .g-message-box(v-if="visible" :class="position")
      .g-message-back(v-if="shadow")
      .g-message-content(:class="[visible?'slideIn':'',type]")
        span.icon-box
          svg.gs-icon.gs-icon-ios-alert(aria-hidden="true")
            use(xlink:href="#gs-icon-ios-alert")
        span {{message}}
</template>

<script>
import 'packages/theme/fonts/iconfont'
import 'packages/theme/message.styl'
export default {
  data () {
    return {
      visible: false,
      message: '',
      duration: 3000,
      timer: null,
      onClose: null,
      closed: false,
      type:  'info',
      shadow: true,
      position: 'center'
    }
  },
  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (this.visible) {
            this.close()
          }
        }, this.duration)
      }
    },

    close() {
      this.visible = false
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer() {
      clearTimeout(this.timer)
    },

    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (this.visible) {
          this.close()
        }
      }
    }

  },
  mounted () {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  }
}
</script>

<style lang="stylus">

</style>
