export default function ({
    root,
    bgLinearGradient,
    bgTop,
    bgBottom,
    displayAreas,
    displayAreasStyle,
    mainPage,
    settingsPage,
    bgImage,
    body,
}) {
    ///////// LINEAR GRADIENT & FONT COLOR
    function Color ({
        root,
        bgLinearGradient,
        bgTop,
        bgBottom,
        displayAreas
    }) {

        function getHueValue (colorPicker) {
            return colorPicker.querySelector('.hue').value
        }
        function getSaturationValue (colorPicker) {
            return colorPicker.querySelector('.saturation').value + '%'
        }
        function getLightnessValue (colorPicker) {
            return colorPicker.querySelector('.lightness').value + '%'
        }
        function getAlphaValue (colorPicker) {
            return colorPicker.querySelector('.alpha').value + '%'
        }
            
        
        
        
        function updateFontColor (colorPicker) {
            const hue = getHueValue (colorPicker)
            const saturation = getSaturationValue (colorPicker)
            const lightness = getLightnessValue (colorPicker)
        
            root.style.setProperty('--hue', String(hue))
            root.style.setProperty('--saturation', saturation)
            root.style.setProperty('--lightness', lightness)
        
            updateLightnessDisplay (colorPicker, hue, saturation)
            updateContrastedLightness (lightness)
        }
        function updateAreaColor (area, colorPicker) {
            const hue = getHueValue (colorPicker)
            const saturation = getSaturationValue (colorPicker)
            const lightness = getLightnessValue (colorPicker)
            const alpha = getAlphaValue (colorPicker)
            area.style.setProperty('--hue', String(hue))
            area.style.setProperty('--saturation', saturation)
            area.style.setProperty('--lightness', lightness)
            area.style.setProperty('--alpha', alpha)
                
            updateLightnessDisplay (colorPicker, hue, saturation)
        }
            
        function updateLightnessDisplay (colorPicker, hue, saturation) {
            let lightness = colorPicker.querySelector('.lightness')
            lightness.style.setProperty('--hue', hue)
            lightness.style.setProperty('--saturation', saturation)
        }
        function updateContrastedLightness (lightness) {
            lightness = Number(lightness.slice(0,-1))
            let contrastedLightness
        
            if (lightness <= 35 || lightness >= 65) {
                contrastedLightness = 100 - lightness
            } else if (lightness >= 50) {
                contrastedLightness = lightness - 30
            } else if (lightness < 50) {
                contrastedLightness = lightness + 30
            }
            contrastedLightness = contrastedLightness + '%'
        
            root.style.setProperty('--contrasted-lightness', contrastedLightness)
        }
        
        
        
        
        function updateBodyLinearGradient (colorPicker) {
            const area = getColorPickerCorrespondentArea(colorPicker)
            updateAreaColor(area, colorPicker)
        
            let color = getAreaColor(area)
            bgLinearGradient.style.setProperty(`--c-${area.classList[1]}`, color )
            updateDisplayAreasGradient()
        }
        function getColorPickerCorrespondentArea (input) {
            return displayAreas.querySelector(`.${input.classList[1]}`)
        }
        function getAreaColor (area) {
            return getComputedStyle(area).getPropertyValue('--color')
        }
        
        function updateDisplayAreasGradient () {
            updateTopAreaDisplay ()
            updateBottomAreaDisplay ()  
        }
        function updateTopAreaDisplay () {
            const topBg = getComputedStyle(bgTop).getPropertyValue('background')
            const topBgLinearGradient = getLinearGradientFromBackground (topBg)
            displayAreas.querySelector('.one').style.setProperty('background', topBgLinearGradient)
        }
        function updateBottomAreaDisplay () {
            const bottomBg = getComputedStyle(bgBottom).getPropertyValue('background')
            const bottomBgLinearGradient = getLinearGradientFromBackground (bottomBg)
            displayAreas.querySelector('.two').style.setProperty('background', bottomBgLinearGradient)
        }
        function getLinearGradientFromBackground (background) {
            background = background.split('(')
            let linearGradient
            let openBracketsCount = 0
        
            for (let slice of background) {
                if (slice.includes('linear-gradient')) {
                    linearGradient = 'linear-gradient('
                    ++openBracketsCount
                } else if (openBracketsCount == 3) {
                    slice = slice.split(')')
                    for (let count = 0; count < 2; count++) {
                        linearGradient = linearGradient + slice[count] +')'
                    }
                    return linearGradient
                } else if (linearGradient != undefined) {
                    linearGradient = linearGradient + slice +'('
                    ++openBracketsCount
                }
            }
            return false
        }
        
  
        
        
        function setDefaultLightMode () {
            setGlobalStyle ('240', '6%', '21%', '89%', 'var(--c-2nd)')
            updateDisplayAreasGradient ()
        }
        function setDefaultDarkMode () {
            setGlobalStyle ('240', '7%', '78%', '17%', 'hsl(240, 5%, 7%)')
            updateDisplayAreasGradient ()
        }
        function setGlobalStyle (hue, saturation, lightness, contrastedLightness, bgColor) {
            root.style.setProperty('--hue', hue)
            root.style.setProperty('--saturation', saturation)
            root.style.setProperty('--lightness', lightness)
            root.style.setProperty('--contrasted-lightness', contrastedLightness)
                
            bgLinearGradient.style.setProperty('--c-one', bgColor)
            bgLinearGradient.style.setProperty('--c-two', bgColor)
            bgLinearGradient.style.setProperty('--c-three', bgColor)
        }

        return {
            updateFontColor,
            updateBodyLinearGradient,
            setDefaultLightMode,
            setDefaultDarkMode,
            updateDisplayAreasGradient
        }
    }

    const color = Color({
        root,
        bgLinearGradient,
        bgTop,
        bgBottom,
        displayAreas
    })




    ///////// LINEARGRADIENT SECTIONS
    function LinearGradientSections ({
        displayAreas,
        displayAreasStyle,
        bgLinearGradient,
        updateDisplayAreasGradient
    }) {
        
        function increaseArea (area) {
            let fr = frIncreasedValue ( getAreaFrValue (area) )
            displayAreas.style.setProperty(`--${area.classList[1]}`, fr)
        }
        function getAreaFrValue (area) {
            return displayAreasStyle.getPropertyValue(`--${area.classList[1]}`)
        }
        function frIncreasedValue (fr) {
            let value = Number(fr.slice(0,-2))
            return `${value + (value * 0.1)}fr`
        }
        
        
        
        
        function updateBodyAreas () {
            const frs = displayAreasStyle.getPropertyValue('grid-template-rows')
        
            bgLinearGradient.style.setProperty('--fraction-one', getAreaPorcentageValue(frs, 'one'))
            bgLinearGradient.style.setProperty('--fraction-two', getAreaPorcentageValue(frs, 'two'))
            updateDisplayAreasGradient()
        }
        function getAreaPorcentageValue (frs, area) {
            frs = turnIntoNumericArray(frs)
            if (area == 'one') {
                return (frs[0] / (frs[0] + frs[1])) * 100 + '%'
            } else {
                return (frs[1] / (frs[0] + frs[1])) * 100 + '%'
            }
        }
        function turnIntoNumericArray (frs) {
            frs = frs.split(" ") 
            for (let index in frs) {
                frs[index] = Number(frs[index].slice(0,-2))
            }
            return frs
        }

        return {
            increaseArea,
            updateBodyAreas
        }
    }

    const linearGradientSections = LinearGradientSections({
        displayAreas,
        displayAreasStyle,
        bgLinearGradient,
        updateDisplayAreasGradient: color.updateDisplayAreasGradient
    })




    ///////// SETTINGS BUTTON
    function SettingsButton ({
        mainPage,
        settingsPage
    }) {

        function toggleSettings (settingsStyleButton) {
            settingsStyleButton.classList.toggle('on')
    
            if (settingsStyleButton.classList.contains('on')) {
                showStyleSettings()
            } else {
                hideStyleSettings()
            }
        }
        function showStyleSettings () {
            mainPage.classList.add('hide')
            settingsPage.style.setProperty('display', 'flex')
        }
        function hideStyleSettings () {
            mainPage.classList.remove('hide')
            settingsPage.style.setProperty('display', 'none')
        }

        return {
            toggleSettings
        }
    }

    const settingsButton = SettingsButton({
        mainPage,
        settingsPage
    })




    ///////// BACKGROUND IMAGE
    function BackgroundImage ({
        bgImage,
        body,
    }) {

        function toggleSettings () {
            bgImage.querySelector('fieldset').classList.toggle('hide')
            body.classList.toggle('bodyBgImage')
        }
    
    
        function toggleRepeat (repeatBgImage) {
            repeatBgImage.classList.toggle('on')
    
            if(repeatBgImage.classList.contains('on')) {
                body.style.setProperty('--repeat', 'repeat')
            }else {
                body.style.setProperty('--repeat', 'no-repeat')
            }
        }
    
        function updatePosition (input) {
            let position = input.value + '%'
            body.style.setProperty(`--${input.classList[0]}`, position)
        }
    
        function addImageSource () {
            const sourceInput = bgImage.querySelector('#imageSource')
            const source = sourceInput.value
            sourceInput.value = ''
            body.style.setProperty('--url', `url("${source}")`)
        }

        return {
            toggleSettings,
            toggleRepeat,
            updatePosition,
            addImageSource
        }
    }

    const backgroundImage = BackgroundImage({
        bgImage,
        body,
    })




    return {
        color,
        linearGradientSections,
        settingsButton,
        backgroundImage
    }
}