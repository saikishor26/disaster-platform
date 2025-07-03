const socketIO=require('socket.io');

function setupSocket(server){
    const io =socketIO(server,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    });

    io.on('connection',(socket)=>{
        console.log('New Client Connected:',socket.id);
        socket.on('disconnect',()=>{
            console.log('Client disconnected',socket.id);
        });
    });

    global.io=io;
}
module.exports={setupSocket};