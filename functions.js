let pwdSubmit = document.querySelector('.password-form button');
let veil = document.querySelector('.password-form');
let pwd;
let hangmanCount = 1;
let guessed = 0;


const keyboardField = document.querySelector('.keyboard-wrapper');
const outputElement = document.querySelector('.output-wrapper');
const imageElement = document.querySelector('.image-wrapper');
const inputField = document.querySelector('.password-form input');
const outcomeElement = document.querySelector('.outcome-wrapper');
const popupInfo = document.querySelector('.popup-info');
const wrongAnswer = document.querySelector('.wrong-answers');


// submit password ------------------------------------------
pwdSubmit.addEventListener('click', () => {
  if (!checkValidity()) {
    showPopupInfo()
    return
  }
  pwd = inputField.value.toLowerCase()
  outputElement.textContent = "_".repeat(pwd.length);

  veil.style['opacity'] = 0;
  // setTimeout(() => {  veil.remove() }, 500);
  setTimeout(() => {  veil.style.display = 'none' }, 500);
})
// -----------------------------------------------------------


// create keyboard with eventListeners------------------------
const allChars = Array(26).fill(97).map((x, y) => String.fromCharCode(x + y));
console.log(allChars);
allChars.forEach((item, i) => {
  let keyboardLetter = document.createElement('div');
  keyboardLetter.innerText = item;
  keyboardLetter.value = item;
  keyboardField.appendChild(keyboardLetter);

  keyboardLetter.addEventListener('click', () => {
    checkCharacter(item)
  })
});
// -----------------------------------------------------------

// check user input ------------------------------------------
function checkCharacter(char) {
  let found = false
  let outputArr = outputElement.innerText.split("");
  for(let i = 0; i < pwd.length; i++) {
    if (char == pwd[i] && outputElement.innerText[i] == "_") {
      outputArr[i] = char
      guessed++;
      found = true
    }
  }
  outputElement.innerText = outputArr.join("")
  allChars.splice(allChars.indexOf(char), 1)

  if (found) {
    disableButton(char, true);
    if (guessed == pwd.length) {
      endInfo();
      disableButtons()
    }
    return
  }
  disableButton(char, false);

  hangmanCount ++;
  if (hangmanCount == 8) {
      imageElement.style['background-image'] = `url("images2/hangman${hangmanCount}.bmp")`
      createSolutionOption()
      endInfo()
      disableButtons()
      return
  } else if (hangmanCount > 8) {
    return
  }

  imageElement.style['background-image'] = `url("images2/hangman${hangmanCount}.bmp")`
}
// -----------------------------------------------------------

// check starting password  ----------------------------------
function checkValidity() {
  const re = /^[a-zA-Z]{2,}$/
  if(re.exec(inputField.value) === null) {
    return false
  }
  return true
}
// -----------------------------------------------------------

// display info at the end -----------------------------------
function endInfo() {
  outcomeElement.style.display = "flex"
  outcomeElement.style['z-index'] = 2
  setTimeout(()=>{
    outcomeElement.style.opacity = "1"
  },10)

  if (hangmanCount >= 8) {
    outcomeElement.querySelector('span').textContent = "Game over"
  } else {
    outcomeElement.querySelector('span').textContent = "You won!"
  }
}
// -----------------------------------------------------------

// disable buttons ------- -----------------------------------
function disableButtons() {
  const buttons = document.querySelectorAll('.keyboard-wrapper div')
  buttons.forEach((button)=>{
    let newBtn = button.cloneNode(true)
      button.parentNode.replaceChild(newBtn, button);
  })
}
// -----------------------------------------------------------

// show popupInfo ------- -----------------------------------
function showPopupInfo() {
  popupInfo.style.opacity = "1"
  setTimeout(()=>{
    popupInfo.style.opacity = "0"
  },2000)
}
// -----------------------------------------------------------

// show solution listener ------------------------------------
function createSolutionOption() {
  let newEl = document.createElement('div')
  newEl.textContent = "Show solution"
  outcomeElement.appendChild(newEl)

  newEl.addEventListener('click', ()=>{
    outputElement.textContent = pwd
  })
}
// -----------------------------------------------------------

// key listener ----------------------------------------------
document.addEventListener('keyup', (e)=>{
  if(veil.style.display != 'none') {
    if(e.key == "Enter") {
      pwdSubmit.click()
    }
  } else {
    if (allChars.includes(e.key) && outcomeElement.style["display"] != 'flex') {
      console.log(allChars.includes(e.key), e.key);
      checkCharacter(e.key)
    }
  }
})
// -----------------------------------------------------------

function disableButton(char, isGuessed) {
  for(let i = 0; i < keyboardField.childElementCount; i++) {
    if (keyboardField.children[i].textContent === char) {
      let newEl = document.createElement('div')
      newEl.textContent = char
      if(isGuessed) newEl.style["background-color"] = "grey"
      else newEl.style["background-color"] = "grey"
      keyboardField.children[i].replaceWith(newEl)
    }
  }
}
