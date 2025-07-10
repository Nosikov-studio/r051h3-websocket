var Wss=new require('ws');

var clients ={};


var wss = new Wss.Server({port: 8888});
wss.on('connection', function(ws) {
    var id=Math.random();
    clients[id] =ws;
    console.log("new connection" + id);

    ws.on('message', function(message){
        console.log('new message'+message);

        for(var key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function(){
        console.log('connection closed' +id);
        delete clients[id];
    });
});









//********************************************************************************** */
// import express from 'express';
// import http from 'http';
// //import { WebSocketServer } from 'ws';
// import { WebSocketServer, WebSocket } from 'ws';
// /*
// WebSocketServer - это класс сервера, а не объект WebSocket. 
// Для проверки состояния подключения клиента 
// нужно использовать константу OPEN из самого объекта WebSocket, 
// который обычно импортируется из модуля ws.
// */

// //Создаем новый экземпляр приложения
// const app =express();
// const port =8888;

// //Настраиваем статическую директорию для клиентских файлов
// app.use(express.static('public'));
// //Создаем HTTP-сервер на основе приложения
// const server =http.createServer(app);

// // Создаем новый WebSocket - сервер, привязанный к серверу http
// const wss=new WebSocketServer({ server });

// // Обработка подключения нового клиента
// wss.on('connection', (ws) => {
//     console.log("New client connected");
// // Обработка входящих сообщений
//     ws.on('message', (message) => {
// // Парсим сообщение
//         const data =JSON.parse(message);
// // Отправляем сообщение всем клиентам
//         wss.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN){ // 
//                 client.send(JSON.stringify(data));
//             }
//         });
        
//         // console.log('received: %s', message);
//         // ws.send(`${message}`);
//     });

//     ws.on('close', () => {
//         console.log('Client disconnected');
        
//     });

//     ws.send(JSON.stringify({"event":"Connected", "message": "Welcome to the WebSocket server!!!"}));

    
// });

// // Запускаем сервер на порту ${port}
//  server.listen(port, ()=>{ console.log(`Server listening on ${port}`)});