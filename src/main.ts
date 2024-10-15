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
  item_purchased: HTMLSpanElement;
  amount_purchased: number;
  constructor(text: string, size: string, cost: number, increase: number) {
    this.text = text;
    this.size = size;
    this.cost = cost;
    this.increase = increase;
    this.button = document.createElement("button");
    this.button.setAttribute("style", "border: 3px solid pink;");
    this.item_purchased = document.createElement("div");
    this.amount_purchased = 0;
    this.handleClick = this.handleClick.bind(this);
    this.create();
    this.update();
  }

  create() {
    this.button.innerHTML = this.text;
    this.button.style.fontSize = this.size;
    this.button.addEventListener("click", this.handleClick);
    app.append(this.button);
    if (this.cost !== 0) {
      this.item_purchased.innerHTML =
        "Amount Purchased: " + this.amount_purchased;
      app.append(this.item_purchased);
    }
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
      count_display.innerHTML =
        "Rats recruited: " + Math.floor(counter) + " 🪖🐀";
    } else if (counter >= this.cost) {
      counter = Math.round((counter - this.cost) * 10) / 10;
      count_display.innerHTML =
        "Rats recruited: " + Math.floor(counter) + " 🪖🐀";
      amount += Math.round(this.increase * 10) / 10;
      this.amount_purchased++;
      if (this.cost !== 0) {
        this.item_purchased.innerHTML =
          "Amount Purchased: " + this.amount_purchased;
      }
    }
  }
}

let counter: number = 0;

const count_display = document.createElement("div");

const current_rate = document.createElement("div");

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
      counter = Math.round((counter + amount) * 10) / 10;
    }
    elapsedTime -= 1000;
  }
  startTime = endTime;
  count_display.innerHTML = "Rats recruited: " + Math.floor(counter) + " 🪖🐀";
  current_rate.innerHTML =
    "Current growth rate: " + Math.round(amount * 10) / 10 + "/sec";
  requestAnimationFrame(timedIncrement);
}
timedIncrement();

new Button('"Click to recruit me" - 🐀', "25px", 0, 0);

count_display.style.fontSize = "20px";
app.append(count_display);

current_rate.innerHTML =
  "Current growth rate: " + Math.round(amount * 10) / 10 + "/sec";
app.append(current_rate);

new Button("Hire recruiter for 10 recruits", "20px", 10, 0.1);
new Button("Pro-rat posters for 100 recruits", "20px", 100, 2);
new Button("Rat recruitment commercials for 1000 recruits", "20px", 1000, 50);
