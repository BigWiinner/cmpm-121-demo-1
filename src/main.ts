import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const header = document.createElement("h1");
header.innerHTML = "<i> Become the Rat King! </i>";
header.style.color = "red";

app.append(header);

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Hire recruiters",
    cost: 10,
    rate: 0.1,
    description:
      "Recruiters call every household, raking in 1 draft every 10 seconds",
  },
  {
    name: "Make pro-rat propaganda",
    cost: 100,
    rate: 2,
    description: "More rats make for fewer problems! 2 drafts per second",
  },
  {
    name: "Make rat recruitment commercials",
    cost: 1000,
    rate: 50,
    description:
      "Every rat will prosper when you sign up today! 50 drafts per second",
  },
  {
    name: "Make a pro-rat news network",
    cost: 10000,
    rate: 2000,
    description:
      "Today's topic: how humans are destroying the world, and how rats are the ones to save it. 2000 drafts per second",
  },
  {
    name: "Become the rat president",
    cost: 1000000,
    rate: 40000,
    description: "Why is there no term limit? 40,000 rats per second",
  },
];

class Button {
  text: string;
  size: string;
  cost: number;
  increase: number;
  description: string;
  button: HTMLButtonElement;
  item_purchased: HTMLDivElement;
  amount_purchased: number;
  cost_message: HTMLDivElement;
  constructor(
    text: string,
    size: string,
    cost: number,
    increase: number,
    description: string
  ) {
    this.text = text;
    this.size = size;
    this.cost = cost;
    this.increase = increase;
    this.description = description;
    this.button = document.createElement("button");
    this.button.setAttribute("style", "border: 3px solid pink;");
    this.button.setAttribute("title", this.description);
    this.item_purchased = document.createElement("div");
    this.amount_purchased = 0;
    this.cost_message = document.createElement("div");
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
      this.cost_message.innerHTML = "Purchase for " + this.cost + " drafts";
      app.append(this.cost_message);
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
      this.button.innerHTML = "🐀";
      count_display.innerHTML =
        "Rat drafts: " + Math.round(counter * 10) / 10 + " 🪖🐀";
    } else if (counter >= this.cost) {
      counter = Math.round((counter - this.cost) * 10) / 10;
      count_display.innerHTML =
        "Rat drafts: " + Math.round(counter * 10) / 10 + " 🪖🐀";
      amount += Math.round(this.increase * 10) / 10;
      this.amount_purchased++;
      this.item_purchased.innerHTML =
        "Amount Purchased: " + this.amount_purchased;
      this.cost = Math.round(this.cost * 1.15 * 10) / 10;
      this.cost_message.innerHTML = "Purchase for " + this.cost + " drafts";
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
  count_display.innerHTML =
    "Rat drafts: " + Math.floor(counter * 10) / 10 + " 🪖🐀";
  current_rate.innerHTML =
    "Current growth rate: " + Math.round(amount * 10) / 10 + "/sec";
  requestAnimationFrame(timedIncrement);
}
timedIncrement();

new Button('"Click to recruit me" - 🐀', "35px", 0, 0, "");

count_display.style.fontSize = "20px";
app.append(count_display);

current_rate.innerHTML =
  "Current growth rate: " + Math.round(amount * 10) / 10 + "/sec";
current_rate.style.fontSize = "25px";
app.append(current_rate);

for (const i in availableItems) {
  console.log(availableItems[i]);
  new Button(
    availableItems[i].name,
    "20px",
    availableItems[i].cost,
    availableItems[i].rate,
    availableItems[i].description
  );
}
