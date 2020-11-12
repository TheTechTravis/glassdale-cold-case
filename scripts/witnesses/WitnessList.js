import { Witness } from "./Witness.js"
import { getWitnesses, useWitnesses } from "./WitnessDataProvider.js"

export const witnessList = () => {
    const targetElement = document.querySelector(".criminalsContainer")

    getWitnesses()
        .then(() => {
            const witnesses = useWitnesses()

            let witnessHTML = ""
            for (const witnessObj of witnesses) {
                witnessHTML += Witness(witnessObj)
            }

            targetElement.innerHTML = `
            ${witnessHTML}
            `
        })
}