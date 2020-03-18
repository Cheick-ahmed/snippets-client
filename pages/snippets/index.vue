<template>
	<div>
		<div class="mb-10">
			<div class="container py-10">
				<h1 class="text-4xl text-gray-300 font-medium leading-tight mb-4">
					All snippet{{snippets.length > 1 ? 's' : ''}} ({{snippets.length}})
				</h1>
			</div>
		</div>

		<div class="container">
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
	</div>
</template>

<script>
	import moment from 'moment'
	import snippetCard from '@/components/snippets/snippetCard'
	export default {
		head () {
			return {
				title : 'Snippets'
			}
		},
		components : {
			snippetCard
		},
		data () {
			return {
				snippets : null
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