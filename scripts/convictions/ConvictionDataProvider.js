// This module will fetch those crimes and export a useConvictions() method for other components to import.

let convictions = []

export const useConvictions = () => {
    return convictions.slice()
}

export const getConvictions = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(
            parsedConvictions => {
                convictions = parsedConvictions
            }
        )
}