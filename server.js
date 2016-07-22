
var express =  require('express'),
    mongoose = require('mongoose'),
    bodyParser = require ('body-parser');

//var cors = require("cors");

var fbController = require('./controllers/fbController');

//var db = mongoose.connect('mongodb://localhost/userAPI');
var db = mongoose.connect('mongodb://user:admin@ds023674.mlab.com:23674/librarymongodb');

var User = require('./models/user');
var Usertrack = require('./models/usertrack');
var Book = require('./models/book');
var Event = require('./models/event');
var Person = require('./models/person');
var Author = require('./models/author');
var Category = require('./models/category');
var Language = require('./models/language');
var Room = require('./models/room');
var BookOrdering = require('./models/bookOrdering');

var Message = require('./models/message');

var app = express();
var cors = require('cors');
var port = process.env.PORT || 5000;

debugger

app.set('superSecret', 'beenthere');

//configure the app to use body parsers
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//var corsOptions = {
//  credentials: true,
//  origin: function(origin,callback) {
////    if(origin===undefined) {
////      callback(null,false);
////    } else {
//      var allowed = true;
//      callback(null,allowed);
////    }
//  }
//};
//app.use(cors(corsOptions));


var userRouter = require("./routes/userRoutes")(User);
var usertrackRouter = require("./routes/usertrackRoutes")(Usertrack);
var bookRouter = require("./routes/bookRoutes")(Book);
var eventRouter = require("./routes/eventRoutes")(Event);
var personRouter = require("./routes/personRoutes")(Person);
var authorRoutes = require("./routes/authorRoutes")(Author);
var categoryRoutes = require("./routes/categoryRoutes")(Category);
var languageRoutes = require("./routes/languageRoutes")(Language);
var RoomRoutes = require("./routes/roomRoutes")(Room);
var bookOrderingRouter = require("./routes/bookOrderingRoutes")(BookOrdering);

var messageRouter = require("./routes/messageRoutes")(Message);


//app.use(function(req, res, next){
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', '*');
//    next();
//});



app.use('/api/users', userRouter);
app.use('/api/usertracks', usertrackRouter);
app.use('/api/book', bookRouter);
app.use('/api/event', eventRouter);
app.use('/api/person', personRouter);
app.use('/api/author', authorRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/language', languageRoutes);
app.use('/api/room', RoomRoutes);
app.use('/api/book', bookOrderingRouter);

app.use('/api/messages', messageRouter);



app.post('/api/getu/:fbUserToken', function (req, res) {
    console.log('triggered /getu - start getting user data from FB')
    fbController.getUserData(req, req.params.fbUserToken, function (currentBtToken,_id, err) {
        if(err){
            res.send('There was an error logging in. Please try again soon.');
        }else{
            res.send('{"token":"'+currentBtToken+'","_id":"'+_id+'"}');
        }
    });
    //res.send('GEt user data done. ');
});


//simple startit forward route
app.get('/', function(req, res){
    res.send('BTS - Server v0.2 ');
});







app.listen(port,function(){
    console.log('-----App running on port: ' + port);
});



