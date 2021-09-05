const { v4: uuidv4 } = require("uuid");
export const SessionList = [
  {
    id: uuidv4(),
    name: "Truong",
    currentLocation: "Ha Dong, Ha Noi",
    title: "Session 1 title",
    content: "Session 1 content",
    timeout: 5,
    places: ["Tran Duy Hung", "Ho Tung Mau"],
    members: ["Truong", "Tien Anh", "Binh", "Tho"],
  },
  {
    id: uuidv4(),
    name: "Binh",
    currentLocation: "Ha Dong, Ha Noi",
    title: "Session 2 title",
    content: "Session 2 content",
    timeout: 0,
    places: ["Xa Dan", "Big C Thang Long"],
    members: ["Truong", "Tien Anh"],
  },
  {
    id: uuidv4(),
    name: "Tho",
    currentLocation: "Ha Dong, Ha Noi",
    title: "Session 3 title",
    content: "Session 3 content",
    timeout: 10,
    places: ["Xa Dan", "Big C Thang Long"],
    members: ["Truong", "Tien Anh"],
  },
];
