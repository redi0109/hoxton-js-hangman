import './style.css'

let state = {
word: '',
characteres: [],
maxAttemps: 6,
}

function getMistakeCount(){
  state.characteres.filter(char => !state.word.includes(char)).length //includes metode per te gjetur nese nje karakter i perket fjales
}



function render(){

}