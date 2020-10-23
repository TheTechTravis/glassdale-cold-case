import { getNotes, saveNote } from "./NoteDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    contentTarget.innerHTML = `
    <input type="date" id="note--entryDate">
    <input type="text" id="note--author" placeholder="Author's name here"></input>
    <input type="text" id="note--suspect" placeholder="Suspect's name here"></input>
    <textarea id="note--content" rows="4" cols="50" placeholder="Note content here"></textarea>
    <button id="saveNote"> Save Note </button>
    `
}

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        // Grab input values
        const entryDate = document.querySelector("#note--entryDate").value
        const author = document.querySelector("#note--author").value
        const suspect = document.querySelector("#note--suspect").value
        const content = document.querySelector("#note--content").value

        // Make a new object representation of a note
        const newNote = {
            entryDate,
            author,
            suspect,
            content
        }
        // console.log(newNote)

        // Change API state and application state
        // saveNote(newNote)
    }
})

export const NoteForm = () => {
    render()
}