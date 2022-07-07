import './style.css'

type Words = string[]


type State = {
  word: string,
  characters: string[],
  mistakeCount: number
}

let words: Words = ['apple', 'banana', 'orange', 'pineapple', 'strawberry', 'watermelon'] 

let state: State = {
  word: '',
  characters: [],
  mistakeCount: 0
}

function getMistakeCount(){
  let mistakeCount = state.characteres.filter(char => !state.word.includes(char)) //includes metode per te gjetur nese nje karakter i perket fjales
  return mistakeCount
}



function render(){

}