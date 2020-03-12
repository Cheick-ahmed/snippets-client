<template>
	<a
	@click.prevent="deleteStep"
	class="block mb-1 lg:mb-2 p-2  bg-blue-500 rounded-lg order-first lg:order-last mr-2 lg:mr-0 cursor-pointer"
	title="Delete"
	>
	<svg 
	class="fill-current text-white h-5 w-5"
	xmlns="http://www.w3.org/2000/svg" 
	viewBox="0 0 24 24" width="24" height="24">
	<path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/></svg>
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
			}
		},

		methods : {
			async deleteStep() {
				await this.$axios.delete(`snippets/${this.snippet.uuid}/steps/${this.currentStep.uuid}`)

				this.$emit('deleted', this.currentStep)
			}
		}
	}
</script>