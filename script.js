let points = 0;
let power = 100;
let coins = 50;
let currentweapon = 0;
let fighting;
let demonhealth;
let inventory = ["knife"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const demonStats = document.querySelector("#demonStats");
const demonNameText = document.querySelector("#demonName");
const demonHealthText = document.querySelector("#demonHealth");
const pointText = document.querySelector("#pointText");
const powerText = document.querySelector("#powerText");
const coinsText = document.querySelector("#coinsText");
const text = document.querySelector("#text");

button1.onclick = goBuy;
button2.onclick = goCave;
button3.onclick = goFight;

const loc = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight           dragon"],
    "button functions": [goBuy, goCave, goFight],
    text: "You are in town square.U can see the store"
  },
  {
    name: "Store",
    "button text": ["Buy 10 Hps(10 coins)", "Buy weapon(30 coins)", "Go back to town"],
    "button functions": [buyhp, buywea, gotown],
    text: "Buy smtg or go back to twon"
  },
  {
    name: "Cave",
    "button text": ["Fight Boss1", "Fight Boss2", "Run away"],
    "button functions": [boss1, boss2, gotown],
    text: "Fight any1 or run away."
  },
  {
    name: "Demon",
    "button text": ["Attack", "Dodge", "Run away"],
    "button functions": [attack, dodge, gotown],
    text: "Choose your move."
  },
  {
    name: "win",
    "button text": ["Go back to town", "Go back to town", "Go         back to town"],
    "button functions": [gotown, gotown, gotown],
    text: "Demon dies.You win!!!"
  },
  {
    name: "lose",
    "button text": ["Replay??", "Replay??", "Replay??"],
    "button functions": [restart, restart, restart],
    text: "You are dead :("
  }

]

const weapon = [
  {
    name: "Bronze sword",
    powe: 10
  },
  {
    name: "Gold sword",
    powe: 20
  },
  {
    name: "Diamond sword",
    powe: 30
  }
]

const enemies = [
  {
    name: "Boss1",
    level: 2,
    health: 20
  },
  {
    name: "Boss2",
    level: 6,
    health: 40
  },
  {
    name: "Dragon",
    level: 10,
    health: 200
  }
]

function update(loci) {
  button1.innerText = loci["button text"][0]
  button2.innerText = loci["button text"][1]
  button3.innerText = loci["button text"][2]
  button1.onclick = loci["button functions"][0]
  button2.onclick = loci["button functions"][1]
  button3.onclick = loci["button functions"][2]
  text.innerText = loci.text
}

function goBuy() {
  update(loc[1])
}

function gotown() {
  update(loc[0])
}

function goCave() {
  update(loc[2])
}

function goFight() {
  dragon()
}

function buyhp() {
  if (coins >= 10) {
    if (power == 100) {
      text.innerText = "You already have max hp."
      return
    }
    coins -= 10
    power += 10
    powerText.innerText = power
    coinsText.innerText = coins
    text.innerText = "You just bought 10 hps with 10 coins."
  }
  else {
    text.innerText = "You do not own enuff coins."
  }
}

function buywea() {
  if (currentweapon < 3) {
    if (coins >= 30) {
      coins -= 30
      coinsText.innerText = coins
      //text.innerText="You just bought "+weapon[currentweapon].name
      inventory.push(weapon[currentweapon].name)
      text.innerText = "You just bought " + weapon[currentweapon].name + "\nYour inventory: " + inventory
      currentweapon++;

    }
    else
      text.innerText = "You do not own enuff coins."
  }
  else {
    text.innerText = "You have all the weapons, wanna sell for 15 coins?"
    button2.innerText = "Sell your weapon"
    button2.onclick = sellwea

  }
}
function sellwea() {
  if (inventory.length > 1) {
    coins += 15
    coinsText.innerText = coins
    let cw = inventory.shift()
    //text.innerText="You just sold your weapon: "+cw
    text.innerText = "You just sold your weapon: " + cw + "\nYour current status         of inventory: " + inventory

  }
  else
    text.innerText = "Please don't sell, you have only 1 weapon"
}
function boss1() {
  fight = 0
  startfight()
}
function boss2() {
  fight = 1
  startfight()
}
function dragon() {
  fight = 2
  startfight()
}
function startfight() {
  update(loc[3])
  demonhealth = enemies[fight].health
  demonStats.style.display = "block"
  demonNameText.innerText = enemies[fight].name
  demonHealthText.innerText = demonhealth
}
function attack() {
  text.innerText = "The demon " + enemies[fight].name + " attacks you!"
  text.innerText += "You attack it with your " + weapon[currentweapon].name
  demonHealthText.innerText = demonhealth
  power -= enemies[fight].level
  demonhealth -= weapon[currentweapon].powe //+ //Math.floor(Math.random * points) + 1;
  powerText.innerText = power
  demonHealthText.innerText = demonhealth
  if (power <= 0) {
    lose();
  }
  else if (demonhealth <= 0) {
    fight == 2 ? winGame() : defeatDemon();
  }

}
function dodge() {
  text.innerText = "You dodged the attack from " + enemies[fight].name + " ."
}

function winGame() {
  text.innerText = "You won the game :)"
}
function defeatDemon() {
  coins += Math.floor(enemies[fight].level * 7)
  points += enemies[fight].level
  coinsText.innerText = coins
  pointText.innerText = points
  update(loc[4])
}
function lose() {
  update(loc[5])
}

function restart() {
  points = 0;
  power = 100;
  coins = 50;
  currentweapon = 0;
  fighting;
  demonhealth;
  inventory = ["knife"];
  coinsText.innerText = coins
  pointText.innerText = points
  powerText.innerText = power
  demonStats.style.display = "none"
  gotown()
}

