import { 
    timerElement, 
    soundControls, 
    settingsStyleButton,
    colorElements, 
    styleControlVariables,
    bgImageElements } from './elements.js'
import Timer from './timer.js'
import Style from './style.js'
import Events from './events.js'
import ResponsiveDisplay from './responsivedisplay.js'

const {
    minutesDisplay,
    secondsDisplay
} = timerElement


const timer = Timer({
    minutesDisplay,
    secondsDisplay
})

const style = Style(styleControlVariables)

Events({
    timerElement,
    timer,
    soundControls, 
    settingsStyleButton,
    colorElements,
    bgImageElements,
    style
})


ResponsiveDisplay()