let officers = []

// Create a copy of officers[] to work with so that the original array is not mutated
export const useOfficers = () => {
    return officers.slice()
}

// Fetch data from the provided API, parse the data to JSON format, and use parsed data to fill the empty officers[] array
export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")
        .then(response => response.json())
        .then(
            parsedOfficers => {
                console.table(parsedOfficers)
                officers = parsedOfficers
            }
        )
}
