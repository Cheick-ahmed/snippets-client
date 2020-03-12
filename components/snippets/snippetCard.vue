<template>
	<div 
	class="p-8 bg-white mb-4 rounded-lg flex flex-wrap lg:flex-no-wrap items-center justify-between"
	>
	<div class="mr-8 mb-2 lg:mb-0">
		<h1 class=" text-xl leading-snug">
			<nuxt-link
			class="text-gray-600"
			:to=" { 
				name : 'snippets-id',
				params : { 
					id : snippet.uuid
				}
			}"
			>
			{{ snippet.title || 'Sans nom' }}
		</nuxt-link>
	</h1>

	<div class="text-gray-500 mr-6 font-medium">
		{{ snippet.steps_count }} steps
	</div>
</div>

<div>
	<slot />
</div>

</div>
</template>

<script>
	export default {
		props : {
			snippet : {
				required : true,
				type : Object 
			}
		}
	}
</script>