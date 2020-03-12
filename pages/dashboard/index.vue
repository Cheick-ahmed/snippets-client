<template>
	<div>
		<div class="my-10">
			<div class="container flex items-center justify-between">
				<h1 class="text-3xl font-header text-gray-600 font-medium">
					<template v-if="snippets.length">
						Mes snippets ({{ snippets.length }})
					</template>
					<template v-else>
						Pas encore de snippet
					</template>
				</h1>
				<a href="#" class="mb-2" @click.prevent="createSnippet">
					New snippet
				</a>
			</div>
		</div>


		<div class="container mb-8 lg:mb-16">
			<dashboardSnippetCard v-for="snippet in snippets" :key="snippet.uuid" :snippet="snippet" @deleted="deletedSnippet(snippet)" />
		</div>
	</div>
</template>

<script>
	import dashboardSnippetCard from './components/dashboardSnippetCard'
	export default {
		middleware : 'auth',
		head () {
			return {
				title : 'Mon dashboard'
			}
		},
		components : {
			dashboardSnippetCard
		},
		data() {
			return {
				snippets : null
			}
		},
		methods : {
			deletedSnippet(snippet) {
				this.snippets = this.snippets.filter((s) => s.uuid !== snippet.uuid)
			},
			async createSnippet() {
				let snippet = await this.$axios.post('snippets')
				
				this.$router.push({
					name : 'snippets-id-edit',
					params : { id : snippet.data.data.uuid },
				})
			}
		},
		async asyncData( { app}) {
			let snippets = await app.$axios.$get('me/snippets')
			return {
				snippets : snippets.data,
			}
		}
	}
</script>