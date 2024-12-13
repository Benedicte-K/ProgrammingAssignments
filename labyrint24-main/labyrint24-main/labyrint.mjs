//#region 



import * as readlinePromises from "node:readline/promises";
const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout
});

import ANSI from "./ANSI.mjs";
import KeyBoardManager from "./keyboardManager.mjs";
import "./prototypes.mjs"
import { level1 } from "./levels.mjs";
import splash from "./splashscreen";

setTimeout(splash, 3000);


const FPS = 250; 
let rawLevel = level1;


let tempLevel = rawLevel.split("\n");
let level = [];
for (let i = 0; i < tempLevel.length; i++) {
    let row = tempLevel[i];
    let outputRow = row.split("");
    level.push(outputRow);
}


let pallet = {
    "█": ANSI.COLOR.LIGHT_GRAY,
    "H": ANSI.COLOR.RED,
    "$": ANSI.COLOR.YELLOW,
    "B": ANSI.COLOR.GREEN
}


let isDirty = true; 
let playerPos = {
    row: null,
    col: null,
}


const EMPTY = " ";
const HERO = "H";
const LOOT = "$"
const THINGS = [LOOT, EMPTY];
const BAD_THINGS = ["B"];
const NPCs = [];
const POSSIBLE_PICKUPS = [
    { name: "Sword", attribute: "attack", value: 5 },
    { name: "Spear", attribute: "attack", value: 3 },
]

const HP_MAX = 10;
const MAX_ATTACK = 2;

const playerStats = { hp: HP_MAX, chash: 0, attack: 1.1 }

let eventText = ""; 
setTimeout(eventText, 7000);

let gl = setInterval(gameLoop, FPS)

function update() {

    if (playerPos.row == null) {

        
        for (let row = 0; row < level.length; row++) {
           
            for (let col = 0; col < level[row].length; col++) {


                let value = level[row][col];
                if (value == "H") { 
                    playerPos.row = row;
                    playerPos.col = col;

                } else if (BAD_THINGS.includes(value)) { 
                    let hp = Math.round(Math.random() * 6) + 4;
                    let attack = 0.7 + Math.random();
                    let badThing = { hp, attack, row, col };
                    NPCs.push(badThing);
                }
            }
        }
    }
}

    let drow = 0; 
    let dcol = 0; 
    
    if (KeyBoardManager.isUpPressed()) {
        drow = -1;
    } else if (KeyBoardManager.isDownPressed()) {
        drow = 1;
    }
    
    if (KeyBoardManager.isLeftPressed()) {
        dcol = -1;
    } else if (KeyBoardManager.isRightPressed()) {
        dcol = 1;
    }

    let tRow = playerPos.row + (1 * drow);
    let tcol = playerPos.col + (1 * dcol);

    if (THINGS.includes(level[tRow][tcol])) { 

        let currentItem = level[tRow][tcol];
        if (currentItem == LOOT) {

            if (Math.random() < 0.95) { 
                let loot = Number.randomBetween(3, 7);
                playerStats.chash += loot;
                eventText = `Player gained ${loot}$`;
            } else { 
                let item = POSSIBLE_PICKUPS.random();
                playerStats.attack += item.value;
                eventText = `Player found a ${item.name}, ${item.attribute} is changed by ${item.value}`;
        }

        level[playerPos.row][playerPos.col] = EMPTY;
        level[tRow][tcol] = HERO;

        playerPos.row = tRow;
        playerPos.col = tcol;
 
        isDirty = true;
    } else if (BAD_THINGS.includes(level[tRow][tcol])) { 
        let antagonist = null;
        for (let i = 0; i < NPCs.length; i++) {
            let b = NPCs[i];
            if (b.row = tRow && b.col == tcol) {
                antagonist = b;
            }
        }

        let attack = ((Math.random() * MAX_ATTACK) * playerStats.attack).toFixed(2);
        antagonist.hp -= attack; // 
        eventText = `Player dealt ${attack} points of damage`; 

        if (antagonist.hp <= 0) { 
            eventText += " and the bastard died" 
            level[tRow][tcol] = EMPTY; 
        } else {
            
            attack = ((Math.random() * MAX_ATTACK) * antagonist.attack).toFixed(2);
            playerStats.hp -= attack;
            eventText += `\nBastard deals ${attack} back`;
        }

        tRow = playerPos.row;
        tcol = playerPos.col;

        isDirty = true;
    }
}

function draw() {

    if (isDirty == false) {
        return;
    }
    isDirty = false;

    console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);

    let rendring = "";
    rendring += renderHUD();

   
    for (let row = 0; row < level.length; row++) {
        let rowRendering = "";
        for (let col = 0; col < level[row].length; col++) {
            let symbol = level[row][col];
            if (pallet[symbol] != undefined) {
                if (BAD_THINGS.includes(symbol)) {
                    // Kan endre tegning dersom vi vill.
                    rowRendering += pallet[symbol] + symbol + ANSI.COLOR_RESET;
                } else {
                    rowRendering += pallet[symbol] + symbol + ANSI.COLOR_RESET;
                }
            } else {
                rowRendering += symbol;
            }
        }
        rowRendering += "\n";
        rendring += rowRendering;
    }

    console.log(rendring);
    if (eventText != "") { 
        console.log(eventText);
        eventText = "";
    }
}

function renderHUD() {
    let hpBar = `[${ANSI.COLOR.RED + pad(Math.round(playerStats.hp), "❤️") + ANSI.COLOR_RESET}${ANSI.COLOR.BLUE + pad(HP_MAX - playerStats.hp, "❤️") + ANSI.COLOR_RESET}]`
    let cash = `$:${playerStats.chash}`;
    return `${hpBar} ${cash} \n`;
}

function pad(len, text) {
    let output = "";
    for (let i = 0; i < len; i++) {
        output += text;
    }
    return output;
}


function gameLoop() {
    update();
    draw();
}