
const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    contentTarget.innerHTML = `
    <input type="date" id="note__entryDate">
    <input type="text" id="note__author" placeholder="Author's name here"></input>
    <input type="text" id="note__suspect" placeholder="Suspect's name here"></input>
    <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Note content here"></textarea>
    <button id="saveNote"> Save Note </button>
    `
}

export const NoteForm = () => {
    render()
}