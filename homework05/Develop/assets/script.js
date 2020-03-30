var Day = [
    {
        id: "0",
        hour: "09",
        hour2: "09",
        meridiem: "am",
        date: ""
    },
    {
        id: "1",
        hour: "10",
        hour2: "10",
        meridiem: "am",
        date: ""
    },
    {
        id: "2",
        hour: "11",
        hour2: "11",
        meridiem: "am",
        date: ""
    },
    {
        id: "3",
        hour: "12",
        hour2: "12",
        meridiem: "pm",
        date: ""
    },
    {
        id: "4",
        hour: "01",
        hour2: "13",
        meridiem: "pm",
        date: ""
    },
    {
        id: "5",
        hour: "02",
        hour2: "14",
        meridiem: "pm",
        date: ""
    },
    {
        id: "6",
        hour: "03",
        hour2: "15",
        meridiem: "pm",
        date: ""
    },
    {
        id: "7",
        hour: "04",
        hour2: "16",
        meridiem: "pm",
        date: ""
    },
    {
        id: "8",
        hour: "05",
        hour2: "17",
        meridiem: "pm",
        date: ""
    },
    
]
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}
function saveDates() {
    localStorage.setItem("Day", JSON.stringify(Day));
}
function displayDates() {
    Day.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.date);
    })
}
function init() {
    var storedDay = JSON.parse(localStorage.getItem("Day"));

    if (storedDay) {
        Day = storedDay;
    }

    saveDates();
    displayDates();
}
getHeaderDate();
Day.forEach(function(thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.hour2 < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.hour2 === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.hour2 > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})
init();
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    Day[saveIndex].date = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveDates();
    displayDates();
})