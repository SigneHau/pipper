// Vi import funktionen getdata fra api.js og laver en funktion så vi får vores beskeder ud
import { getData, createPip } from "./api.js";

const pips = await getData(); // her kalder jeg php serveren gennem funktionen fra api.js filen.
console.log(pips);


// Erstatter alle <i data-feather="..."></i> med SVG-ikoner fra Feather Icons - altså vores billede af avertaren
feather.replace();


// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex"; // viser og centrerer
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none"; // skjuler igen
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//Fubktion til når pip-beskeden bliver submittet

document.getElementById("pip-form").addEventListener("submit", (event) => {
  event.preventDefault() // stopper standard opførslen, hvor browseren reloader siden

  const username = document.getElementById("username").value
  const message = document.getElementById("message").value

  //console.log(username, message);

  if (username === "") {
    alert("Der mangler et navn")
  }
  else if (message === "") {
    alert("Der mangler din besked")
  }

  else {
    createPip(username, message);
  }

  addPipToDOM(username, message)


  //console.log(event.target["username"].value);
  // Luk modal
  modal.style.display = "none";

  // Ryd formular felterne
  document.getElementById("username").value = "";
  document.getElementById("message").value = "";

})

// Der må maksimalt blive indtastet 255 karakterer i Pip-besked feltet, og der skal laves en tæller, så brugeren kan følge med i hvor mange de indtil videre har tastet.

// //Hent HTML-elementer og gemmer i en variabel og definer maks-længde
// const messageElement = document.getElementById('message');
// const charCountElement = document.getElementById('charCount');
// const maxLength = 250;

// // Opdater tælleren med det samme
// charCountElement.textContent = maxLength;

// //Lyt efter input
// messageElement.addEventListener('input', () => {

//   //Beregn og opdater
//   const remainingChars = maxLength - messageElement.value.length;
//   charCountElement.textContent = remainingChars;
// })

// frontend validering af besked længde
document.getElementById("message").addEventListener("input", (e) => {
  const value = e.target.value;
  // console.log(value);
  document.getElementById("charCount").innerText = value.length;

  // console.log(value.length);
  if (value.length > 250) {
    alert("Max 250 tegn")
    document.getElementById("message").value = value.substr(0, 250);
  }
})



function addPipToDOM(username, message) {
  let pipHtml = document.getElementById("pip");
  //console.log(username, message);

  // opretter en kopi fordi jeg skal have en templates indhold per pip
  let clon = pipHtml.content.cloneNode(true);
  // console.log(clon);

  // console.log(clon.querySelector(".username"));

  // Sætter jeg pips værdier ind i klonen af templaten
  clon.querySelector(".username").innerText = username;
  clon.querySelector(".message").innerText = message;

  // Sæt en standard Dicebear avatar
  clon.querySelector(".avatar").src = "https://api.dicebear.com/9.x/adventurer/svg?seed=" + encodeURIComponent(username);


  // indsætter vi templaten i html dokumentet (så brugeren kan se den)
  document.getElementById("pips").appendChild(clon);
}

