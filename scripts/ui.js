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

const inputCurWrap = document.createElement('div')
inputCurWrap.classList.add('lvl-wrapper')
inputCurWrap.innerHTML = 'Load Level'
const inputCurLvl = document.createElement('input')
inputCurLvl.setAttribute('type', 'range')
inputCurLvl.setAttribute('min', '0')
inputCurLvl.setAttribute('max', '22')
inputCurLvl.setAttribute('step', '1')
inputCurWrap.append(inputCurLvl)
mainMenuWrapper.append(inputCurWrap)
const curLvl = document.createElement('div')
curLvl.innerText = inputCurLvl.value
mainMenuWrapper.append(curLvl)
mainMenuWrapper.classList.add('text')

buttonStart.addEventListener('click', () => {
    mainMenu.classList.add('hidden')
})

const showMenu = () => {
    mainMenu.classList.remove('hidden')
}


export {uiWrapper, uiLives, uiCount, buttonStart, showMenu, inputCurLvl, curLvl}
