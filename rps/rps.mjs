//#region 
import * as readlinePromises from 'node:readline/promises';
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });
//#endregion

import { print } from './lib/output.mjs';
import { ANSI } from './lib/ansi.mjs';
import { getRandomItemFromArray } from './lib/random.mjs';
//import language from './dictionary.mjs';
import TITLE from './titlescreen.mjs';
import GAME_DICTIONARY from './dictionary.mjs';

const CHOICES = { rock: 1, paper: 2, scissors: 3 };
const LIST_OF_CHOICES = [CHOICES.rock, CHOICES.paper, CHOICES.scissors];

let language = GAME_DICTIONARY;
//har ikke laget norsk og engelsk dictionary, så min language er en "const" enda


print(ANSI.CLEAR_SCREEN);
print(ANSI.CURSOR_HOME);
print(TITLE, ANSI.COLOR.GREEN);

setTimeout(playGame, 3000);



// print (ANSI.CLEAR_SCREEN)


async function playGame(){

    print(language.title, ANSI.COLOR.RED);


let player = await askForPlayerChoice();
let npc = makeAIChoice();

print(`${language.youPicked} ${getDesc(player)} ${language.aiPicked} ${getDesc(npc)}`);
print(language.winner + evaluateWinner(player, npc));

let answer = await rl.question(language.playAgain);


if (answer.includes(language.confirm)){
    playGame();
} else {
    process.exit();
}
    

}
// ---- Game functions etc..

function evaluateWinner(p1Ch, p2Ch) {
    // Vi går ut i fra at spiller 2 vinner :)
    let result = language.player2;

    // Men vi må sjekke om noe annet skjedde.
    if (p1Ch == p2Ch) {
        result = language.draw;
    } else if (p1Ch == CHOICES.rock) {
        if (p2Ch == CHOICES.scissors) {
            result = language.player1;
        }
    } else if (p1Ch == CHOICES.paper) {
        if (p2Ch == CHOICES.rock) {
            result = language.player1;
        }
    } else if (p1Ch == CHOICES.scissors) {
        if (p2Ch == CHOICES.paper) {
            result = language.player1;
        }
    }

    return result;
}

function makeAIChoice() {
    return getRandomItemFromArray(LIST_OF_CHOICES);
}

function getDesc(choice) {
    return language.choices[choice - 1]
}

async function askForPlayerChoice() {

    let choice = null;

    do {
        print(language.selectionQuestion);
        let rawChocie = await rl.question("");
        rawChocie = rawChocie.toUpperCase();
        choice = evaluatePlayerChoice(rawChocie);
    } while (choice == null)

    return choice;
}

async function askPlayer(question) {

    let choice = null;

    do {
        let rawChocie = await rl.question("");
        choice = rawChocie.toUpperCase();
    } while (choice == null || choice == "")


    return choice;
}
function evaluatePlayerChoice(rawChocie) {
    let choice = null;

    if (rawChocie == language.rock) {
        choice = CHOICES.rock;
    } else if (rawChocie == language.paper) {
        choice = CHOICES.paper;
    } else if (rawChocie == language.scissors) {
        choice = CHOICES.scissors;
    }
    return choice;
}




//process.exit()
