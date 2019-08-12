import express from "express";
import {join} from "path";
import socketIO from "soket.io";

const app = express();
const PORT = 4000;

const handleListening = () => {
    console.log(`Server running : http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
app.set("view engine" , "pug");
app.set("views" , join(__dirname , "views"));
app.use(express.static(join(__dirname , "static")));

//router 처리
app.get("/" , (req, res) => {
    res.render("home");
});