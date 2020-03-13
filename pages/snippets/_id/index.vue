<template>
	<div class="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-6 lg:py-16">
		<div class="lg:pt-24">
			<div class="w-full">
				<ul class="list-none">
					<li class="mb-2" v-for=" ( step , index ) in orderedStepAsc " :key="step.id">
						<nuxt-link :to="{  query : { step : step.uuid } }" class="rounded-lg flex items-center text-gray-600 font-bold px-6 py-4":class=" { 'bg-gray-100' : currentStep.uuid === step.uuid } ">
							<span class="block mr-3"> {{ index + 1 }} .</span> {{ step.title || 'Sans titre' }}
						</nuxt-link>
					</li>
				</ul>
				<div class="text-muted font-header text-sm text-gray-100 mt-10 lg:mt-16">
					Created by
					<nuxt-link :to="{ name : 'author-id' , params : { id : snippet.author.data.username } }" class="">
						{{ snippet.author.data.username }}
					</nuxt-link>
				</div>
			</div>
		</div>
		<div class="lg:col-span-2">
			<div class="mb-12">
				<h1 class="text-3xl text-white font-medium leading-tight mb-4 flex items-center">
					{{ snippet.title }}
				</h1>
			</div>
			<div class="container">
				<h1 class="text-3xl text-gray-600 font-medium mb-6 lg:mb-12">
					{{ currentStep.title }}
				</h1>
				<div class="w-full flex flex-wrap lg:flex-no-wrap items-start mb-16">
					<div class="w-full">
						<stepMarkdown :value="currentStep.body" /> 
					</div>
				</div>
			</div>

			<!-- Step title -->
		</div>
	</div>
</template>

<script>
	import { orderBy as _orderBy } from 'lodash'
	import stepMarkdown from '@/components/snippets/stepMarkdown'

	export default {
		head() {
			return {
				title : `${this.snippet.title}`
			}
		},
		components : {
			stepMarkdown
		},
		data() {
			return {
				snippet : null,
				steps : []
			}
		},

		computed : {
			orderedStepAsc() {
				return _orderBy(
					this.steps , 'order', 'asc'
					)
			},

			firstStep() {
				return this.orderedStepAsc[0]
			},

			currentStep() {
				return this.orderedStepAsc.find(
					(s) => s.uuid === this.$route.query.step
					) || this.firstStep
			},

		},
		async asyncData( { app, params }) {
			let snippet =await app.$axios.$get(`snippets/${params.id}`)

			return {
				snippet : snippet.data,
				steps : snippet.data.steps.data
			}
		}
	}
</script>