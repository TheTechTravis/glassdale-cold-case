import { useCriminals } from "../criminals/CriminalDataProvider.js"
import { witnessList } from "../witnesses/WitnessList.js"
import { saveNote } from "./NoteDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

// MAIN COMPONENT
export const NoteForm = () => {
    const arrayOfCriminals = useCriminals()
    render(arrayOfCriminals)
}

// COMPONENTS THAT ARE USED IN MAIN COMPONENT
const render = (arrayOfCriminals) => {
    // DEFINE SHIT
    const criminalsForDropdown = arrayOfCriminals.map((criminalObj) => {
        return `
            <option value="${criminalObj.id}"> ${criminalObj.name} </option>`

    }).join("")

    contentTarget.innerHTML = `
    <input type="date" id="note--entryDate">
    <input type="text" id="note--author" placeholder="Author's name here"></input> 
        <select class="dropdown" id="criminal--select">
            <option value="0">Please select a criminal...</option>`
        + `${criminalsForDropdown}` +
        `</select>

        <textarea id="note--content" rows="4" cols="50" placeholder="Note content here"></textarea>
        <button id="saveNote"> Save Note </button>
        <button id="witness__statements"> Witness Statements </button>
        `
}

/* 
                        EVENTS START HERE
 */

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        // Grab input values
        const entryDate = document.querySelector("#note--entryDate").value
        const author = document.querySelector("#note--author").value
        // The "+" in front of the querySelector is shorthand for parseInt() method.
        const criminalId = +document.querySelector("#criminal--select").value
        const content = document.querySelector("#note--content").value

        // Make a new object representation of a note
        const newNote = {
            entryDate,
            author,
            criminalId,
            content
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "witness__statements") {
        witnessList()
        const headerReplacement = document.getElementsByClassName("criminalHeading")
        headerReplacement.innerText = "Witness Statements"
    }
})