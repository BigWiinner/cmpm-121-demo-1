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

let counter: number = 0;

const countDisplay = document.createElement("div");

const currentRate = document.createElement("div");

let amount = 0;

class Button {
  text: string;
  size: string;
  cost: number;
  increasePrice: number;
  description: string;
  button: HTMLButtonElement;
  itemPurchased: HTMLDivElement;
  amountPurchased: number;
  costMessage: HTMLDivElement;
  increaseFactor: number;
  constructor(
    text: string,
    size: string,
    cost: number,
    increasePrice: number,
    description: string
  ) {
    this.text = text;
    this.size = size;
    this.cost = cost;
    this.increasePrice = increasePrice;
    this.description = description;
    this.button = document.createElement("button");
    this.button.setAttribute("style", "border: 3px solid pink;");
    this.button.setAttribute("title", this.description);
    this.itemPurchased = document.createElement("div");
    this.amountPurchased = 0;
    this.costMessage = document.createElement("div");
    this.increaseFactor = 1.15;
    this.handleClick = this.handleClick.bind(this);
    this.create();
    this.update();
  }

  create(): void {
    this.button.innerHTML = this.text;
    this.button.style.fontSize = this.size;
    this.button.addEventListener("click", this.handleClick);
    app.append(this.button);
    if (this.cost !== 0) {
      this.costMessage.innerHTML = "Purchase for " + this.cost + " drafts";
      app.append(this.costMessage);
      this.itemPurchased.innerHTML =
        "Amount Purchased: " + this.amountPurchased;
      app.append(this.itemPurchased);
    }
  }

  update(): void {
    if (counter >= this.cost) {
      this.button.disabled = false;
    } else {
      this.button.disabled = true;
    }
    requestAnimationFrame(this.update.bind(this));
  }

  totalDrafts(counter: number): number {
    return Math.round(counter * 10) / 10;
  }

  recruitRat() {
    counter++;
    this.button.innerHTML = "🐀";
    countDisplay.innerHTML =
      "Rat drafts: " + this.totalDrafts(counter) + " 🪖🐀";
  }

  purchaseUpgrade() {
    counter = Math.round((counter - this.cost) * 10) / 10;
    countDisplay.innerHTML =
      "Rat drafts: " + this.totalDrafts(counter) + " 🪖🐀";
    amount += Math.round(this.increasePrice * 10) / 10;
    this.amountPurchased++;
    this.itemPurchased.innerHTML = "Amount Purchased: " + this.amountPurchased;
    this.cost = Math.round(this.cost * this.increaseFactor * 10) / 10;
    this.costMessage.innerHTML = "Purchase for " + this.cost + " drafts";
  }

  handleClick(): void {
    // This was inspired by a AI Overview suggestion made by Google when I
    // searched "how to use addeventlistener in a class object"
    if (this.cost === 0) {
      this.recruitRat();
    } else if (counter >= this.cost) {
      this.purchaseUpgrade();
    }
  }
}

// Automatic incrementer
let startTime = performance.now();
let endTime;
let elapsedTime = 0;
const oneSecond = 1000;
function timedIncrement() {
  endTime = performance.now();
  elapsedTime += endTime - startTime;
  if (elapsedTime >= oneSecond) {
    if (amount) {
      counter = Math.round((counter + amount) * 10) / 10;
    }
    elapsedTime -= oneSecond;
  }
  startTime = endTime;
  countDisplay.innerHTML =
    "Rat drafts: " + Math.floor(counter * 10) / 10 + " 🪖🐀";
  currentRate.innerHTML =
    "Current growth rate: " + Math.round(amount * 10) / 10 + "/sec";
  requestAnimationFrame(timedIncrement);
}
timedIncrement();

new Button('"Click to recruit me" - 🐀', "35px", 0, 0, "");

countDisplay.style.fontSize = "20px";
app.append(countDisplay);

currentRate.innerHTML =
  "Current growth rate: " + Math.round(amount * 10) / 10 + "/sec";
currentRate.style.fontSize = "25px";
app.append(currentRate);

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
