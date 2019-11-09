<template>
	<v-container>
		<v-tabs color='#78c800'>
			<v-tab @click='pos = "Adjective"'><a>Adjective</a></v-tab>
			<v-tab @click='pos = "Noun"'><a>Noun</a></v-tab>
			<v-tab @click='pos = "Verb"'><a>Verb</a></v-tab>
			<v-tab @click='pos = "Proper noun"'><a>Proper noun</a></v-tab>
			<v-tab @click='pos = "Pronoun"'><a>Pronoun</a></v-tab>
			<v-tab @click='pos = "Adverb"'><a>Adverb</a></v-tab>
			<v-tab @click='pos = "Preposition"'><a>Preposition</a></v-tab>
			<v-tab @click='pos = "Determiner"'><a>Determiner</a></v-tab>
			<v-tab @click='pos = "Numeral"'><a>Numeral</a></v-tab>
			<v-tab @click='pos = "Interjection"'><a>Interjection</a></v-tab>
			<v-tab @click='pos = "Conjunction"'><a>Conjunction</a></v-tab>
		</v-tabs>
		<v-layout
			text-center
			wrap
		>
		<v-container fluid>
			<v-row class='word-container' v-for='(word,index) in filteredWords' :key='index'>
				<v-col class='word' cols='6'  
					@click='search(index)'>
					<h3>{{ word.normalized_string }} </h3>
					<p>{{ word.pos }}</p>
				</v-col>
				<v-col v-if='word.translation' class='translation' cols='6'>
					<h3>{{ word.translation }}</h3>
				</v-col>
			</v-row>
		</v-container>

		</v-layout>
	</v-container>
</template>

<script>
import axios from 'axios'
import { default as words } from '../words'

export default {
	name: 'HelloWorld',

	data: () => ({
		pos: null,
		words: words.vocab_overview.map(w => {
			w.translation = null;
			return w
		}).sort((a, b) => a.strength - b.strength)
	}),
	computed: {
		filteredWords() {
			let vm = this;
			if (!vm || !vm.words) return []
			return vm.words.filter(w => !vm.pos || w.pos == vm.pos)
		}
	},
	methods: {
		search (index) {
			let vm = this;

			var data = `source=es&q=${encodeURI(vm.filteredWords[index].normalized_string)}&target=en`;

			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === this.DONE) {
					console.log(vm.filteredWords[index])
					vm.filteredWords[index].translation = JSON.parse(this.responseText).data.translations[0].translatedText;
					console.log(vm.filteredWords[index])
				}
			});

			xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
			xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
			xhr.setRequestHeader("x-rapidapi-key", "b82a516a4bmshd9e853bb88fc02bp1f25a5jsn6a067c1ea61d");
			xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

			xhr.send(data);
		}
	},
	mounted: () => {
		let vm = this;
	}
};
</script>

<style lang='scss' scoped>
.layout {
	max-width: 600px;
	margin: 0 auto;

	.tab, a {
		color : #78c800;
	}
	.word-container {
		height: 60px;
		margin: 10px;

		.word {
			cursor: pointer;
			font-weight: 400;
			transition: 0.3s ease;
			display:flex;
			justify-content:space-between;
			align-items: center;
			padding: 15px;

			h3,p {
				display:inline-block;
				margin: 0;
			}

			p {
				color: #78c800;
			}
		}

		&:hover {
			.word {
				transform: scale(1.05);
				color: #78c800;
				font-weight: 800;
			}

			.translation {
				display:block;
			}
		}
	}

	.translation {
		display: none;
		text-align:center;

		h3 {
			padding: 10px 20px;
			color: #fff;
			background: #78c800;
			text-align:center;
			border-radius: 15px;
			border: 2px solid #fff;
			display:inline-block;
		}
	}
}
</style>
