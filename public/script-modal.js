// Importerer funktionerne getData og createPip fra api.js
import { getData, createPip } from "./api.js";

// Henter de første pips fra serveren (offset 0 = de nyeste pips)
const result = await getData(0);

// Gemmer arrayet med pips-data
const pips = result.data;

// Gemmer næste offset-værdi (bruges til at hente flere pips senere)
let offset = result.pagination.next_offset;

// Udskriver de hentede pips i konsollen (til fejlsøgning)
console.log(pips);

// Erstatter alle <i data-feather="..."></i> med SVG-ikoner fra Feather Icons
feather.replace();

//---------------------------------Modal-afsnit----------------------------------------

// Henter modal-elementet
const modal = document.getElementById("myModal");

// Henter knappen som åbner modal-vinduet
const btn = document.getElementById("myBtn");

// Henter <span>-elementet (X) der lukker modal-vinduet
const span = document.getElementsByClassName("close")[0];


// Når brugeren klikker på knappen → vis modal-vinduet
btn.onclick = function () {
  modal.style.display = "flex"; // viser modal og centrerer indholdet
}

// Når brugeren klikker på <span> (X) → luk modal-vinduet
span.onclick = function () {
  modal.style.display = "none"; // skjuler modal igen
}

// Når brugeren klikker udenfor modal-indholdet → luk modal-vinduet
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // skjuler modal
  }
}


//----------------------------Pipformular-afsnit----------------------------------------

// Lytter efter når pip-formularen bliver sendt
document.getElementById("pip-form").addEventListener("submit", (event) => {
  // Stopper standard-handlingen (som ellers ville reloade siden)
  event.preventDefault();

  // Henter værdier fra inputfelterne
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  // Tjekker om der mangler brugernavn
  if (username === "") {
    alert("Du skal indtaste et navn");
  }
  // Tjekker om der mangler besked
  else if (message === "") {
    alert("Du skal indtaste en besked");
  }
  // Hvis begge felter er udfyldt
  else {
    // Sender pip’et til backend/database
    createPip(username, message);

    // Tilføjer pip’et til DOM’en (så brugeren ser det med det samme)
    addPipToDOM(username, message);

    // Lukker modal-vinduet
    modal.style.display = "none";

    // Rydder inputfelterne efter indsendelse
    document.getElementById("username").value = "";
    document.getElementById("message").value = "";
  }
});



//----------------------------Tæller og længdebegrønsning-afsnit----------------------------------------

// Der må maksimalt blive indtastet 250 karakterer i Pip-besked feltet, og der skal laves en tæller, så brugeren kan følge med i hvor mange de indtil videre har tastet.

// Maksimalt antal tegn i beskedfeltet
const maxLength = 250;

// Lytter efter hver gang brugeren skriver i beskedfeltet
document.getElementById("message").addEventListener("input", (e) => {
  const value = e.target.value; // det nuværende indhold i feltet

  // Hvis der bliver skrevet flere tegn end maxLength
  if (value.length > maxLength) {
    alert(`Maksimalt ${maxLength} tegn er tilladt`);
    // Afkorter værdien til maxLength (forhindrer overskridelse)
    document.getElementById("message").value = value.substr(0, maxLength);
  }

  // Opdaterer tælleren så brugeren kan se hvor mange tegn der er tilbage
  const remaining = maxLength - document.getElementById("message").value.length;
  document.getElementById("charCount").innerText = remaining;
});



//----------------------------------Tilføj pip til DOM (viser pip på siden)-----------------------------------------

// Funktionen tager brugerens data, kloner en skjult HTML-template og indsætter den som et færdigt pip i feedet.

function addPipToDOM(username, message) {
  // Finder det skjulte <template> i HTML med pip-layoutet.
  let pipTemplate = document.getElementById("pip");

  // Laver en fuld kopi af pip’et (true = kopier også børn og indhold – altså brugernavn - message og avatar).
  let clon = pipTemplate.content.cloneNode(true);

  // Indsætter brugernavn og besked i den nye pip - altså det brugeren taster ind.
  clon.querySelector(".username").innerText = username;
  clon.querySelector(".message").innerText = message;

  // Genererer en standard-avatar fra Dicebear baseret på brugernavnet
  //Sætter billedets src til Dicebear. encodeURIComponent sikrer korrekt URL
  //Dicebear bruger brugernavn som "seed" giver samme avatar til samme brugernavn. 
  clon.querySelector(".avatar").src =
    "https://api.dicebear.com/9.x/adventurer/svg?seed=" + encodeURIComponent(username); 

  // Tilføjer det nye pip øverst i <div id="pips"> (så det vises først)
  document.getElementById("pips").prepend(clon); 
}


// Looper igennem alle hentede pips fra serveren
// og indsætter dem i DOM’en ét for ét
pips.forEach((pip) => {
  // Kalder funktionen der tilføjer hvert pip til DOM’en
  addPipToDOM(pip.username, pip.message);
});



//-------------- hent flere pips (lazy loding)
// Front-end til lazy loading/bæredygtighed - vi vil kun have vist de 5 seneste pips på vores hjemmeside med en knap til at hente flere pips - dette skal være sammenkoblet til vores backend og DB


// Lytter efter klik på knappen "Hent flere pips"
document.getElementById("hentFlerePips").addEventListener("click", async () => {

  // Henter de næste pips fra serveren med nuværende offset
  const aktivePips = await getData(offset);

  // Udskriv de hentede pips i konsollen til fejlsøgning
  console.log(aktivePips);

  // Opdater offset til næste sæt pips (bruges næste gang knappen klikkes)
  offset = aktivePips.pagination.next_offset;

  // Tilføjer de nye pips til DOM’en (øverst med prepend)
  aktivePips.data.forEach((pip) => {
    addPipToDOM(pip.username, pip.message);
  });
});

