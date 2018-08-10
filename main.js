var container = document.querySelector('.main');

window.addEventListener('load', function () {
    var allNotes = fetchNotes();
    addNotesToDOM(allNotes);
})


var note = document.querySelector("#note");
var addButton = document.querySelector("#add-note");

addButton.addEventListener('click', function (e) {
    if (note.value) {
        var date = new Date();
        var key = date.getTime();
        saveNote(key, note.value);
        //add note to DOM;;;
        addSingleNoteToDOM({ key: key, note: note.value })
        note.value = "";
    }
})



function saveNote(key, note) {
    var notes = fetchNotes();
    notes.push({ key: key, note: note });
    window.localStorage.setItem("notes", JSON.stringify(notes));
}


function fetchNotes() {
    var notes = JSON.parse(window.localStorage.getItem("notes"));
    if (!notes) {
        notes = [];
    }
    return notes;
}

//delete note;;
function deleteNote(key){
    var sticker = document.getElementById(key);
    sticker.classList.add("remove-item");
    //delete from localStorage
    var notes = fetchNotes();
    notes = notes.filter(function(note){
        return note.key != key;
    });
    window.localStorage.setItem("notes", JSON.stringify(notes));

    //remove node from html body
    setTimeout(function(){
        container.removeChild(sticker);
    },400);
   
}

//add notes to DOM 

function addNotesToDOM(notes) {
    notes.forEach(function (note) {
        addSingleNoteToDOM(note)
    });
}


function addSingleNoteToDOM(note) {
    var date = new Date(note.key);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'];
    var template = `
            <div class="note">
                ${note.note}
            </div>
            <div class="sticky-footer">
                <span class="caption">Created on ${months[date.getMonth()]}  ${date.getDate()}</span>
                <span><button onclick="deleteNote('${note.key}')">Delete</button></span>
            </div>
     
        `
    var elem = document.createElement('div');
    elem.className = "sticky-note";
    elem.setAttribute('id', note.key)
    elem.innerHTML = template;
    container.prepend(elem);
}
