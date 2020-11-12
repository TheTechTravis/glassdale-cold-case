import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionDataProvider.js"
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js"
import { FacilityList } from "../facility/FacilityList.js"

// Identify the eventHub
const eventHub = document.querySelector(".container")

// Get a reference to the DOM element where the criminalCards will be rendered
const criminalHeading = document.querySelector(".criminalHeading")
const criminalsContainer = document.querySelector(".criminalsContainer")
const facilitiesContainer = document.querySelector(".facilityContainer")
const facilityHeading = document.querySelector(".facilityHeading")


// This is MY original CriminalList function
/* export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()

            render(criminalArray)
        })
} */

// This is the provided CriminalList function from Ch. 16
export const CriminalList = () => {
    // Kick off the fetching of both collections of data
    getFacilities()
        .then(getCriminals)
        .then(getCriminalFacilities)
        .then(
            () => {
                // Pull in the data now that it has been fetched
                const facilities = useFacilities()
                const crimFac = useCriminalFacilities()
                const criminals = useCriminals()

                // Pass all three collections of data to render()
                render(criminals, facilities, crimFac)
            }
        )
}

// This is MY original render function
/* const render = (filteredCriminalsArray) => {
    let criminalsHTMLRepresentations = ""
    for (const criminal of filteredCriminalsArray) {

        criminalsHTMLRepresentations += Criminal(criminal)

        criminalsContainer.innerHTML = `
                ${criminalsHTMLRepresentations}
                `
    }
} */

const render = (criminalsToRender, allFacilities, allRelationships) => {

    // Step 1 - Iterate all criminals
    criminalHeading.innerHTML = `<h2>Criminals</h2>`
    criminalsContainer.innerHTML += criminalsToRender.map( 
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminal(criminalObject, facilities)
        }
    ).join("")
}

/* 
                        EVENTS START HERE
 */

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
    const facilities = useFacilities() // This line was added to fix dropdown filtering functionality
    const crimFac = useCriminalFacilities() // This line was added to fix dropdown filtering functionality
    render(filteredCriminalsArray, facilities, crimFac)
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

    const facilities = useFacilities() // This line was added to fix dropdown filtering functionality
    const crimFac = useCriminalFacilities() // This line was added to fix dropdown filtering functionality

    render(filteredCriminalsArray, facilities, crimFac)
    console.log(`You are now filtering criminals by the arresting officer that was selected in the dropdown (in this case, ${selectedOfficerName.officerName})!`);
})

// Listen for facilityButtonWasClicked event and respond by toggling between rendering criminals and rendering facilities.
eventHub.addEventListener("facilityButtonWasClicked", eventResponse => {
    console.log("CriminalList.js was heard DisplayFacilitiesButton.js! :D")

    // If statement checks if FacilityList is already rendered
    // NOTE: THIS WILL ONLY WORK IF THE facilitiesContainer HAS ZERO CHARACTERS BETWEEN OPENING/CLOSING TAGS
    if (facilitiesContainer.textContent === "") {

        // Render FacilityList HTML
        facilityHeading.innerHTML = `<h2>Facilities</h2>`
        FacilityList()
    }

    // Reset FacilityList HTML
    else {
        facilityHeading.innerHTML = ""
        facilitiesContainer.innerHTML = ""
    }
})