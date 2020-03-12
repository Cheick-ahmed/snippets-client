<template>
	<div class="w-8/12 mx-auto my-8">
		<div class="py-8 px-4 lg:px-16">
			<h1 class="text-2xl font-medium text-gray-700 lending-tight mb-1 border-b">
				Profile
			</h1>
			<form class="my-10" @submit.prevent="submit">
				<div class="mb-16">
					<div class="flex flex-wrap lg:flex-no-wrap items-center">
						<div class="w-full lg:w-1/2 lg:mr-4 mb-6">
							<label for="prenom" class="block text-gray-600 font-medium mb-2" >
								Name
							</label>
							<input type="text"
							class="shadow focus:shadow-xl rounded-lg w-full p-3 text-gray-700"
							autofocus v-model="form.name" :class="{'border-red-500' : validation.name}">
							<template v-if="validation.name">
								<p class="mt-2 text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.name[0] }}
								</p>
							</template>
						</div>
						<div class="w-full lg:w-1/2 mb-6">
							<label  class="block text-gray-600 font-medium mb-2" >
								Username
							</label>
							<input type="text" class="shadow focus:shadow-xl rounded rounded-lg w-full p-3 text-gray-700 transition-all transition-250" v-model="form.username">
							<template v-if="validation.username" :class="{'border-red-500' : validation.username}">
								<p class="mt-2  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.username[0] }}
								</p>
							</template>
						</div>
					</div>
					<div class="w-full mb-8">
						<label for="email" class="block text-gray-600 font-medium mb-2">
							Email
						</label>
						<input  type="email" class="shadow focus:shadow-xl rounded-lg w-full p-3 mb-2 text-gray-700" v-model="form.email" :class="{'border-red-500' : validation.email}">	
						<template v-if="validation.email">
							<p class="mt-2  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
								{{ validation.email[0] }}
							</p>
						</template>
					</div>
				</div>
				<div class="">
					<h1 class="text-2xl font-medium text-gray-700 lending-tight mb-1 border-b">
						Password (Leave blank to keep it the same.)
					</h1>
					<div class="mt-8">
						<div class="mb-16">
							<label for="password" class="block text-gray-600 font-medium mb-2" >
								New password
							</label>
							<input type="password" class="shadow focus:shadow-xl rounded rounded-lg w-full p-3 text-gray-700 transition-all transition-250" v-model="form.password" :class="{'border-red-500' : validation.password}">
							<template v-if="validation.password">
								<p class="mt-2 text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.password[0] }}
								</p>
							</template>
						</div>

						<button type="submit" class="p-2 px-6 rounded bg-gray-800 text-gray-100 font-header font-semibold">
							Update
						</button>
					</div>
				</div>
			</form>
		</div>

	</div>
</div>
</template>

<script>
	export default {
		middleware : 'auth',
		head () {
			return {
				title : 'Mon compte'
			}
		},
		data () {
			return {
				validation : {},
				form : {
					name : this.$auth.user.name,
					username : this.$auth.user.username,
					email : this.$auth.user.email,
					password : ''
				}
			}
		},
		methods : {
			async submit() {
				try {
					await this.$axios.patch(`users/${this.$auth.user.username}`, this.form)
					await this.$auth.fetchUser()
					
					this.form.password = ''
					this.validation = {}
				} catch (e) {
					if (e.response.status === 422) {
						this.validation = e.response.data.errors
					}
				}
			}
		}
	}
</script>