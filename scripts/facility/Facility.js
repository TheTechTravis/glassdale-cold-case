/* 
    This component structures a single Facility card.
 */

export const Facility = (facilityObject) => {
    return `
        <div class="facility">
                <h4>${facilityObject.facilityName}</h4>
                <p>Security level: ${facilityObject.securityLevel}</p>
                <p>Capacity: ${facilityObject.capacity}</p>
        </div>
    `
}