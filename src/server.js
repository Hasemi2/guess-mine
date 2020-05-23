import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import morgan from "morgan";

const app = express();
const PORT = 5000;

const handleListening = () => {
    console.log(`Server running : http://localhost:${PORT}`);
}

const server = app.listen(PORT, handleListening); //WS와 HTTP는 같은 포트위에 올릴수 있음
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

//router 처리
app.get("/", (req, res) => res.render("home"));

//Socket과 IO 서버 연결하고
const io = socketIO.listen(server);

//연결된 소켓을 io로 가져온다
//io.on('connection' , 콜백)은 서버와 클라이언트의 소켓이
//연결 되어있을 때 실행됨

//파라미터 socket은 방금 접속한 소켓이고
let ids = [];

io.on("connection", (socket) => {

    addSocketIds(socket.id);
    console.log("접속 소켓 아이디 => ", ids);

   // socket.emit("hello");

    //여러 클라이언트들에게 메세지를 보내야댐
    //emit과 broadcast는 기본적으로 이벤트를 보내지만
    //broadcast는 현재 연결된 소켓을 제외한 나머지에게
    //이벤트를 전달한다.
    //클라이언트가 이벤트를 response 할 준비가 되어야
    //서버에서 이벤트를 보낼 수 있음

    socket.on("getNickName", (data) => {
        socket.broadcast.emit("newUserNoti", data);
    });

    socket.on("newMessage", (data) => {
        console.log("newMessage ", data);
        socket.broadcast.emit("MessageNotif", data);
    });


});

const addSocketIds = (id) => {
    ids.push(id);
}


