import Vue from 'vue'
import Main from './main.vue'
let MessageConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

const Gmessage = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let userOnClose = options.onClose
  let id = 'message_' + seed++
  options.onClose = function() {
    Gmessage.close(id, userOnClose);
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instances.push(instance)
  return instance.vm
}

Gmessage.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
}

Gmessage.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
}


export default Gmessage
