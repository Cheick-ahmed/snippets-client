<template>
	<div class="">
		<div>
			<nav class="shadow ">
				<div class="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h2 class="text-3xl font-bold leading-tight text-gray-900">
						Dashboard
					</h2>
				</div>
			</nav>
			<main>
				<div class="max-w-7xl mx-auto pt-16 sm:px-6 lg:px-8">
					<nuxt />
				</div>
			</main>
		</div>
	</div>
</template>

<script>
	export default {
		middleware : 'auth',
		head () {
			return {
				title : 'Admin'
			}
		},
		data () {
			return {
				open : false
			}
		}
	}
</script>