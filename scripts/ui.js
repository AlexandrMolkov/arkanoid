"use strict"

const uiWrapper = document.querySelector('#statsPanel')
const uiLives = document.createElement('div')
const uiCount = document.createElement('div')
uiCount.innerText = '0' 
uiWrapper.append(uiLives)
uiWrapper.append(uiCount)

const mainMenu = document.querySelector('#menu')
mainMenu.classList.add('main-menu')
const mainMenuWrapper = document.createElement('div')
mainMenuWrapper.classList.add('main-menu-wrapper')
mainMenu.append(mainMenuWrapper)

const sfx = document.querySelector('#sfx')
const sfxvol = document.querySelector('#sfxvol')
/////////////////////   buttonStart

const buttonStart = document.createElement('button')
buttonStart.classList.add('btn','btn-start')
buttonStart.innerText = 'Играть'
mainMenuWrapper.append(buttonStart)

buttonStart.addEventListener('click', () => {
    mainMenu.classList.add('hidden')
})

/////////////////////   buttonOptions
const buttonOptions = document.createElement('button')
buttonOptions.classList.add('btn','btn-options')
buttonOptions.innerText = 'Опции'
mainMenuWrapper.append(buttonOptions)

buttonOptions.addEventListener('click', () => {
    options.classList.remove('hidden')
})


const options = document.querySelector('.options')

/////////////////////   optionsok
const optionsok = options.querySelector('#optionsok')
optionsok.addEventListener('click', () => {
    options.classList.add('hidden')
})


const showMenu = () => {
    mainMenu.classList.remove('hidden')
}

const curLvl = document.querySelector('#curlvl')

const inputCurLvl = document.querySelector('#level')

export {uiWrapper, uiLives, uiCount, buttonStart, showMenu, inputCurLvl, curLvl, sfx, sfxvol}
