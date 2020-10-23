export const Note = (noteObj) => {
    return `
    <div class="note">
        <p class="note__entryDate"> Entry Date: ${noteObj.entryDate} </p>
        <p class="note__author"> Author: ${noteObj.author} </p>
        <p class="note__suspect"> Suspect: ${noteObj.suspect} </p>
        <p class="note__content"> Content: ${noteObj.content} </p>
    </div>
    `
}