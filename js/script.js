const grids = document.querySelectorAll('.grid')
const headings = document.querySelectorAll('.heading .wrapper .text')

function enterScreen(index) {
    const grid = grids[index]
    const heading = headings[index]
    const gridColumns = grid.querySelectorAll('.column')

    grid.classList.add('active')

    changeColumnClasses(gridColumns, 'initial', 'fadeIn')

    heading.classList.remove('initial')
    heading.classList.add('fadeIn')
}

function changeColumnClasses(gridColumns, remove, add) {
    gridColumns.forEach(element => {
        element.classList.remove(remove)
        element.classList.add(add)
    })
}

function exitScreen(index, exitDelay) {
    const grid = grids[index]
    const heading = headings[index]
    const gridColumns = grid.querySelectorAll('.column')

    changeColumnClasses(gridColumns, 'fadeIn', 'fadeOut')

    heading.classList.remove('fadeIn')
    heading.classList.add('fadeOut')

    setTimeout(() => {
        grid.classList.remove('active')
        heading.classList.remove('fadeOut')
        heading.classList.add('initial')
        changeColumnClasses(gridColumns, 'fadeOut', 'initial')

    }, exitDelay)
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
    const cycleTime = timePerScreen + exitDelay
    let nextIndex = 0

    
    function nextCycle() {
        const currentIndex = nextIndex

        enterScreen(currentIndex)

        setTimeout(() => {
            exitScreen(currentIndex, exitDelay)
        }, timePerScreen);

        nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1 
    }

    nextCycle()

    setInterval(nextCycle, cycleTime);
}

setupAnimationCycle( {
    timePerScreen: 5000,
    exitDelay: 200 * 7
})