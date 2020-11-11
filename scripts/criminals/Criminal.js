const eventHub = document.querySelector(".container")


// This function creates and returns a string of HTML components that represent a single criminalObj, which will later be used to inject HTML content dynamically.

/* export const Criminal = (criminalObj) => {
    return `
        <div id="criminal-${criminalObj.id}" class="criminal">
            <h3 class="criminal__name"> ${criminalObj.name} </h3>
            <p class="criminal__age"> Age: ${criminalObj.age} </p>
            <p class="criminal__conviction"> Crime: ${criminalObj.conviction} </p>
            <p class="criminal__incarceration-start"> Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString("en-US")} </p>
            <p class="criminal__incarceration-end"> Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString("en-US")} </p>
            <button id="associates--${criminalObj.id}"> Associate Alibis </button>
        </div>
    `
} */

// This is the provided CriminalList function from Ch. 16
export const Criminal = (criminalObject, facilities) => {
    return `
    <div id="criminal-${criminalObject.id}" class="criminal">
        <h4>${criminalObject.name}</h4>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div>
                <h2>Facilities</h2>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <button id="associates--${criminalObject.id}">Show Associates</button>
        </div>
    </div>
    `
}

eventHub.addEventListener("click", (eventObj) => {

    const [nameOfId, criminalId] = eventObj.target.id.split("--")

    // Check to see if Associate Alibis button was clicked
    if (eventObj.target.id.startsWith("associates--")) {

        const alibiButtonEvent = new CustomEvent("alibiButtonClicked", {
            detail: {
                criminalId: criminalId
            }
        })
        eventHub.dispatchEvent(alibiButtonEvent)
    }
})