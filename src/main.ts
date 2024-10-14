import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const header = document.createElement("h1");
header.innerHTML = "<i> Become the Rat King! </i>";
header.style.color = "red";

app.append(header);

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
    this.handleClick = this.handleClick.bind(this);
    this.create();
    this.update();
  }

  create() {
    this.button.innerHTML = this.text;
    this.button.style.fontSize = this.size;
    this.button.addEventListener("click", this.handleClick);
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

  handleClick() {
    // This was inspired by a AI Overview suggestion made by Google when I
    // searched "how to use addeventlistener in a class object"
    if (this.cost === 0) {
      counter++;
      count_display.innerHTML = "Rats recruited: " + counter + " 🪖🐀";
    } else if (counter >= this.cost) {
      counter -= this.cost;
      count_display.innerHTML = "Rats recruited: " + counter + " 🪖🐀";
      amount += this.increase;
    }
  }
}

let counter: number = 0;

const count_display = document.createElement("div");

let amount = 0;

// Automatic incrementer
let startTime = performance.now();
let endTime;
let elapsedTime = 0;
function timedIncrement() {
  endTime = performance.now();
  elapsedTime += endTime - startTime;
  if (elapsedTime >= 1000) {
    if (amount) {
      counter += amount;
    }
    counter++;
    elapsedTime -= 1000;
  }
  startTime = endTime;
  count_display.innerHTML = "Rats recruited: " + counter + " 🪖🐀";
  requestAnimationFrame(timedIncrement);
}
timedIncrement();

new Button('"Click to recruit me" - 🐀', "25px", 0, 0);

count_display.style.fontSize = "20px";
app.append(count_display);

new Button("Hire recruiter for 10 recruits", "20px", 10, 1);
