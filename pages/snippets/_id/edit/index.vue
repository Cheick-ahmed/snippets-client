<template>
	<div>
		<div class=" mb-16">
			<div class="container py-10 pb-16">
				<input type="text" class="bg-transparent text-4xl text-gray-700 font-medium leading-tight mb-4 font-header w-full border-dashed border-2 border-gray-400 p-2 hover:border-gray-600 focus:border-gray-600 transition-all transition-250 "
				placeholder="Sans nom " v-model="snippet.title">
				<div class="text-gray-600">
					Créé par
					<nuxt-link :to=" {  } ">
						{{ snippet.author.data.name }}
					</nuxt-link>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="flex items-center">
				<div class="text-xl text-gray-600 font-medium mb-6 mr-2 font-header">
					1/1
				</div>
				<input type="text" class="text-xl text-gray-600 font-medium font-header mb-6 bg-transparent border-dashed border-2 border-gray-400 hover:border-gray-600 focus:border-gray-600 transition-all transition-250 p-2 w-full"
				placeholder="Sans nom" v-model="currentStep.title">
			</div>
			<div class="w-full flex flex-wrap lg:flex-no-wrap items-start mb-16">
				<div class="w-full  mb-10 lg:mb-0 lg:w-8/12 flex lg:mr-16 flex-wrap lg:flex-no-wrap justify-between items-start">
					<div class="order-first">
						<addStepButton :snippet="snippet" :currentStep="currentStep" position="before" @added="handlerStepAdded"/>
					</div>
					<div class="flex flex-col text-gray-600 w-full lg:ml-2 lg:mr-2">
						<stepEditor :step="currentStep" v-model="currentStep.body"/>
					</div>
					<div class="order-first lg:order-last flex flex-row lg:flex-col">
						<nuxt-link :to=" {} " class="block mb-1 lg:mb-2 p-2 mr-2 lg:mr-0 bg-blue-500 rounded-lg">
							<svg class="fill-current text-white h-5 w-5"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
								<path  d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
							</svg>
						</nuxt-link>

						<!-- Edit button -->
<!-- 	<nuxt-link
	:to=" {} "
	class="block mb-1 lg:mb-2 p-2  bg-blue-500 rounded-lg order-first lg:order-last mr-2 lg:mr-0"
	title="Edit"
	>
	<svg 
	class="fill-current text-white h-5 w-5"
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
	<path class="heroicon-ui" d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/>
</svg>
</nuxt-link> -->

<!-- Add button -->
<addStepButton :snippet="snippet" :currentStep="currentStep" position="after" @added="handlerStepAdded"/>

<!-- Delete button -->
<deleteStepButton :snippet="snippet" :currentStep="currentStep" v-if="steps.length > 1"@deleted="handlerStepDeleted"/>

</div>
</div>

<!-- Steps navigation -->
<div class="w-full w-12/12 h-full lg:w-4/12">
	<ul class="list-none mb-12">
		<li class="mb-2" v-for=" ( step , index ) in orderedStepAsc " :key="step.title">
			<nuxt-link :to="{  query : {	step : step.uuid	} } " class="rounded-lg flex items-center text-gray-600 font-bold px-10 py-4" :class=" { 'bg-gray-100' : currentStep.uuid === step.uuid } ">
				<span class="block mr-3"> {{ index + 1 }} .</span> {{ step.title || 'Sans titre' }}
			</nuxt-link>
		</li>
	</ul>

	<div class="border-t-2 py-6 border-gray-300">
		<div class="text-sm text-gray-500 mb-6">
			<template v-if="lastSaved">
				Dernière modification à {{ lastSavedFormatted }}
			</template>
			<template v-else>
				Non enregistré
			</template>
		</div>
		<div class="flex items-center">
			<input type="checkbox" class="mr-2" name="public" v-model="snippet.is_public">
			<label for="public" class="text-gray-600 medium">
				Public
			</label>
		</div>
	</div>
</div>
<!-- End stepNavigation -->
</div>
</div>
</div>
</template>

<script>

	import { orderBy as _orderBy } from 'lodash'
	import { debounce as _debounce } from 'lodash'

	import addStepButton from './components/addStepButton'
	import deleteStepButton from './components/deleteStepButton'
	import stepEditor from './components/stepEditor'

	import moment from 'moment'
	export default {
		middleware : 'auth',
		head() {
			return {
				title : this.snippet.title
			}
		},
		components : {
			addStepButton,
			deleteStepButton,
			stepEditor
		},
		watch : {
			'snippet.title' : {
				handler : _debounce( async function (title) {
					await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
						title
					})
					this.touchLastSaved()
				},1000)
			},

			'snippet.is_public' : {
				handler : _debounce( async function (isPublic) {
					await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
						is_public : isPublic
					})
					this.touchLastSaved()
				},1000)
			},
			'currentStep' : {
				deep : true,
				handler : _debounce( async function (step) {
					await this.$axios.$patch(`snippets/${this.snippet.uuid}/steps/${step.uuid}`, {
						title : step.title,
						body : step.body
					})
					this.touchLastSaved()
				},1000)
			},
		},

		data() {
			return {
				snippet : null, 
				steps : [],
				lastSaved : null
			}
		},

		computed : {
			lastSavedFormatted() {
				return moment(this.lastSaved).format('hh:mm:ss')
			},
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
		methods : {
			touchLastSaved() {
				this.lastSaved = moment.now()
			},
			handlerStepAdded(step) {
				this.steps.push(step)
				this.$router.push({
					query : step.uuid
				})
			},
			handlerStepDeleted(step) {
				this.steps = this.steps.filter((s) => {
					return s.uuid !== step.uuid
				})
				this.$router.push({
					query : this.firstStep.uuid
				})
			}
		},
		async asyncData( { app, params, error }) {
			try {
				let snippet = await app.$axios.$get(`snippets/${params.id}`)
				return {
					snippet : snippet.data,
					steps : snippet.data.steps.data
				}
			} catch (e) {
				error({ statusCode: e.response.data, message: e.response.data.message })
			}
		}
	}
</script>