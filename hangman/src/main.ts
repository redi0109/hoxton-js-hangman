import './style.css'

type Words = string[]


type State = {
  word: string,
  characters: string[],
  maxMistakes: number,
  streak: number
}

let words: Words = ['apple', 'banana', 'orange', 'pineapple', 'strawberry', 'watermelon'] 

let state: State = {
  word: 'apple',
  characters: [],
  maxMistakes: 6,
  streak: 0
}

function getRandomWord () {
  let randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

function restartGame () {
  state.word = getRandomWord()
  state.characters = []
  render()
}

function getMistakes(){
  let mistakes = state.characters.filter(char => !state.word.includes(char)) 
  return mistakes
}

function getMistakeCount(){
  let mistakes = getMistakes()
  return mistakes.length
}

function getCorrectGuesses () {
  return state.characters.filter(char => state.word.includes(char))
}



function ifUserWon(){
for (let char of state.characters) {
  if (!state.word.includes(char)) return false
}
return true
}

function ifUserLost(){
  return getMistakeCount() >= state.maxMistakes
}

function renderWord () {
  let wordEl = document.createElement('div')
  wordEl.className = 'word'

  let correctGuesses = getCorrectGuesses()

  for (let char of state.word) {
    let charEl = document.createElement('span')
    charEl.className = 'char'

    if (correctGuesses.includes(char)) {
      charEl.textContent = char
    } else {
      charEl.textContent = '_'
    }

    wordEl.append(charEl)
  }

  return wordEl
}

function renderMistakes () {
  let mistakesSpan = document.createElement('div')
  mistakesSpan.className = 'mistakes'
  mistakesSpan.textContent = `Mistakes: ${getMistakes()} (${getMistakeCount()})`

  if (getMistakeCount() === state.maxMistakes - 1)
    mistakesSpan.classList.add('almost-lost')

  return mistakesSpan
}

function renderWinningMessage () {
  let winMessageDiv = document.createElement('div')

  let winMessageP = document.createElement('p')
  winMessageP.textContent = 'You win! 🎉'

  let restartButton = document.createElement('button')
  restartButton.textContent = 'RESTART'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', function () {
    state.streak++
    restartGame()
  })

  winMessageDiv.append(winMessageP, restartButton)

  return winMessageDiv
}

function renderLosingMessage () {
  let lostMessageDiv = document.createElement('div')

  let lostMessageP = document.createElement('p')
  lostMessageP.textContent = `You lose! 🤕 The word was: ${state.word}`

  let restartButton = document.createElement('button')
  restartButton.textContent = 'RESTART'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', function () {
    state.streak = 0
    restartGame()
  })

  lostMessageDiv.append(lostMessageP, restartButton)

  return lostMessageDiv
}

function renderStreak () {
  let streakDiv = document.createElement('div')
  streakDiv.className = 'streak'
  streakDiv.textContent = `Streak: ${state.streak}`
  return streakDiv
}

function render(){
let appEl = document.querySelector('#app')
if (appEl === null) return

appEl.textContent = ''

let wordEl = renderWord()
  let mistakesSpan = renderMistakes()
  let streakEl = renderStreak()

  appEl.append(wordEl, mistakesSpan, streakEl)

  if (ifUserWon()) {
    let winningMessageDiv = renderWinningMessage()
    appEl.append(winningMessageDiv)
  }

  if (ifUserLost()) {
    let losingMessageDiv = renderLosingMessage()
    appEl.append(losingMessageDiv)
  }
}

function getKeyPressesFromUser (){
  document.addEventListener('keyup', function(event) {
    let guess = event.key.toLowerCase()
    let letters = 'abcdefghijklmnopqrstuvwxyz'

    if (!letters.includes(guess)) return

    if (state.characters.includes(guess)) return

    if (ifUserLost()) return

    if (ifUserWon()) return
    if (state.characters.includes(event.key)) return
    state.characters.push(event.key)
       render()
  })
  }

getKeyPressesFromUser ()
render()
