// This function creates and returns a string of HTML components that represent a single criminalObj, which will later be used to inject HTML content dynamically.
export const Criminal = (criminalObj) => {
    return `
        <div class="criminal-details">
            <h3 class="criminal__name"> ${criminalObj.name} </h3>
            <p class="criminal__age"> Age: ${criminalObj.age} </p>
            <p class="criminal__conviction"> Crime: ${criminalObj.conviction} </p>
            <p class="criminal__incarceration-start"> Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString("en-US")} </p>
            <p class="criminal__incarceration-end"> Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString("en-US")} </p>
        </div>
    `
}