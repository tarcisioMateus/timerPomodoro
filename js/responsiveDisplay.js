export default function responsiveDisplay() {

    const svgS =document.querySelectorAll('main svg')

    svgS.forEach(setResponsiveSvgSize)
    
    window.addEventListener('resize', function() {
        svgS.forEach(function(svg) {
            setSvgIdealWidth(svg)
            updateSvgWidth(svg)
        })
    })



    function setResponsiveSvgSize (svg) {
        setSvgOriginalWidth(svg)
        setSvgIdealWidth(svg)
        updateSvgWidth(svg)
    }

    function setSvgOriginalWidth (svg) {
        svg.style.setProperty('--original-width', `${svg.viewBox['baseVal']['width']}px`)
    }
    function setSvgIdealWidth (svg) {
        const originalWidth = Number( getComputedStyle(svg).getPropertyValue('--original-width').slice(0,-2) )
        const idealWidth = ((originalWidth / getCurrentLimit()) * 100) + 'vw'
        svg.style.setProperty('--ideal-width', idealWidth)
    }
    function updateSvgWidth (svg) {
        const clampWidth = getComputedStyle(svg).getPropertyValue('--clamp-width')
        svg.style.setProperty('width', clampWidth)
    }

    
    function getCurrentLimit () {
        if (getCurrentMideaQueryTreshold() == 700){
            return 500
        }
        return 1000
    }
    function getCurrentMideaQueryTreshold () {
        if (window.matchMedia('(max-width: 700px)').matches) {
            return 700
        } 
        return 1280
    }
}