
var firebaseConfig = {
    apiKey: "AIzaSyDepXzJBW9XM7iGDriUVr_ZFJosmnRkdr8",
    authDomain: "train-scheduler-3a57f.firebaseapp.com",
    databaseURL: "https://train-scheduler-3a57f.firebaseio.com",
    projectId: "train-scheduler-3a57f",
    storageBucket: "",
    messagingSenderId: "1073000460530",
    appId: "1:1073000460530:web:15e2c844e15a8f6b70e06b",
    measurementId: "G-HFM05S37TM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//grabs input data and stores in variable - pushes data to database
$("#add-train").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    clearInputs()

    console.log(newTrain);
});

//function to clear input fields
function clearInputs() {
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
}

//gets snapshot of data added - appends newly input info to the schedule
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    console.log("train time", trainTime);

    //format train time
    var firstTrainTime = moment(trainTime, "HH:mm");
    console.log("first time", moment(firstTrainTime).format("HH:mm"));

    //current timestamp
    var currentTime = moment();
    console.log("current time", moment(currentTime).format("HH:mm"));

    //calculate time difference between first train time and current time in minutes
    var timeDiff = moment().diff(moment(firstTrainTime), "m");
    console.log("time difference", timeDiff);

    //get remainder between timediff and trainfrequency
    var timeRemainder = timeDiff % trainFreq;
    console.log("time remainder", timeRemainder);

    //calculate minutes until next train
    var minTilTrain = trainFreq - timeRemainder;
    console.log("minutes til next train", minTilTrain);

    //calculate next arrival time
    var arrivalTime = moment().add(minTilTrain, "m").format("HH:mm");
    console.log("arrival time", arrivalTime);

    //add new train data in own row to the table
    var newRow = $("<tr>").append(`
    <td>${trainName}</td>
    <td>${trainDest}</td>
    <td>${trainFreq}</td>
    <td>${firstTrainTime}</td>
    <td>${arrivalTime}</td>
    <td>${minTilTrain}</td>
    `);

    $("#current-schedule > tbody").append(newRow);
})