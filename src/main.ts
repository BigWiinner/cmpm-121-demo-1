import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My (soon to be) <i> outstanding </i> game!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.color = "red";

app.append(header);
