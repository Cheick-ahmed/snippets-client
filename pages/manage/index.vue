<template>
	<div class="min-h-screen font-rubik w-full">
		<div class="container">
			<h2 class="text-3xl font-bold leading-tight text-gray-200 mb-10">
				Users ({{users.length}})
			</h2>
			<div>
				<table class="min-w-full">
					<thead class="text-gray-300">
						<tr>
							<th class="pr-5 py-3 text-left">Name</th>
							<th class="px-5 py-3 text-left">Username</th>
							<th class="px-5 py-3 text-left">Email</th>
							<th class="px-5 py-3 text-left">Join at</th>
							<th class="px-5 py-3 text-left"></th>
						</tr>
					</thead>
					<tbody class="bg-transparent text-gray-400">
						<tr v-for="user in users">
							<td class="pr-5 py-5  text-sm">
								{{ user.name }}
							</td>
							<td class="px-5 py-5  text-sm">
								{{ user.username }}
							</td>
							<td class="px-5 py-5  text-sm">
								{{ user.email }}
							</td>
							<td class="px-5 py-5  text-sm">
								{{ join(user) }}
							</td>

							<td class="pl-5 py-5 text-sm">
								<div class="flex lg:mt-0">
									<span class="hidden sm:block shadow-sm rounded-md mr-4">
										<nuxt-link :to="{name : ''}" type="button" class="inline-flex items-center px-4 py-2 border border-blue-800 text-sm leading-5 font-medium rounded-md text-gray-300 bg-blue-900 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-900 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
											<svg class="-ml-1 mr-2 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
												<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
											</svg>
											Edit
										</nuxt-link>
									</span>
									<span class="hidden sm:block shadow-sm rounded-md">
										<a href="#" type="button" class="inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium rounded-md text-red-700 bg-white hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-red-800 active:bg-gray-50 active:text-red-800 transition duration-150 ease-in-out">
											<svg class="-ml-1 mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
												<path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z"/>
											</svg>
											Delete
										</a>
									</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		layout : 'admin',
		head () {
			return {
				title : 'Users'
			}
		},
		data () {
			return {
				users : null
			}
		},
		async asyncData ({app,error}) {
			try {
				let users = await app.$axios.get('admin/users')
				return { users : users.data.data }
			} catch (e) {
				if (e.response.status === 403) {
					error({ statusCode: 404, message: 'Page not found.'})
				}
				else {
					error({ statusCode: 500, message: 'Une erreur est survenue.'})
				}
			}
		},
		methods : {
			join (user) {
				moment.locale('fr')
				return moment(user.join_at, 'YYYY-MM-DD').format('Do MMMM YYYY');
			}
		}
	}
</script>