const http= require('http')
const express = require ('express')
const ProductRouter= require('./routes/product')
const { Server } = require('socket.io')
const mongo =require ("mongoose")
const db =require ('./config/db.json')
const { error, log } = require('console')
const path = require('path')


mongo.connect(db.url).then(
    console.log("database is running")
)
.catch((error)=>
    {console.log(error)}
)

var app= express ()
app.use(express.json())
app.set("views",path.join(__dirname,"views"))
app.set("view engine","twig")
app.use('/product', ProductRouter)



const server=http.createServer(app,console.log('server run'))
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('Un client est connecté.');
});

server.listen(3000)