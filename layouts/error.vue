<template>
	<div class="text-center font-rubik text-gray-500">
		<template v-if="error.statusCode === 404">
			<img src="~assets/img/404.svg" alt="404" class="h-64">
			<p class="text-3xl mt-6">
				Page not found
			</p>
			<nuxt-link :to="{name : 'index'}">Go home</nuxt-link>
		</template>
		<template v-else>
			<h1 class="text-6xl text-center">
				500
			</h1>
			<p class="text-3xl">
				Something isn't right here.
				<nuxt-link :to="{name : 'index'}">Go home</nuxt-link>
			</p>
		</template>
		
	</div>
</template>

<script>
	export default {
		layout : 'customError',
		props: ['error'],
	}
</script>