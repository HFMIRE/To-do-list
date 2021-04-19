const draggables = document.querySelectorAll('.draggable')
const cards = document.querySelectorAll('.card')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

cards.forEach(card => {
    card.addEventListener('dragover', e => {
        e.preventDefault()
        const draggable = document.querySelector('.dragging')
        card.appendChild(draggable)
    })
})

function getDragAfterElement(card, y) {
    const draggableElements = [...card.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y = box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
           return {offset: offset, element: child }
        } else {
                return closest
            }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


