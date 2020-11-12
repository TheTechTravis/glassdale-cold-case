import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { Facility } from "./Facility.js"

const eventHub = document.querySelector(".container")
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









// I HAVE NO IDEA IF I'M DOING THIS CORRECTLY
const render = (allRelationships, allFacilities, criminalsToRender ) => {

    // Step 1 - Iterate all facilities
    facilitiesContainer.innerHTML = allFacilities.map( // Changed contentTarget to criminalsContainer to match my DOM reference.
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.facilityId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.criminalId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Facility(criminalObject, facilities)
        }
    ).join("")
}