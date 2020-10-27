const eventHub = document.querySelector(".container")


// This function creates and returns a string of HTML components that represent a single criminalObj, which will later be used to inject HTML content dynamically.
export const Criminal = (criminalObj) => {
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