// This module will fetch those crimes and export a useConvictions() method for other components to import.

let convictions = []

export const useConvictions = () => {
    return convictions.slice()
}

export const getConviction = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(
            parsedConvictions => {
                // console.table(parsedConvictions)
                convictions = parsedConvictions.map(
                    convictionsObj => {
                        const valueToAdd = convictionsObj.name
                        convictions.push(valueToAdd)
                    }
                )
            }
        )
}
console.log(convictions) // This logs an array of conviction names