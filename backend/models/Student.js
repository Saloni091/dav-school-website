const db = require("../database");

const createStudent = (studentData, callback) => {

const {name,email,phone,course,address} = studentData;

const sql = `
INSERT INTO students (name,email,phone,course,address)
VALUES (?,?,?,?,?)
`;

db.run(sql,[name,email,phone,course,address],function(err){

callback(err,this);

});

};

module.exports = { createStudent };