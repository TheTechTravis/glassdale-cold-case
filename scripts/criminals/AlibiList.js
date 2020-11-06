import { useCriminals } from "./CriminalDataProvider.js"

const eventHub = document.querySelector(".container")

export const createAlibiListener = () => {
    eventHub.addEventListener("alibiButtonClicked", (eventObj) => {
        console.log("Hey, I'm listening!", eventObj.detail.criminalId)
        // Find the one criminal whose id matches the criminalId sent in the event
        const arrayOfCriminals = useCriminals()

        const matchingCriminal = arrayOfCriminals.find((criminalObj) => {
            return criminalObj.id === parseInt(eventObj.detail.criminalId)
        })

        console.log("Found matching criminal!", matchingCriminal)


        AlibiList(matchingCriminal)
    })
}


// Add a list of alibis to the criminal card
const AlibiList = (criminalObj) => {

    render(criminalObj)
}

// Render method for adding alibis
const render = (criminalObj) => {
    const targetContent = document.querySelector(`#criminal-${criminalObj.id}`)

    targetContent.innerHTML += `
    <div class="alibi__list">
        ${criminalObj.known_associates.map(alibiObj => {
        return `
            <div class="alibi__item">
                <p>Name: ${alibiObj.name}</p>
                <p>Alibi: ${alibiObj.alibi}</p>
            </div>    
                `
    }).join("")}
    </div>
    `

}