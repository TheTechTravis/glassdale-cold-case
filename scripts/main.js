import { NoteForm } from "./api/NoteForm.js"
import { NoteList } from "./api/NoteList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { CriminalList } from "./criminals/CriminalList.js"
import { officerList } from "./officers/OfficerList.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"
import { createAlibiListener } from "./criminals/AlibiList.js"
import { getCriminals } from "./criminals/CriminalDataProvider.js"
import { DisplayFacilitiesButton } from "./facility/DisplayFacilitiesButton.js"

CriminalList()
officerList()
ConvictionSelect()
OfficerSelect()
NoteList()
createAlibiListener()
getCriminals()
    .then(() => NoteForm())
DisplayFacilitiesButton()