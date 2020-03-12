<template>
	<div>
		<textarea ref="textarea"autofocus></textarea>
		<div class="bg-transparent p-6 rounded-lg border border-gray-200" v-if="step.body.length">
			<stepMarkdown 
			:value="step.body"
			/> 
		</div>
	</div>
</template>

<script>
	import stepMarkdown from '@/components/snippets/stepMarkdown'
	export default {
		components : {
			stepMarkdown
		},
		data() {
			return {
				codemirror : null
			}
		},
		props : {
			step : {
				required : true,
				type : Object
			}
		},

		computed : {
			document() {
				return this.codemirror.getDoc()
			}
		},

		watch : {
			'step.uuid' () {
				this.document.setValue(this.step.body)
			}
		},


		mounted() {
			let CodeMirror = require('codemirror')

			this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, {
				indentUnit : 2,
				indentWithTabs : false,
				smartIndent : true,
				lineWrapping : true,
				lineNumbers : false,
				scrollbarStyle : null,
				extraKeys : {
					Tab : (codemirror) => codemirror.execCommand('indentMore'),
					'Shift-Tab' : (codemirror) => codemirror.execCommand('indentLess')
				}
			})

			this.document.setValue(this.step.body)

			this.document.on('change', (document) => {
				this.$emit('input', document.getValue())
			})
		}
	}
</script>

<style lang="scss">
.CodeMirror {
	@apply resize-none text-base w-full max-w-full font-medium text-gray-600 border border-gray-300 rounded p-6 mb-6 leading-tight;
}
</style>