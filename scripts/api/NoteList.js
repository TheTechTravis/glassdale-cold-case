import { getNotes, useNotes, deleteNote } from "./NoteDataProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"
import { Note } from "./Note.js"

const eventHub = document.querySelector(".container")
const notesContainer = document.querySelector(".notesContainer")

eventHub.addEventListener("noteStateChanged", event => {
    NoteList()
})


// THE TWO FUNCTIONS BELOW WERE YANKED/COPIED FROM THE COURSE MATERIAL.
export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const notes = useNotes()
            const criminals = useCriminals()

            render(notes, criminals)
        })
}

const render = (noteCollection, criminalCollection) => {
    notesContainer.innerHTML = noteCollection.map(noteObj => {
        // Find the related criminal
        const relatedCriminal = criminalCollection.find(criminal => criminal.id === noteObj.criminalId)
        return `
        <section class="note">
        <h2>Note about ${relatedCriminal.name}</h2>
        <p class="note__entryDate"> Entry Date: ${noteObj.entryDate} </p>
        <p class="note__author"> Author: ${noteObj.author} </p>
        <p class="note__suspect"> Suspect: ${relatedCriminal.name} </p>
        <p class="note__content"> Content: ${noteObj.content} </p>
        <button id="deleteNote--${noteObj.id}">Delete</button>
        </section>
        `
    }).join("")
}

// EVENTS START HERE
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
        deleteNote(id).then(
            () => {
                const updatedNotes = useNotes()
                const criminals = useCriminals()
                render(updatedNotes, criminals)
            }
        )
    }
})