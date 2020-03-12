<template>
	<div class="bg-gray-900 flex items-center pb-2">
		<div class="container flex flex-wrap lg:flex-no-wrap items-center">
			<nuxt-link :to=" { name : 'index' } " class="text-xl text-teal-400 font-semibold py-4 mr-6">
			CodeSnippets.</span>
		</nuxt-link>

		<span class="lg:hidden ml-auto relative flex flex-col justify-center h-8 w-8" @click=" mobileNavOpen = !mobileNavOpen ">
			<span class="h-1 w-6 rounded bg-teal-400 mb-1 transition-all duration-300" :class=" { 'transform rotate-135 absolute right-0' : mobileNavOpen } "></span>
			<span class="h-1 w-6 rounded bg-teal-400 mb-1 transition-all duration-300" :class=" { 'transform -rotate-135 absolute right-0' : mobileNavOpen } "></span>
			<span class="h-1 w-6 rounded bg-teal-400" :class=" { 'hidden' : mobileNavOpen } "></span>
		</span>		

		<div class="flex w-full" :class=" { 'hidden lg:flex' : !mobileNavOpen, ' ' : mobileNavOpen}">
			<ul class="h-24 lg:flex items-center lg:ml-auto">
				<template v-if="$auth.loggedIn">
					<li>
						<nuxt-link :to=" { name : 'dashboard' } " class="text-lg text-gray-700 lg:py-8 lg:px-4">
							Dashboard
						</nuxt-link>
					</li>

					<li>
						<nuxt-link 	:to=" { name : 'account' } " class="text-lg text-gray-700 lg:py-8 lg:px-4">
							{{ $auth.user.username}}
						</nuxt-link>
					</li>
					<li>
						<a href="#" @click.prevent="logout" class="text-lg text-gray-700 lg:py-8 lg:px-4">
							Déconnection
						</a>
					</li>
				</template>

				<template v-else>
					<li class="xs:py-2 lg:py-0">
						<nuxt-link :to=" { name : 'auth-login' } " class="text-md font-bold text-gray-500 py-2 lg:py-4 lg:px-3 mr-3 hover:text-gray-700 hover:underline transition-all transition-1000">
							Sign in
						</nuxt-link>
					</li>
				</template>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				mobileNavOpen : false
			}
		},
		methods : {
			async logout() {
				await this.$auth.logout()
			}
		}
	}
</script>