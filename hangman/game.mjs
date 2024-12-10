//#region 
import * as readlinePromises from 'node:readline/promises';
import fs from "node:fs"
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });
//#endregion

import { HANGMAN_UI } from './graphics.mjs';
import { GREEN, RED, WHITE, RESET } from './colors.mjs';
import dictionary from './dictionary.mjs';
import splash from './splash.mjs';

let word = getRandomWord();
let guessedWord = createGuessList(word.length);
let wrongGuesses = [];
let isGameOver = false;

console.log (splash);
await rl.question ('press enter to continue');

console.clear();
console.log ('1.play');
console.log ('2.end game');

let menuChoice = await rl.question ('')
if (menuChoice == 2){
    process.exit(1);
}


do {

    updateUI();

    // Gjette en bokstav || ord.  (|| betyr eller).
    let guess = (await rl.question(dictionary.guessPrompt)).toLowerCase();

    if (isWordGuessed(word, guess)) {
        print(dictionary.winCelibration, GREEN);
        isGameOver = true;
    }
    else if (word.includes(guess)) {

        uppdateGuessedWord(guess);

        if (isWordGuessed(word, guessedWord)) {
            print("Hurra du gjettet ordet", GREEN);
            isGameOver = true;
        }
    } else {
        print(" DU TAR FEIL !!!!!!!", RED);
        wrongGuesses.push(guess);

        if (wrongGuesses.length >= HANGMAN_UI.length - 1) {
            isGameOver = true;
            print("Du har daua", RED);
        }

    }
updateUI()
    // Har du lyst å spille igjen?

    if(isGameOver){
        let answer = await rl.question ('do you want to play again?');
        if (answer == 'no'){

        } else{
            isGameOver = false
            word = getRandomWord();
guessedWord = createGuessList(word.length);
wrongGuesses = [];
        }
    
    }


} while (isGameOver == false)

process.exit();

function uppdateGuessedWord(guess) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] == guess) {
            guessedWord[i] = guess;
            // Banana og vi tipper a.
            // _ -> a
        }
    }
}

function createGuessList(length) {
    let output = [];
    for (let i = 0; i < length; i++) {
        output[i] = "_";
    }
    return output;
}

function isWordGuessed(correct, guess) {
    for (let i = 0; i < correct.length; i++) {
        if (correct[i] != guess[i]) {
            return false;
        }
    }

    return true;
}

function print(msg, color = WHITE) {
    console.log(color, msg, RESET);
}

function updateUI() {

    console.clear();
    print(guessedWord.join(""), GREEN);
    print(HANGMAN_UI[wrongGuesses.length]);
    if (wrongGuesses.length > 0) {
        print(dictionary.wrongGuesses + RED + wrongGuesses.join() + RESET);
    }
}

function getRandomWord() {

    const words = ["Kiwi", "Car", "Dog", "etwas"];
    let index = Math.floor(Math.random() * words.length);
    return words[index].toLowerCase();

}