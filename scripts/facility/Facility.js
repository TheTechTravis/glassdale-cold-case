/* 
    This component structures a single Facility card in HTML format.
 */
export const Facility = (facilityObject, taco) => {
    return `
        <div class="facility">
                <h4>${facilityObject.facilityName}</h4>
                <p>Security level: ${facilityObject.securityLevel}</p>
                <p>Capacity: ${facilityObject.capacity}</p>
                <h2>Criminals</h2>
                <ul>
                    ${taco.map(criminal => `<li>${criminal.name}</li>`).join("")}
                </ul>
        </div>
    `
}