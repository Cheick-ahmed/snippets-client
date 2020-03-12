<template>
	<div class="min-h-screen py-16 font-rubik">
		<div class="container">
			<h1 class="text-2xl text-gray-200 font-medium mb-12">Users ({{users.length}})</h1>
			<div>
				<table class="min-w-full">
					<thead>
						<tr>
							<th class="px-2 py-3 text-left">Name</th>
							<th class="px-5 py-3 text-left">Username</th>
							<th class="px-5 py-3 text-left">Email</th>


						</tr>
					</thead>
					<tbody class="bg-transparent">
						<tr v-for="user in users">
							<td class="px-5 py-5 border-b border-teal-100  text-sm">
								{{ user.name }}
							</td>
							<td class="px-5 py-5 border-b border-teal-100  text-sm">
								{{ user.username }}
							</td>
							<td class="px-5 py-5 border-b border-teal-100  text-sm">
								{{ user.email }}
							</td>

							<td class="px-5 py-5 border-b-4 border-gray-100 bg-white text-sm">
								<div class="flex items-center justify-between">
									<nuxt-link :to="{ name :'' }">
										<svg class="fill-current h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
										</svg>
									</nuxt-link>
									<a href="#" class="outline-none">
										<svg class="fill-current h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z"/>
										</svg>
									</a>
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
	export default {
		layout : 'admin',
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
		}
	}
</script>