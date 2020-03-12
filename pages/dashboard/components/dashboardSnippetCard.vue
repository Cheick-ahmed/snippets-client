<template>
	<div class="lg:flex lg:items-center lg:justify-between bg-gray-800 px-4 py-6 mb-8 rounded">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-300 sm:text-3xl sm:leading-9 sm:truncate">
				{{ snippet.title || 'Sans titre' }}
			</h2>
			<div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
				<div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
					<template v-if="!snippet.is_public">
						<svg class="h-5 w-5 mr-1 text-gray-500 group-hover:text-gray-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
						</svg>
						Private
					</template>
					<template v-else>
						<svg class="h-5 w-5 mr-1 text-gray-500 group-hover:text-gray-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
							<path d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
						</svg>
						Public
					</template>
				</div>
			</div>
		</div>
		<div class="mt-5 flex lg:mt-0 lg:ml-4">
			<span class="hidden sm:block shadow-sm rounded-md">
				<nuxt-link :to="{name : 'snippets-id-edit', params : {id : snippet.uuid}}" type="button" class="inline-flex items-center px-4 py-2 border border-blue-800 text-sm leading-5 font-medium rounded-md text-gray-300 bg-blue-900 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-900 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
					<svg class="-ml-1 mr-2 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
					</svg>
					Edit
				</nuxt-link>
			</span>
			<span class="hidden sm:block ml-3 shadow-sm rounded-md">
				<a href="#" @click.prevent="deleteSnippet" type="button" class="inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium rounded-md text-red-700 bg-white hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-red-800 active:bg-gray-50 active:text-red-800 transition duration-150 ease-in-out">
					<svg class="-ml-1 mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
						<path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z"/>
					</svg>
					Delete
				</a>
			</span>
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
		},
		methods : {
			async deleteSnippet() {
				if (!window.confirm('Are sure you want to delete this snippet ?')) {
					return 
				}
				try {
					await this.$axios.delete(`snippets/${this.snippet.uuid}`)
					this.$emit('deleted', this.snippet)
				} catch (e) {
					console.log(e.response.data)
				}
			}
		}
	}
</script>