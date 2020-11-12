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

// Heath's solution
const render = (criminal) => {
    const alibiElement = document.querySelector(`#criminal-${criminal.id}`)

    // NOTE: childElementCount references the number of direct children within the Criminal.js module.
    if (alibiElement.childElementCount === 2) {
        alibiElement.innerHTML += `
    <div class="alibi__list--${criminal.id}">
        ${criminal.known_associates.map(alibiObj => {
            return `
                <br>
                <dt>Associate: ${alibiObj.name}</dt>
                <dt>Alibi: ${alibiObj.alibi}</p>
            `
        }).join("")}
    </div>
    `
    } else {
        const listElement = document.querySelector(`.alibi__list--${criminal.id}`)
        listElement.parentNode.removeChild(listElement)
    }
}

/* // Render method for adding alibis
const render = (criminalObj) => {
    const targetContent = document.querySelector(`#criminal-${criminalObj.id}`)

    // if ()

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

} */