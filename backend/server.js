require('dotenv').config();
const http=require('http');
const app=require('./app');
const connectDB=require('./config/db');

connectDB();

const server=http.createServer(app);

const {setupSocket}=require('./sockets');

setupSocket(server);

const PORT=process.env.PORT||5000;

server.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});