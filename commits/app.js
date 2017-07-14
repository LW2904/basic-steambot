console.log('app.js loaded')

let URL = 'https://api.github.com/repos/lw2904/basic-steambot/commits?per_page='

Vue.component('commit-item', {
	props: ['record'],
	template: `
		<a :href="record.html_url" class="list-group-item list-group-item-action flex-column align-items-start">
			<div class="d-flex w-100 justify-content-between">
	      <h5 class="mb-1">{{ record.commit.message }}</h5>
	      <small>{{ record.commit.author.date | formatDate }}</small>
    	</div>
			<p class="mb-1">by <a :href="record.committer.html_url">{{ record.commit.author.name }}</a></p>
    	<small>{{ record.sha.slice(0, 7) }}</small>
		</a>
	`, filters: {
		formatDate: function (v) {
			return moment(v).fromNow()
		}
	}
})

const app = new Vue({
	el: '#app',
	data: {
		loading: true,
		error: false,
		commits: [],
		amount: 6
	},
	created() {
		console.log('app element created')
		this.fetchData()
	},
	watch: {
		amount: 'fetchData'
	},
	methods: {
		fetchData: function () {
			this.loading = true
			this.error = false
			axios.get(URL + this.amount + '&sha=').then(response => {
				console.log(response)
				this.loading = false
				if (response.status === 200) { this.commits = response.data }
					else {
						this.error = response.statusText
						setTimeout(this.fetchData, 10*1000)
					}
			})
		}
	}
})
