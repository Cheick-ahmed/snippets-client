<template>
	<div class="container my-16">
		<div class="">
			<div class="w-full" v-for="snippet in snippets">
				<nuxt-link :to=" { name : 'snippets-id' , params : { id : snippet.uuid } } " >
					<div class="p-6 mb-10 rounded bg-gray-800  transition-all duration-500">
						<nuxt-link :to="{ name : 'author-id', params : { id : snippet.author.data.username }  }" class="block text-muted font-sans text-xs mb-2 capitalize">
							by {{ snippet.author.data.username }}
						</nuxt-link>
						<h2 class="text-gray-200 text-xl font-header font-medium"> {{ snippet.title }} </h2>
						<!-- <div class="flex items-center font-rubik mt-4">
							<span class="text-teal-400 font-semibold mr-4">#php</span>
							<span class="text-teal-400 font-semibold">#java</span>
						</div> -->
					</div>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		head() {
			return {
				title : 'CodeSnippet',
				titleTemplate : null
			}
		},

		data() {
			return {
				snippets : null,
				test:''
			}
		},

		async asyncData( { app }) {
			let snippets = await app.$axios.$get('snippets')

			return {
				snippets : snippets.data
			}
		}
	}
</script>
