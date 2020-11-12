/*
*   ConvictionSelect component that renders a select HTML element
*   which lists all convictions in the Glassdale PD API
*/
import { useConvictions, getConvictions } from "./ConvictionDataProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")

// Identify the eventHub
const eventHub = document.querySelector(".container")

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions()
        .then(() => {
            const convictions = useConvictions()
            render(convictions)
        })
}

const render = convictionsCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${convictionsCollection.map(
        convictionObj => {
            return `<option value="${convictionObj.id}"> ${convictionObj.name} </option>`
        }
    ).join("")
        }
        </select>
    `
}

// Add eventListener that listens for any changeEvents made to the <select>
eventHub.addEventListener("change", changeEvent => {

    // Only dispatchEvent if the eventListener detects change specifically on the <select> dropdown
    if (changeEvent.target.id === "crimeSelect") {

        // Create a custom event to be broadcast when a change has been made.
        const customEvent = new CustomEvent("crimeSelected", {
            detail: {
                crimeThatWasChosen: changeEvent.target.value
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})