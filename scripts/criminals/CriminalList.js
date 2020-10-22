import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionDataProvider.js"

// Get a reference to the DOM element where the criminalCards will be rendered
const criminalsContainer = document.querySelector(".criminalsContainer")

// Identify the eventHub
const eventHub = document.querySelector(".container")

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()

            render(criminalArray)
        })
}

// Listen for crimeSelected customEvent
eventHub.addEventListener("crimeSelected", event => {
    // console.log("crimeSelected event happened", event.detail.crimeThatWasChosen) // This line shows conviction id that was broadcasted from ConvictionSelect.js

    // Get a slice of all criminals, so that we can filter them in the future
    // based on the id of the conviction
    const criminalsArray = useCriminals()
    // console.log("array of criminals", criminalsArray)

    const convictionsArray = useConvictions()
    // console.log("array of convictions", convictionsArray)

    const convictionThatWasChosen = convictionsArray.find(convictionObj => {
        return convictionObj.id === parseInt(event.detail.crimeThatWasChosen)
    })
    // console.log("convictionThatWasChosen", convictionThatWasChosen)

    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
        return criminalObj.conviction === convictionThatWasChosen.name
    })

    render(filteredCriminalsArray)

})

// Listen for officerSelected customEvent
eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
    // console.log("CriminalList module officerSelected custom event has been heard on the eventHub.");

    const selectedOfficerName = officerSelectedEventObj.detail
    // console.log("CriminalList module --> selectedOfficerName: ", selectedOfficerName.officerName)

    const criminalsArray = useCriminals()

    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
        return criminalObj.arrestingOfficer === selectedOfficerName.officerName
    })
    render(filteredCriminalsArray)
    console.log(`You are now filtering criminals by the arresting officer that was selected in the dropdown (in this case, ${selectedOfficerName.officerName})!`);
})

const render = (filteredCriminalsArray) => {
    let criminalsHTMLRepresentations = ""
    for (const criminal of filteredCriminalsArray) {

        criminalsHTMLRepresentations += Criminal(criminal)

        criminalsContainer.innerHTML = `
                ${criminalsHTMLRepresentations}
                `
    }
}