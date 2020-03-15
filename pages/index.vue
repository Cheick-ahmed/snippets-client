<template>
	<div class="container my-16">
		<div class="">
			<div class="" v-for="snippet in snippets">

				<nuxt-link :to=" { name : 'snippets-id' , params : { id : snippet.uuid } } ">
					<div class="p-6 mb-4 rounded bg-gray-800 shadow hover:shadow-xl transition-all duration-300 ">
						<nuxt-link :to="{ name : 'author-id', params : { id : snippet.author.data.username }  }" class="block text-muted font-sans text-xs mb-2 capitalize">
							by {{ snippet.author.data.username }} &nbsp; &#8213; &nbsp; Updated : {{ updated(snippet) }}
						</nuxt-link>
						<h2 class="text-gray-200 text-xl font-header font-medium"> {{ snippet.title }} </h2>
					</div>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
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
		},
		methods : {
			updated (snippet) {
				return moment(snippet.updated_at, 'YYYY-MM-DD').fromNow();
			}
		},
	}
</script>
