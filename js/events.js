export default function Events ({
    timerElement,
    timer,
    soundControls, 
    settingsStyleButton,
    colorElements,
    bgImageElements,
    style
}) {

    function timerEvents () {

        const {
            buttonPlay,
            buttonStop,
            buttonPlus,
            buttonMinus
        } = timerElement

        buttonPlay.addEventListener('click', function() {
            if (buttonPlay.classList.contains('on')) {
                return
            }

            buttonPlay.classList.add('on')
            timer.countdown()
        })

        buttonStop.addEventListener('click', function() {
            buttonPlay.classList.remove('on')
            timer.stop()
        })

        buttonPlus.addEventListener('click', function() {
            timer.increaseMinutes()
        })

        buttonMinus.addEventListener('click', function() {
            timer.decreaseMinutes()
        })
    }

    timerEvents()



    function soundEvents () {

        const soundButtons = soundControls.querySelectorAll('button')
        const volumeInputs = soundControls.querySelectorAll('input')
        
        volumeInputs.forEach(updateVolume)
        soundButtons.forEach(onClickToggleSound)
        volumeInputs.forEach(onInputUpdateVolume)
        
        function onClickToggleSound (button) {
            button.addEventListener('click', function() {
                let audio = button.querySelector('audio')
                let input = button.querySelector('input')
                
                button.classList.toggle('on')
              
                if ( button.classList.contains('on') ) {
                    audio.play()
                    input.classList.remove('hide')
                } else {
                    audio.pause()
                    input.classList.add('hide')
                }
            })
        }
        
        function onInputUpdateVolume (input) {
            input.addEventListener('input', function() {
                updateVolume(input)
            })
        }
        
        function updateVolume (input) {
            const audio = input.parentElement.querySelector('audio')
            audio.volume = Number(input.value / 100)
            
            input.style.setProperty('--progress', `${input.value}%`)
        }
    }

    soundEvents()
    


    settingsStyleButton.addEventListener('click', function() {
        style.settingsButton.toggleSettings(settingsStyleButton)
    })




    function ColorEvents () {
        
        const {
            fontColorPicker,
            linearGradient,
            darkModeButton,
            lightModeButton
        } = colorElements
              
        
        const linearGradientColorPickers = linearGradient.querySelectorAll('.colorPicker')



        darkModeButton.addEventListener('click', function() {
            style.color.setDefaultDarkMode()
        }) 
        lightModeButton.addEventListener('click', function() {
            style.color.setDefaultLightMode()
        })



        fontColorPicker.addEventListener('input', function() {
            style.color.updateFontColor(fontColorPicker)
        })


         
        linearGradientColorPickers.forEach(onInputUpdateLinearGradient)

        function onInputUpdateLinearGradient (colorPicker) {
            colorPicker.addEventListener('input', function() {
                style.color.updateBodyLinearGradient(colorPicker)
            })
        } 

    }
    
    ColorEvents()




    function linearGradientSections () {

        const {
            linearGradient
        } = colorElements


        const linearGradientAreas = linearGradient.querySelectorAll('.area')

        linearGradientAreas.forEach(onClickIncreaseGradientArea)

        function onClickIncreaseGradientArea (area) {
            area.addEventListener('click', function() {
                style.linearGradientSections.increaseArea (area)
                style.linearGradientSections.updateBodyAreas()
            })
        }

    }

    linearGradientSections ()




    function BgImageEvents () {
        
        const {
            addBgImage,
            repeatBgImage,
            buttonBgImage,
            directionsBgImage
        } = bgImageElements
        
        
        addBgImage.addEventListener('change', function() {
            style.backgroundImage.toggleSettings()
        })

        buttonBgImage.addEventListener('click', function() {
            style.backgroundImage.addImageSource()
        })
        
        repeatBgImage.addEventListener('change', function() {
            style.backgroundImage.toggleRepeat(repeatBgImage)
        })
    

        directionsBgImage.forEach(onInputUpdadeBgImagePosition)

        function onInputUpdadeBgImagePosition (input) {
            input.addEventListener('input', () => {
                style.backgroundImage.updatePosition (input)
            })        
        }
        
    }

    BgImageEvents ()
}
