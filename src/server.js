import express from "express";
import {join} from "path";
import socketIO from "socket.io";
import morgan from "morgan";

const app = express();
const PORT = 4000;

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

//Socket 세팅
const io = socketIO.listen(server);

io.on("connection", (socket) => {
    socket.emit("hello");    
});

