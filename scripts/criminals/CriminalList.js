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
    criminalsContainer.innerHTML = criminalsToRender.map(
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
    const criminalsArray = useCriminals()
    const convictionsArray = useConvictions()

    const convictionThatWasChosen = convictionsArray.find(convictionObj => {
        return convictionObj.id === parseInt(event.detail.crimeThatWasChosen)
    })

    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
        return criminalObj.conviction === convictionThatWasChosen.name
    })

    const facilities = useFacilities()
    const crimFac = useCriminalFacilities()
    render(filteredCriminalsArray, facilities, crimFac)
})

// Listen for officerSelected customEvent
eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
    const selectedOfficerName = officerSelectedEventObj.detail

    const criminalsArray = useCriminals()
    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
        return criminalObj.arrestingOfficer === selectedOfficerName.officerName
    })
    const facilities = useFacilities()
    const crimFac = useCriminalFacilities()
    render(filteredCriminalsArray, facilities, crimFac)
})

// Listen for facilityButtonWasClicked event and respond by toggling between rendering criminals and rendering facilities.
eventHub.addEventListener("facilityButtonWasClicked", eventResponse => {

    /* 
    Check if FacilityList is already rendered

    NOTE: THIS WILL ONLY WORK IF THE facilitiesContainer HAS ZERO CHARACTERS BETWEEN OPENING/CLOSING TAGS
    */

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