/*
    Hei.
    Dette er et oppgave sett i MM-912.
    Meningen er å trene på et fåtall ting av gangen. 
    Du gjør dette ved å skrive inn ditt svar etter at en oppgave er gitt (se på eksempelet)

    IKKE endre på kode som er gitt, med mindre oppgaven spesefikt sier at du skal det
*/

/*
    Oppgave: Eksempel
    Skriv koden for å skrive ut alle navnene i listen, et navn per linje
*/
console.log("Oppgave: Eksempel");
const people = ["Tony","Christian","Håkon"]

for(let index = 0; index < people.length; index++){
    let person = people[index];
    console.log(person);
}


/*
    Oppgave: A
    Skriv kode som skriver ut settningen "Debuging er som å være en dektektiv i et krim drama hvor du også er morderen" 
    100 ganger. 
    Husk vi bruker console.log() til å skrive ting ut.
*/
console.log("Oppgave: A");

const melding = "Debuging er som å være en dektektiv i et krim drama hvor du også er morderen \n ";
console.log("melding");
for (let index = 0; index <100; index++) {

    
}

/*
    Oppgave: B
    Følgende kode er feil, kan du fikse feilene?
    Denne er ikke helt enkel, det er syntax feil her og logiske feil.
    Prøv å tenke på hva vi prøver å oppnå.
*/
console.log("Oppgave: B");

const max = 99;
for (let index = 0; index < max; index++) {
  console.log(index + " flasker med brus i kassa");
  console.log(index + " flasker med brus i kassa");
if (index < 98){
  console.log(
    "Ta en ut, drikk den opp." + (index - 1) + " flasker med brus i kassa"
  );
  console.log("");
}

console.log("Ingen flere flasker med brus i kassa");



/*
    Oppgave: C
    Deklarere en variabel for tyngdekraft og en variabel for pi og en variabel for antall personer i et rom. 
*/
console.log("Oppgave: C");

let tyngdekraft = 9.81; // i fysikk er tyngdekraft g
const PI = 3.14; // Math.PI er mattebibliotek i jc
let antallPersonerIRommet= 11;


/*
    Oppgave: D
    Lag en funksjon som legger sammen to tall, funksjonen skal hete add
*/
console.log("Oppgave: D");

// lag funksjonen din her. 

function add (tall1,tall2){
let sum = tall1 + tall2;
return sum;
    //return tall1 + tall2;
    // return:kom deg ut av funksjonen


console.log("3 + 6 = " + add(3,6));
console.log("5673 + 234 = " + add(5673,234));

/*
    Oppgave: E
    Bruk variabelen people fra eksempelet og skriv navna ut i reversert rekke følge (bruk en løkke)
    NB du skal ikke endre på people, bare bruke det som den inneholder.
*/
console.log("Oppgave: E");

for (let index = people.length-1; index >= index--) {
    const person = people [index];
    console.log (person);

    
}

/*
    Oppgave: F
    Deklarere en variabel for en liste med telefon nummer. Listen din skal ha minst 3 nummer. 
*/
console.log("Oppgave: F");

const phoneNumbers = [113,112,110];


/*
    Oppgave: G
    Skriv ut bare det siste telefon numeret i listen din. 
*/

const lastNumber = phoneNumbers.length -1;
console.log (phoneNumbers[2]);
// [ betyr se inn i en liste

/*
    Oppgave: H
    Skriv ut kunn etternavnene for personene i listen, bruk en løkke.
*/

let personer = [["Christian", "Simonsen"], ["Tony", "Bergholtz"]];