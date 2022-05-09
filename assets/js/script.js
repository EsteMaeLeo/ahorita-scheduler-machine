sheduleNote = [];

sheduleStr = {};

var loadRowTimes = function () {
  //display current date
  var CurrentDate = moment().format("MMMM dddd YYYY");
  $("#currentDay").append('<span id="add_here">' + CurrentDate + "</span>");

  var currentHour = moment().format("HH");
  //load notes on the shedule
  var localNotes = JSON.parse(localStorage.getItem("sheduleNote"));
  //loop each row and class time block
  $(".time-block").each(function (index, value) {
    //get Id to know with hour and compare to add class to put colors

    // get id attribut
    var id = $(this).attr("id");
    //replace time- to get time
    const hour = id.replace("time-", "");
    //parse to integer hour
    var intHour = parseInt(hour);
    //get the current hour
    var intCurrent = parseInt(currentHour);

    // if localstorage loop validate with id get text
    var time = "#" + id;
    if (localNotes) {
      for (var i = 0; i < localNotes.length; i++) {
        if (localNotes[i].id === id) {
          var valNote = localNotes[i].note;
          break;
        }
      }
    }
    if (valNote) {
      //set the text
      $(time + " .note").val(valNote);
    }

    //validate to set colour past, present and future
    if (intHour < intCurrent) {
      $(this).addClass("past");
    } else if (intHour === intCurrent) {
      $(this).addClass("present");
    } else if (intHour > intCurrent) {
      $(this).addClass("future");
    }
  });
};

$(".saveBtn").click(function () {
  //click save button get the id of the row
  var id = $(this).parent().attr("id");
  //get the text
  var noteText = $(this).siblings(".note").val();

  if (noteText) {
    // save in tasks structure
    sheduleStr.id = id;
    sheduleStr.note = noteText;

    saveNotes();
    $("#saveNote").find("span").remove();
    $("#saveNote").append(
      '<span id="add_here">' + noteText + " added to localstorage" + "</span>"
    );
  }
});

var saveNotes = function () {
  //variable if found record in case update note shedule
  var found = false;
  //get old notes
  var oldNotes = JSON.parse(localStorage.getItem("sheduleNote"));
  if (oldNotes) {
    for (var i = 0; i < oldNotes.length; i++) {
      if (oldNotes[i].id === sheduleStr.id) {
        //if get the note set new text note
        oldNotes[i].note = sheduleStr.note;
        localStorage.setItem("sheduleNote", JSON.stringify(oldNotes));
        sheduleNote = {};
        found = true;
        break;
      }
    }
  } else {
    // there is not found old notes means new record
    sheduleNote.push(sheduleStr);
    localStorage.setItem("sheduleNote", JSON.stringify(sheduleNote));
    sheduleNote = [];
    return;
  }

  if (!found) {
    //case not found but we have notes then safe the new
    oldNotes.push(sheduleStr);
    localStorage.setItem("sheduleNote", JSON.stringify(oldNotes));
    sheduleNote = [];
  }
};

loadRowTimes();
