import { Officer } from "./Officer.js"
import { getOfficers, useOfficers } from "./OfficerDataProvider.js"


// This function returns one large string of officers which will be used for HTML injection
export const officerList = () => {

    // Specify target destination for HTML injection
    const targetElement = document.querySelector(".officersContainer")
    const officerHeading = document.querySelector(".officerHeading")
    
    // Invoke getOfficers, which returns an array of officers in JSON format
    getOfficers()

    // THEN once that step is 100% complete, create variable to hold slice of data from useOfficers()
        .then(() => {
            const officers = useOfficers()

            // Create a variable to hold the string representation of each officer in the array of officers.
            let officerHTML = ""

            //  Loop through array of officers and append each officer's individual HTML representation to officerHTML variable
            for (const officerObj of officers) {
                officerHTML += Officer(officerObj)
            }

            // Take officerHTML (String) and inject it to the DOM
            officerHeading.innerHTML = `<h2>Officers</h2>`
            targetElement.innerHTML += `
            ${officerHTML}
            `
        }
        )
}