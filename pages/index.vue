<template>
	<div class="container my-16">
		<div class="mb-6 lg:mb-12">
			<div class="" v-for="snippet in snippets">
				<nuxt-link :to=" { name : 'snippets-id' , params : { id : snippet.uuid } } ">
					<div class="p-6 mb-4 rounded bg-gray-800 shadow hover:shadow-xl transition-all duration-300 ">
						<nuxt-link :to="{ name : 'author-id', params : { id : snippet.author.data.username }  }" class="block text-muted font-sans text-xs mb-2 capitalize">
							by {{ snippet.author.data.username }} &nbsp; &#8213; &nbsp; updated : <span class="lowercase">{{ updated(snippet) }}</span>
						</nuxt-link>
						<h2 class="text-gray-200 text-xl font-header font-medium"> {{ snippet.title }} </h2>
					</div>
				</nuxt-link>
			</div>
		</div>
		<div class="text-center" v-if="snippets.length > 12">
			<nuxt-link :to=" { name : 'snippets' } " class="shadow hover:shadow-lg px-8 py-3 text-center rounded border border-teal-400 text-teal-400 text-xs uppercase transition-all duration-500">
				View more &nbsp; &rarr;
			</nuxt-link>
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
				moment.locale('fr')
				return moment(snippet.updated_at, 'YYYY-MM-DD').format('Do MMMM YYYY');
			}
		}
	}
</script>
