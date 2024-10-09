import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "<i> Become the Rat King! </i>";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.color = "red";

app.append(header);

const button = '<button name="button">"Click to recruit me" - 🐀</button>';
const body = document.createElement("div");
body.innerHTML = button;
body.style.fontSize = "25px";

app.append(body);