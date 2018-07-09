var path = require("path")

//========== EXPRESS ==============
const express = require('express');
const app = express();
const server = app.listen(8000);
console.log("Running on port 8000...");

//========== PATH FOR VIEWS DIR ============
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//========== BODY PARSER ==============
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//========== STATIC ==============
app.use(express.static(__dirname + "/static"));

//========== SOCKETS ==============
const io = require('socket.io')(server);

io.on('connection', function(socket){
    count = 0;
    // listening to the number of times btn is clicked
    socket.on("button_clicked", function(data){
       count = count + 1;
       var newCount = {count: count}
       // then it will send the count 
       socket.emit('newCount', newCount);
   })
    // resets the count
    socket.on("reset", function (data){
       count = 0;
       var newCount = {count: count};
       socket.emit("resetCount", newCount);
    });

});

//routing
app.get("/", function(request, response){
    response.render("game");
})



