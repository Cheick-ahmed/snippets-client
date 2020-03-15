<template>
	<div class="min-h-screen flex items-center justify-center sm:-my-12 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-xl w-full">
			<div>
				<h2 class="mt-6 font-header text-center text-4xl leading-6 font-extrabold text-gray-300">
					Register.
				</h2>
			</div>
			<form class="mt-8" @submit.prevent="submit">
				<div class="rounded-md shadow-sm">
					<div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
						<div class="">
							<label for="name" class="block mb-1 text-gray-600 font-semibold">
								Name
							</label>
							<input aria-label="Your name" name="name" type="text" class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 rounded" placeholder="Your name" :class="{ 'border-red-500 transition-all transition-250' : validation.name }" v-model="form.name"/>
							<template v-if="validation.name">
								<p class="mt-1  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.name[0] }}
								</p>
							</template>
						</div>

						<div class="mb-4">
							<label for="name" class="block mb-1 text-gray-600 font-semibold">
								Username
							</label>
							<input aria-label="Username" name="username" type="text" class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 rounded" placeholder="Your username" :class="{ 'border-red-500 transition-all transition-250' : validation.username }" v-model="form.username"/>
							<template v-if="validation.username">
								<p class="mt-1  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.username[0] }}
								</p>
							</template>
						</div>
					</div>
					
					<div class="mb-4">
						<label for="email" class="block mb-1 text-gray-600 font-semibold">
							Email
						</label>
						<input aria-label="Email address" name="email" type="email" class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 rounded" placeholder="Email address" :class="{ 'border-red-500 transition-all transition-250' : validation.email }" v-model="form.email"/>
						<template v-if="validation.email">
							<p class="mt-1  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
								{{ validation.email[0] }}
							</p>
						</template>
					</div>
					<div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
						<div class="">
							<label for="password" class="block mb-1 text-gray-600 font-semibold">
								Password
							</label>
							<input aria-label="Password" name="password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300  sm:text-sm sm:leading-5 rounded" placeholder="Password" :class="{ 'border-red-500 transition-all transition-250' : validation.password }" v-model="form.password" />
							<template v-if="validation.password">
								<p class="mt-1  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.password[0] }}
								</p>
							</template>
						</div>
						<div class="mb-4">
							<label for="password" class="block mb-1 text-gray-600 font-semibold">
								Confirmm password
							</label>
							<input aria-label="Confirm password" name="password_confirmation" type="password" class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300  sm:text-sm sm:leading-5 rounded" placeholder="Password" :class="{ 'border-red-500 transition-all transition-250' : validation.password_confirmation }" v-model="form.password_confirmation" />
							<template v-if="validation.password_confirmation">
								<p class="mt-1  text-sm leading-5 font-semibold text-red-500 max-w transition duration-700">
									{{ validation.password_confirmation[0] }}
								</p>
							</template>
						</div>
					</div>	
				</div>
				<div class="mt-6">
					<button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-300 ease-in-out">
						Register
					</button>
				</div>
			</form>
			<div class="mt-8 text-center">
				<p class="mt-2  text-sm leading-5 font-semibold text-gray-300 max-w transition duration-700">
					Already got account ? <nuxt-link :to="{name : 'auth-login'}">Sign in</nuxt-link>
				</p>
			</div>
		</div>
	</div>
</div>
</div>
</div>
</template>

<script>
	export default {
		head() {
			return {
				title : 'Register'
			}
		},
		data () {
			return {
				form : {
					name : '',
					username : '',
					email : '',
					password : '',
					password_confirmation : ''
				},
				validation : {}
			}
		},
		methods : {
			async submit() {
				try {
					await this.$axios.post('auth/register', this.form)
					this.$router.push({
						name : 'auth-login'
					})
				} catch (e) {
					if (e.response.status === 422) {
						this.validation = e.response.data.errors					}
					}
				}
			}
		}
	</script>