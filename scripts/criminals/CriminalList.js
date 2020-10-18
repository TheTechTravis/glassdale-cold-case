import { Criminal } from "./Criminal.js"
import { getCriminals, useCriminals } from "./CriminalDataProvider.js"


// This function returns one large string of criminals which will be used for HTML injection
export const criminalList = () => {

    // Specify target destination for HTML injection
    const targetElement = document.querySelector(".criminalsContainer")
    
    // Invoke getCriminals, which returns an array of criminals in JSON format
    getCriminals()

    // THEN once that step is 100% complete, create variable to hold slice of data from useCriminals()
        .then(() => {
            const criminals = useCriminals()

            // Create a variable to hold the string representation of each criminal in the array of criminals.
            let criminalHTML = ""

            //  Loop through array of criminals and append each criminal's individual HTML representation to criminalHTML variable
            for (const criminalObj of criminals) {
                criminalHTML += Criminal(criminalObj)
            }

            // Take criminalHTML (String) and inject it to the DOM
            targetElement.innerHTML += `
            ${criminalHTML}
            `
        }
        )
}

