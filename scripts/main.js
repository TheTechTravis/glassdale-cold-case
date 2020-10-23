import { NoteForm } from "./api/NoteForm.js"
import { NoteList } from "./api/NoteList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { CriminalList } from "./criminals/CriminalList.js"
import { officerList } from "./officers/OfficerList.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"

NoteForm()
CriminalList()
officerList()
ConvictionSelect()
OfficerSelect()
NoteList()