import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"

// Get a reference to the DOM element where the criminalCards will be rendered
const criminalsContainer = document.querySelector(".criminalsContainer")

// Identify the eventHub
const eventHub = document.querySelector(".container")

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminals = useCriminals()

            let criminalsHTMLRepresentations = ""
            for (const criminal of criminals) {

                criminalsHTMLRepresentations += Criminal(criminal)

                criminalsContainer.innerHTML = `
                ${criminalsHTMLRepresentations}
                `
            }
        })
}

// Listen for crimeSelected customEvent
eventHub.addEventListener("crimeSelected", event => {
    console.log("crimeSelected event happened", event.detail.crimeThatWasChosen) // This line shows conviction id that was broadcasted from ConvictionSelect.js

    // Get a slice of all criminals, so that we can filter them in the future
    // based on the id of the conviction
    const criminalsArray = useCriminals()
    console.log(criminalsArray)

})