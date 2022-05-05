const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const { response } = require("express");

const app = express();
//app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

let txtLogs = []; 
let txtLogsApp = [];
app.get("/", (request, response) => {
    const template = fs.readFileSync("template.ejs","utf-8");
    const html = ejs.render(template, {txtLogs: txtLogsApp});
    response.send(html);
});

app.post("/send", (request, response) => {
    
    txtLogs.push(request.body.q);
    txtLogsApp.push(`${txtLogs.length}. ${request.body.q}____${new Date().toString()}`);
    /*
    const template = fs.readFileSync("template.ejs","utf-8");
    const html = ejs.render(template, {txtLogs: txtLogs});
    response.send(html);
    */
    response.redirect("/");
});
app.listen(3000);