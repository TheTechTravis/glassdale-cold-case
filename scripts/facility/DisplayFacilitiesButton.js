
const eventHub = document.querySelector(".container")
const contentTarget = document.getElementsByClassName("facility__button")[0]

export const DisplayFacilitiesButton = () => {
    return contentTarget.innerHTML = `
        <button id="facility-button"> Facility Button </button>
    `
}

/* EVENTS START HERE */
eventHub.addEventListener("click", ClickEvent => {
    if (ClickEvent.target.id === "facility-button") {
        const facilityButtonEvent = new CustomEvent("facilityButtonWasClicked")
        eventHub.dispatchEvent(facilityButtonEvent)
    }
})