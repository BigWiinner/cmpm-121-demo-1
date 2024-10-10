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

let amount = 0;
function increment(timed: boolean) {
  if (timed) {
    counter += amount;
  } else {
    counter++;
  }
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
    if(amount){
      increment(true);
    }
    increment(false);
    elapsedTime -= 1000;
  }
  startTime = endTime;
  requestAnimationFrame(timedIncrement);
}
timedIncrement();

body.innerHTML = button;
body.style.fontSize = "25px";
app.append(body);

body.addEventListener("click", function() {
  increment(false);
});
count_display.style.fontSize = "20px";
app.append(count_display);

const allowUpgrageCheckbox = document.createElement("button");
allowUpgrageCheckbox.innerHTML = 'Hire recruiter for 10 recruits';

function update() {
  if (counter >= 10) {
    allowUpgrageCheckbox.disabled = false;
  } else {
    allowUpgrageCheckbox.disabled = true;
  }
  requestAnimationFrame(update);
}
update();

allowUpgrageCheckbox.addEventListener("click", function() {
  if (counter >= 10) {
    counter -= 10;
    //rate++;
    amount++;
  }
});

app.append(allowUpgrageCheckbox);
