import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"

const criminalsContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminals = useCriminals()

            let criminalsHTMLRepresentations = ""
            for (const criminal of criminals) {

                criminalsHTMLRepresentations += Criminal(criminal)

                criminalsContainer.innerHTML = `
                ${criminalsHTMLRepresentations}
                `
            }
        })
}