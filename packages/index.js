import GFloatBall from './g-float-ball'
import GPopup from './g-popup'
import GPopover from './g-popover'
import GSelect from './g-select'
import GSelectTree from './g-select-tree'

import GToggleButton from './g-toggle-button'

import GDialog from './g-dialog'
import GTable from './g-table'

import GLoading from './g-loading'

import GMessage from './g-message'
const install = function(Vue, opts = {}) {
	Vue.prototype.$gmessage = GMessage
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
	GToggleButton,
	GFloatBall,
	GPopup,
	GPopover,
	GSelect,
	GSelectTree,
	GDialog,
	GTable,
	GLoading,
	install,
	GMessage 
}
