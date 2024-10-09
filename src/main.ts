import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "<i> Become the Rat King! </i>";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.color = "red";

app.append(header);

let counter: number = 0;

const button = '<button name="button">"Click to recruit me" - 🐀</button>';
const body = document.createElement("div");
const count_display = document.createElement("div");

function increment() {
  counter++;
  count_display.innerHTML =
    '<button name="button">Rats recruited: ' + counter + " 🪖🐀</button>";
}

// Automatic incrementer
let startTime = performance.now();
let endTime;
let elapsedTime = 0;
function timedIncrement() {
  endTime = performance.now();
  elapsedTime += endTime - startTime;
  if (elapsedTime >= 1000) {
    increment();
    elapsedTime -= 1000;
  }
  startTime = endTime;
  requestAnimationFrame(timedIncrement);
}
timedIncrement();

body.innerHTML = button;
body.style.fontSize = "25px";
app.append(body);

body.addEventListener("click", increment);
count_display.style.fontSize = "20px";
app.append(count_display);
