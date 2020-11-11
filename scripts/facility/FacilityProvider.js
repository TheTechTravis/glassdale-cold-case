/* 
This module is responsible for fetching facilities data from API.
*/

let facilities = []

export const useFacilities = () => facilities.slice()

export const getFacilities = () => {
    return fetch("https://criminals.glassdale.us/facilities")
        .then(response => response.json())
        .then(apiData => {
            facilities = apiData
        })
}