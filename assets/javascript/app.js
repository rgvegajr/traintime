        // Initialize Firebase
        let firebaseConfig = {
            apiKey: "AIzaSyDwNylk7AZd_2kvyFflaLnseJN0flTZ1_8",
            authDomain: "firstproj-b65e0.firebaseapp.com",
            databaseURL: "https://firstproj-b65e0.firebaseio.com",
            projectId: "firstproj-b65e0",
            storageBucket: "firstproj-b65e0.appspot.com",
            messagingSenderId: "1039411906706",
            appId: "1:1039411906706:web:018b0e35bf9f42cc307e4b"
        };

        firebase.initializeApp(firebaseConfig);

        // Create a variable to reference the database function
        let database = firebase.database();

        let name = "";
        let dest = "";
        let firstTrainTime = "";
        let freq = "";
        let nextTrain = "";
        let nextTrainTime = "";
        let minUntilNext = "";
        let tRemainder = "";
        let currTime = moment().format("X");
        let diff = "";
        // let arrTimeArray = [];
        $("#currTimeDisplay").text("Current time is: " + moment(currTime, "X").format("HH:mm"));

        // Capture Button Click to add a train to the database and table
        $("#add-train").on("click", function(event) {
            // Don't refresh the page!
            event.preventDefault();

            name = $("#name-input").val().trim();
            dest = $("#dest-input").val().trim();
            firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "HH:mm").format("X");
            freq = $("#freq-input").val().trim();

            console.log(currTime);
            console.log(name);
            console.log(dest);
            console.log(firstTrainTime);
            console.log(freq);

            //insert code to generate train schedule from inputs ..database is a function defined above as firebase.database()
            if (firstTrainTime <= currTime) {
                diff = Math.round((currTime - firstTrainTime) / 60);
                console.log("diff in min=" + diff);
                tRemainder = diff % freq;
                minUntilNext = freq - tRemainder;
                console.log("if loop minUntilNext=" + minUntilNext);
                nextTrain = moment().add(minUntilNext, "minutes");
                nextTrainTime = moment(nextTrain).format("HH:mm");
            } else {
                minUntilNext = Math.round((firstTrainTime - currTime) / 60);
                console.log("else loop minUntilNext=" + minUntilNext);
                nextTrain = moment().add(minUntilNext, "minutes");
                nextTrainTime = moment(nextTrain).format("HH:mm");
            };

            console.log("Next train: " + nextTrainTime);

            database.ref().push({
                name: name,
                dest: dest,
                firstTrainTime: firstTrainTime,
                freq: freq,
                nextTrainTime: nextTrainTime,
                minUntilNext: minUntilNext,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            alert("Train added!");
            $("form")[0].reset();
        });

        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());

            let newTrain = $("<tr>").append(
                $("<td>").text(childSnapshot.val().name),
                $("<td>").text(childSnapshot.val().dest),
                $("<td>").text(childSnapshot.val().freq),
                $("<td>").text(childSnapshot.val().nextTrainTime),
                $("<td>").text(childSnapshot.val().minUntilNext)
            );
            $("#new-train").append(newTrain);
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });