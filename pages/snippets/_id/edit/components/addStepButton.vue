<template>
	<a
	@click="addStep"
	class="block mb-1 lg:mb-2 p-2  bg-blue-500 rounded-lg order-last mr-2 lg:mr-0 cursor-pointer"
	:title=" `add step ${position}` "
	>
	<svg 
	class="fill-current text-white h-5 w-5"
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
	<path  d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
</svg>
</a>
</template>

<script>
	export default {
		props : {
			snippet : {
				required : true, 
				type : Object
			},
			currentStep : {
				required : true, 
				type : Object
			},
			position : {
				required : true, 
				type : String
			}
		},

		methods : {
			async addStep() {
				let response = await this.$axios.post(`snippets/${this.snippet.uuid}/steps`, {
					[this.position]: this.currentStep.uuid
				})

				this.$emit('added', response.data.data)
			}
		}
	}
</script>