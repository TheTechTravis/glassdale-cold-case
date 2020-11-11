
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".facility__button")

export const DisplayFacilitiesButton = () => {
    return contentTarget.innerHTML = `
        <button id="facility-button"> Facility Button </button>
    `
}

/* EVENTS START HERE */
eventHub.addEventListener("click", ClickEvent => {
    if (ClickEvent.target.id === "facility-button") {
        
        console.log("There was a click!")
        
        const facilityButtonEvent = new CustomEvent("facilityButtonWasClicked")
        eventHub.dispatchEvent(facilityButtonEvent)
    }
})