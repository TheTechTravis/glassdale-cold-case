import { useOfficers, getOfficers } from "./OfficerDataProvider.js"

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

export const OfficerSelect = () => {
    // Get all convictions from application state
    getOfficers()
        .then(() => {
            const officers = useOfficers()
            render(officers)
        })
}

const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an arresting officer...</option>
            ${officersCollection.map(
        officerObj => {
            return `<option value="${officerObj.name}"> ${officerObj.name} </option>`
        }
    ).join("")
        }
        </select>
    `
}

// Add eventListener that listens for any changeEvents made to the <select>
eventHub.addEventListener("change", changeEvent => {

    // Only dispatchEvent if the eventListener detects change specifically on the <select> dropdown
    if (changeEvent.target.id === "officerSelect") {

        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Create a custom event to be broadcast when a change has been made.
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        console.log(selectedOfficer);

        eventHub.dispatchEvent(customEvent)
    }
})