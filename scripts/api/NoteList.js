import { getNotes, useNotes } from "./NoteDataProvider.js"
import { Note } from "./Note.js"

const eventHub = document.querySelector(".container")
const notesContainer = document.querySelector(".notesContainer")

export const NoteList = () => {

    getNotes()
        .then(() => {
            const notesArray = useNotes()

            console.log(notesArray) // This logs the array of notes. Next step is to render them to DOM.
            render(notesArray)
        })
}

const render = (notesArray) => {
    let notesHTMLRepresentations = ""

    for (const note of notesArray) {

        notesHTMLRepresentations += Note(note)

        notesContainer.innerHTML = `
                ${notesHTMLRepresentations}
                `
    }
}

// eventHub.addEventListener("click", clickEvent => {

// })