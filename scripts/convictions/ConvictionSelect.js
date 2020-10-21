/*
*   ConvictionSelect component that renders a select HTML element
*   which lists all convictions in the Glassdale PD API
*/
import { useConvictions, getConvictions } from "./ConvictionDataProvider.js"

// Get a reference to the DOM element where the <select> will be redered
const contentTarget = document.querySelector(".filters__crime")


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

