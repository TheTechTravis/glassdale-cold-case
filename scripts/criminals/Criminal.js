// This function creates and returns a string of HTML components that represent a single criminalObj, which will later be used to inject HTML content dynamically.
export const Criminal = (criminal) => {
    return `
        <div class="criminal">
            <h3 class="criminal__name"> ${criminal.name} </h3>
            <p class="criminal__age"> Age: ${criminal.age} </p>
            <p class="criminal__conviction"> Crime: ${criminal.conviction} </p>
            <p class="criminal__incarceration-start"> Term start: ${new Date(criminal.incarceration.start).toLocaleDateString("en-US")} </p>
            <p class="criminal__incarceration-end"> Term end: ${new Date(criminal.incarceration.end).toLocaleDateString("en-US")} </p>
        </div>
    `
}