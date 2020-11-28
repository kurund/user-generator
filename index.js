// simple script to generate random users for the load testing
const fs = require("fs");
const { SERVER_NAMES, NO_OF_ROOMS, NO_OF_USERS_PER_ROOM } = require("./config");

const serverNo = SERVER_NAMES;
const noOfRooms = NO_OF_ROOMS;
const noOfSeatsInRoom = NO_OF_USERS_PER_ROOM;

// for eg: email_10@example.org
const emailDomain = "@example.org";

// Let's generate json for each rooms
let userList = {};

// generate participants
const totalParticipants = noOfRooms * noOfSeatsInRoom;
let roomCounter = 0;
let seatCounter = 0;
let role = "host";
for (let i = 0; i <= totalParticipants; i += 1) {
  if (seatCounter > 0) {
    role = "participant";
  } else {
    role = "host";
  }

  userList[`email_${i}@${emailDomain}`] = {
    serverNo: serverNo[0],
    role: role,
    roomNo: roomCounter,
    seatNo: seatCounter,
  };

  seatCounter += 1;
  if (seatCounter > noOfSeatsInRoom) {
    seatCounter = 0;
    roomCounter += 1;
  }
}

const jsonContent = JSON.stringify(userList);

fs.writeFile("./UserList.json", jsonContent, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
