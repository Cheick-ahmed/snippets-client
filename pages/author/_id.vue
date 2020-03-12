<template>
	<div class="container">
		<div class="mb-16">
			<h2 class="pt-12 tracking-wide text-4xl text-gray-500 font-bold font-montserrat">
				{{ user.username }}
			</h2>
			<p>
				Member since {{ joined }}
			</p>
		</div>
		
		<div class="w-full mb-4" v-for="snippet in snippets" :key="snippet.uuid">
			<nuxt-link :to=" { name : 'snippets-id' , params : { id : snippet.uuid } } " >
				<div class="p-6  rounded bg-gray-800  transition-all duration-500">
					<h2 class="text-gray-200 text-xl font-header font-medium"> {{ snippet.title }} </h2>
						<!-- <div class="flex items-center font-rubik mt-4">
							<span class="text-teal-400 font-semibold mr-4">#php</span>
							<span class="text-teal-400 font-semibold">#java</span>
						</div> -->
					</div>
				</nuxt-link>
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
					console.log(e)
				}
			}
		}
	</script>