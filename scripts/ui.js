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

const buttonStart = document.createElement('button')
buttonStart.classList.add('btn','btn-start')
buttonStart.innerText = 'Играть'
mainMenuWrapper.append(buttonStart)

const buttonOptions = document.createElement('button')
buttonOptions.classList.add('btn','btn-options')
buttonOptions.innerText = 'Опции'
mainMenuWrapper.append(buttonOptions)


buttonStart.addEventListener('click', () => {
    mainMenu.classList.add('hidden')
})

const showMenu = (cb) => {
    mainMenu.classList.remove('hidden')
    cb()
}


export {uiWrapper, uiLives, uiCount, buttonStart, showMenu}
