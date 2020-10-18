let criminals = []

// Create a copy of criminals[] to work with so that the original array is not mutated
export const useCriminals = () => {
    return criminals.slice()
}

// Fetch data from the provided API, parse the data to JSON format, and use parsed data to fill the empty criminals[] array
export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
        .then(response => response.json())
        .then(
            parsedCriminals => {
                console.table(parsedCriminals)
                criminals = parsedCriminals
            }
        )
}