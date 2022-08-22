const minutesDisplay = document.querySelector('#timer #time #minutes')
const secondsDisplay = document.querySelector('#timer #time #seconds')

const buttonPlay = document.querySelector('#timer #controls #play')
const buttonStop = document.querySelector('#timer #controls #stop')
const buttonPlus = document.querySelector('#timer #controls #plus')
const buttonMinus = document.querySelector('#timer #controls #minus')

const timerElement = {
    minutesDisplay,
    secondsDisplay,
    buttonPlay,
    buttonStop,
    buttonPlus,
    buttonMinus
}





const soundControls = document.querySelector('#soundControls')





const settingsStyleButton = document.querySelector('nav #settingsStyleButton')





const fontColorPicker = document.querySelector('#style #fontColorPicker')
const linearGradient = document.querySelector('#style #linearGradient')
const darkModeButton = document.querySelector('#style #dark')
const lightModeButton = document.querySelector('#style #light')

const colorElements = {
    fontColorPicker,
    linearGradient,
    darkModeButton,
    lightModeButton
}





const root = document.querySelector(':root')
const bgLinearGradient = document.querySelector('#bgLinearGradient')
const bgTop = bgLinearGradient.querySelector('#bgTop')
const bgBottom = bgLinearGradient.querySelector('#bgBottom')
const displayAreas = document.querySelector('#style #areas')
const displayAreasStyle = getComputedStyle(displayAreas)

const mainPage = document.querySelector('main')
const settingsPage = document.querySelector('#style')

const bgImage = document.querySelector(`#style #bgImage`)
const body = document.body
const styleControlVariables = {
    root,
    bgLinearGradient,
    bgTop,
    bgBottom,
    displayAreas,
    displayAreasStyle,

    mainPage,
    settingsPage,

    bgImage,
    body
}





const addBgImage = bgImage.querySelector('#addBgImage')
const repeatBgImage = bgImage.querySelector('#repeatBgImage')
const buttonBgImage = bgImage.querySelector('input[type = "button"]')
const directionsBgImage = bgImage.querySelectorAll('input[type = range] ')

const bgImageElements = {
    addBgImage,
    repeatBgImage,
    buttonBgImage,
    directionsBgImage
}





export { 
    timerElement, 
    soundControls, 
    settingsStyleButton,
    colorElements, 
    styleControlVariables,
    bgImageElements
}