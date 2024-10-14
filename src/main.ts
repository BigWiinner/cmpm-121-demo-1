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
  count_display.innerHTML = "Rats recruited: " + counter + " 🪖🐀";
}

// Automatic incrementer
let startTime = performance.now();
let endTime;
let elapsedTime = 0;
function timedIncrement() {
  endTime = performance.now();
  elapsedTime += endTime - startTime;
  if (elapsedTime >= 1000) {
    if (amount) {
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

body.addEventListener("click", function () {
  increment(false);
});
count_display.style.fontSize = "20px";
app.append(count_display);

class Button {
  text: string;
  size: string;
  cost: number;
  increase: number;
  button: HTMLButtonElement;
  constructor(text: string, size: string, cost: number, increase: number) {
    this.text = text;
    this.size = size;
    this.cost = cost;
    this.increase = increase;
    this.button = document.createElement("button");
    this.create();
    this.update();
  }

  create() {
    this.button.innerHTML = this.text;
    this.button.style.fontSize = this.size;
    const cost: number = this.cost;
    const increase: number = this.increase;
    this.button.addEventListener("click", function () {
      if (counter >= cost) {
        counter -= cost;
        count_display.innerHTML = "Rats recruited: " + counter + " 🪖🐀";
        amount += increase;
      }
    });
    app.append(this.button);
  }

  update() {
    if (counter >= this.cost) {
      this.button.disabled = false;
    } else {
      this.button.disabled = true;
    }
    requestAnimationFrame(this.update.bind(this));
  }
}

new Button("Hire recruiter for 10 recruits", "25", 10, 1);
