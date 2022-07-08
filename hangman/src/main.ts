import './style.css'

type Words = string[]


type State = {
  word: string,
  characters: string[],
  maxMistakes: number,
  // guessed: boolean
}

let words: Words = ['apple', 'banana', 'orange', 'pineapple', 'strawberry', 'watermelon'] 

let state: State = {
  word: 'apple',
  characters: [],
  maxMistakes: 6,
  // guessed: false
}

function getMistakes(){
  let mistakes = state.characters.filter(char => !state.word.includes(char)) 
  return mistakes
}

function getMistakeCount(){
  let mistakes = getMistakes()
  return mistakes.length
}

function ifUserWon(){
  if (getMistakeCount() === 0) {
    alert('You won!')
  }
}

function ifUserLost(){
  if (getMistakeCount() === state.maxMistakes) {
    alert('You lost!')
  }
}   



function render(){
let appEl = document.querySelector('#app')
if (appEl === null) return

appEl.textContent = ''

let mistakesSpan = document.createElement('span')
mistakesSpan.textContent = `Mistakes: ${getMistakes()} ${getMistakeCount()}`
appEl.append(mistakesSpan)
}

function getKeyPressesFromUser (){
  document.addEventListener('keyup', function(event) {

    let letters = 'abcdefghijklmnopqrstuvwxyz'
    if (!letters.includes(event.key)) return

    //no repeated charcters
    if (state.characters.includes(event.key)) return
    state.characters.push(event.key)
       render()
  })
  }

getKeyPressesFromUser ()
render()

window.state = state
window.getMistakes = getMistakes
window.getMistakeCount = getMistakeCount