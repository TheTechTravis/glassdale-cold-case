// This function creates and returns a string of HTML components that represent a single officerObj, which will later be used to inject HTML content dynamically.
export const Officer = (officerObj) => {
    return `
        <div class="officer-details">
            <h2 class="officer__name"> ${officerObj.name} </h2>
            <p class="officer_id"> ${officerObj.id} </p>
        </div>
    `
}