const socket = io("/");

const sendMessage = (message) => {
    console.log("client sendMessage emit")
    socket.emit("newMessage", { message });
}

function handleMessageNotif(data) {
    const { message, nickname } = data;
    console.log(`${nickname} : ${message}`);
} 1

function setNickname(nickname) {
    socket.emit("sentNickname", { nickname });
}

socket.on("sendMessage", sendMessage);
socket.on("MessageNotif", handleMessageNotif);


