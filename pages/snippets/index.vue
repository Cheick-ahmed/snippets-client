<template>
	<div>
		<div class="bg-white mb-16">
			<div class="container py-10 pb-16">
				<h1 class="text-4xl text-gray-900 font-medium leading-tight mb-4">
					Snippets
				</h1>
			</div>
		</div>

		<div class="container mb-16">
			<h1 class="text-center text-2xl text-gray-600 font-medium  mb-16">
				({{ snippets.length }}) snippet{{snippets.length > 1 ? 's' : ''}} trouvé{{snippets.length > 1 ? 's' : ''}}
			</h1>

			<snippet-card 
			v-for="snippet in snippets"
			:key="snippet.uuid"
			:snippet="snippet"
			>
			
			<nuxt-link
			:to=" {} "
			>
				{{ snippet.author.data.name }}
			</nuxt-link>
			
		</snippet-card>
	</div>
</div>
</template>

<script>
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
		}
	}
</script>