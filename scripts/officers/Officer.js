// This function creates and returns a string of HTML components that represent a single officerObj, which will later be used to inject HTML content dynamically.
export const Officer = (officerObj) => {
    return `
        <div class="officer-details">
            <h3 class="officer__name"> ${officerObj.name} </h3>
            <p class="officer_id"> Officer ID: ${officerObj.id} </p>
        </div>
    `
}