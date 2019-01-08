### 大屏UI组件 编写规范

#### 文件规范

1. 缩进规范。

   tab-size为4，统一采用tab缩进， 不可出现space缩进。

2. 命名

   文件名全部采用连字符, 例：xx-xx， 请勿使用驼峰规则命名。

#### 组件结构规范。

```vue
<template lang='pug'>
	.g-demo //模板使用pug
</template>
<script>
import XXX from 'xxx';
export default {
	name: "g-demo",
	components: {
		'xxx': XXX,
	},
	filters: {},
	directives: {},
	mixins: [],
	model: {},
	data() {
		return {
		    xxx: ''
		};
	},
	computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    deactivated() {},
    errorCaptured() {},
    methods: {
        handleFn() {
            console.log(arguments);
        }
    },
};
</script>
//样式和组件分离
```