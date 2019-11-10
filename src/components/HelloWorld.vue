<template>
	<v-container>

		<v-layout
			wrap
            class='py-5'
		>

        <v-select 
            class='pa-3'
            :items="langs"
            v-model='lang'
            label="Language"
        ></v-select>

        <v-select 
            class='pa-3'
            :items="strengths"
            v-model='strength'
            label="Strength"
        ></v-select>

        <v-select 
            class='pa-3'
            :items="types"
            v-model='type'
            label="Type"
        ></v-select>

		<v-container v-if='lang == "es"' fluid class='my-5'>
			<v-row class='word-container' v-for='(word,index) in filteredWords' :key='index' @click='getDetails(word)'>

				<v-col class='word' cols='3'>
					<h2>{{ word.word_string }}</h2>
                </v-col>

                <v-col cols='2'>
					<p>{{ word.pos }}</p>
				</v-col>

				<v-col class='translation' cols='3'>
					<p >{{ word.translation }}</p>
                </v-col>
                <v-col class='sentence' cols='3'>
					<p v-if='word.sentence'>"<em v-html='word.sentence'></em>"</p>
				</v-col>
			</v-row>
		</v-container>

        <v-container v-if='lang == "en"' fluid>
			<v-row class='word-container' v-for='(word,index) in filteredWords' :key='index'>

				<v-col class='word' cols='3'>
					<h2>{{ word.translation }} </h2>
                </v-col>

                <v-col cols='3'>
					<p>{{ word.pos }}</p>
				</v-col>

				<v-col class='translation' cols='6'>
					<h3>{{ word.word_string }}</h3>
				</v-col>
			</v-row>
		</v-container>

		</v-layout>
	</v-container>
</template>

<script>
import axios from 'axios'
// import { default as words } from '../words'

export default {
	name: 'Words',

	data: () => ({
        words: [],
        langs: ['en', 'es'],
        strengths: ['All', 'Weak', 'Strong'],
        types: ['All','Adjective', 'Noun', 'Verb', 'Proper noun', 'Pronoun', 'Adverb', 'Preposition', 'Determiner', 'Numeral', 'Interjection', 'Conjunction'],
        type: 'All',
        lang: 'es',
        strength: 'All'
	}),
	computed: {
		filteredWords() {
			let vm = this;
			if (!vm || !vm.words) return []
            return vm.words.filter(w => {
                let type = !vm.type || vm.type == 'All' || w.pos == vm.type;
                let strength;

                if (!vm.strength || vm.strength == 'All') {
                    strength = true
                }
                else if (vm.strength  == 'Strong') {
                    strength = w.strength >= 0.5
                } else {
                    strength = w.strength <= 0.5
                }

                return type && strength;
            })
        },
        parsedWords() {
            let vm = this;
            return Object.keys(vm.words)
        }
    },
    methods: {
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getDetails(word) {
            let url = `https://www.duolingo.com/api/1/dictionary_page?lexeme_id=${word.lexeme_id}&use_cache=false&_=1573392387059`;
            axios.get(url)
            .then(r => word.sentence = r.data.alternative_forms[0].example_sentence)
        }
    },
	mounted() {
        let vm = this;
        
        axios.get('http://localhost:5555/words')
            .then(res => {
                var words = res.data.vocab_overview

                axios.get('http://localhost:5555/translations')
                    .then(translation => {
                        vm.words = words.map(w => {
                            let t = translation.data[w.word_string]
                                || translation.data[w.normalized_string]
                                || translation.data[vm.capitalize(w.word_string)]
                                || translation.data[vm.capitalize(w.normalized_string)];
                            w.translation = t ? t.join(', ') : null
                            w.sentence = null
                            return w
                        }).filter(w => w.translation).sort((a,b) =>  a.last_practiced_ms > b.last_practiced_ms ? -1 : 1)
                    })
            })
	}
};
</script>

<style lang='scss' scoped>
.layout {
	max-width: 1000px;
	margin: 0 auto;

    .v-select__selections {
        width: 200px;
    }

	.tab, a {
		color : #78c800;
	}
	.word-container {
        transition: 0.3s ease;
        min-height: 100px;
        display:flex;
        align-items:center;
        border: 1px dashed #78c800;
        cursor: pointer;
        color: #555;

        p {
            margin: 0;
            display:inline-block;
        }

		.word h2 {
            margin: 0;
            display:inline-block;
			font-weight: 600;
            color: #78c800;
            text-align:left;
            padding-left: 30px;
		}

		&:hover {
            max-height: 500px;
            background:#78c800;
            color: #fff;

            p {
                color: #fff;
            }

			.word h2 {
				transform: scale(1.05);
				color: #fff;
				font-weight: 800;
			}

			.translation, .sentence {
				opacity: 1;
                transition: 0.3s ease;
			}
		}
	}


	.translation, .sentence {
        transition: 0.3s ease;
        opacity: 0;
		text-align:left;

        p {
            margin: 0;
            line-height: 24px;
            color:#fff;
            font-weight: 400;
            margin-left: 10px;
        }
        .highlighted {
            font-weight: 600!important;
        }
	}
}
</style>
