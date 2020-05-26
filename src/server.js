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

    /**
     * on : 수신,
     * emit:전송,
     * broadcast : 현재 이벤트를 전송한 소켓을 제외한 나머지에게 전송,
     * 
     */
    socket.on("newMessage", ({ message }) => {

        socket.broadcast.emit("MessageNotif", {
            message,
            nickname: socket.nickname || "Anon"
        });
    });

    socket.on("setNickname", ({ nickname }) => {
        socket.nickname = nickname;
    });

});


const addSocketIds = (id) => {
    ids.push(id);
}


