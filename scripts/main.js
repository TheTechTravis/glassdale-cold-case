// import { getCriminals } from "./criminals/CriminalDataProvider.js"
// getCriminals()

import  { useCriminals } from "./criminals/CriminalDataProvider.js"
import  { criminalList } from "./criminals/CriminalList.js"
import { useOfficers } from "./officers/OfficerDataProvider.js"
import { officerList } from "./officers/OfficerList.js"

console.log("Welcome to the main module")


// useCriminals()
criminalList()

// useOfficers()
officerList()