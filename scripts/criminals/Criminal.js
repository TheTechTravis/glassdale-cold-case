const eventHub = document.querySelector(".container")

// This function creates and returns a string of HTML components that represent a single criminalObj, which will later be used to inject HTML content dynamically.

export const Criminal = (criminalObject, facilities) => {
    return `
    <div id="criminal-${criminalObject.id}" class="criminal">
        <h3>${criminalObject.name}</h3>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div class="facilities-card">
                <h3>Facilities</h3>
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