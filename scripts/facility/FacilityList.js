import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { Facility } from "./Facility.js"

const facilitiesContainer = document.querySelector(".facilityContainer")

export const FacilityList = () => {
    getFacilities()
        .then(getCriminals)
        .then(getCriminalFacilities)
        .then(
            () => {
                const facilities = useFacilities()
                const criminals = useCriminals()
                const crimFac = useCriminalFacilities()

                render(crimFac, facilities, criminals)
            })
}

// Handle logic for join table.
const render = (allRelationships, allFacilities, criminalsToRender) => {

    // Step 1 - Iterate all facilities
    facilitiesContainer.innerHTML = allFacilities.map( // Changed contentTarget to criminalsContainer to match my DOM reference.
        (facilityObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.facilityId === facilityObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const criminals = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingCriminalObject = criminalsToRender.find(criminal => criminal.id === cf.criminalId)
                return matchingCriminalObject
            })

            // Must pass the matching facilities to the Criminal component
            return Facility(facilityObject, criminals)
        }
    ).join("")
}