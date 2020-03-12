<template>
	<div class="container ">
		<div class="mb-16">
			<h2 class="pt-12 tracking-wide text-4xl text-gray-500 font-bold font-montserrat">
				{{ user.username }}
			</h2>
			<p>
				Member since {{ joined }}
			</p>
		</div>

		<div class="">
			<h1 class="text-xl text-gray-600 font-medium mb-6 font-header tracking-wide"> 
				({{ snippets.length }}) published snippet{{ snippets.length > 1 ? 's' : ''}} 
			</h1>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div class="w-full mb-4" v-for="snippet in snippets" :key="snippet.uuid">
					<nuxt-link :to=" { name : 'snippets-id' , params : { id : snippet.uuid } } " >
						<div class="p-6 rounded bg-gray-800 shadow hover:shadow-xl transition-all duration-300">
							<h2 class="text-gray-200 text-xl font-header font-medium"> {{ snippet.title }} </h2>
						</div>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		head () {
			return {
				title : `Snippet by ${this.user.username}` 
			}
		},
		computed : {
			joined () {
				return moment(this.user.joined_at, 'YYYY-MM-DD').format('Do MMMM YYYY');
			}
		},
		data() {
			return {
				user : null,
				snippets : null
			}
		},
		async asyncData({app, params, error}) {
			try {
				let user = await app.$axios.get(`users/${params.id}`)
				let snippets = await app.$axios.get(`users/${params.id}/snippets`)
				return { 
					user : user.data.data,
					snippets : snippets.data.data
				}
			} catch (e) {
					//
				}
			}
		}
	</script>