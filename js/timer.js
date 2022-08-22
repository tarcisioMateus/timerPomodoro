export default function Timer ({
    minutesDisplay,
    secondsDisplay
}) {
    let minutes = Number(minutesDisplay.textContent)
    let idTimeout

    function updateDisplay (newMinutes, seconds) {
        newMinutes = newMinutes === undefined ? minutes : newMinutes
        seconds = seconds === undefined ? 0 : seconds
        minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
        secondsDisplay.textContent = String(seconds).padStart(2, '0')
    }

    function countdown () {
        idTimeout = setTimeout(function() {
            let minutes = Number(minutesDisplay.textContent)
            let seconds = Number(secondsDisplay.textContent)
            let isFinished = ( minutes <= 0 && seconds <= 0 )

            if (isFinished) {
                resetDisplay()
                return
            }

            if (seconds <= 0) {
                seconds = 60
                --minutes
            }

            --seconds

            updateDisplay(minutes, seconds)
            countdown()
        }, 1000)
    }

    function stop () {
        clearTimeout(idTimeout)
        resetDisplay()
    }

    function resetDisplay () {
        updateDisplay(minutes, 0)
    }
    
    function increaseMinutes () {
        let currentMinutes = Number(minutesDisplay.textContent)
        currentMinutes = currentMinutes + 5

        minutesDisplay.textContent = String(currentMinutes).padStart(2, '0')
        minutes = currentMinutes
    }

    function decreaseMinutes () {
        let currentMinutes = Number(minutesDisplay.textContent)
        currentMinutes = currentMinutes - 5

        currentMinutes = currentMinutes <= 0 ? 0 : currentMinutes

        minutesDisplay.textContent = String(currentMinutes).padStart(2, '0')
        minutes = currentMinutes
    }


    return {
        countdown,
        stop,
        increaseMinutes,
        decreaseMinutes
    }
}