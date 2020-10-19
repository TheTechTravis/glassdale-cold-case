// This module will fetch those crimes an export a useConvictions() method for other components to import.

let convictions = []

export const getConviction = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(
            parsedConvictions => {
                // console.table(parsedConvictions)
                convictions = parsedConvictions.map(
                    convictionsObj => {
                        const valueToAdd = convictionsObj.name
                        return convictions.push(valueToAdd)
                    }
                )
            }
        )
}
console.log(convictions)