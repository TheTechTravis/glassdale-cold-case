import { getNotes, useNotes } from "./NoteDataProvider.js"
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
        </section>
        `
    }).join("")
}



// THE TWO FUNCTIONS BELOW ARE MY ORIGINAL FUNCTIONS
/* export const NoteList = () => {

    getNotes()
        .then(() => {
            const notesArray = useNotes()

            // console.log(notesArray) // This logs the array of notes. Next step is to render them to DOM.
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
} */