var loadRowTimes = function () {
  //display current date
  var CurrentDate = moment().format("MMM Do YYYY");
  $("#currentDay").append('<span id="add_here">' + CurrentDate + "</span>");

  var currentHour = moment().format("HH");
  //loop each row and class time block
  $(".time-block").each(function (index, value) {
    //get Id to know with hour and compare to add class to put colors

    var id = $(this).attr("id");
    const hour = id.replace("time-", "");
    var intHour = parseInt(hour);
    var intCurrent = parseInt(currentHour);

    console.log(hour);

    if (intHour < intCurrent) {
      $(this).addClass("past");
    } else if (intHour === intCurrent) {
      $(this).addClass("present");
    } else if (intHour > intCurrent) {
      $(this).addClass("future");
    }
  });
};

var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

loadRowTimes();
