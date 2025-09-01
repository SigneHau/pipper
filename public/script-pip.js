//laver javascript til mine pips

//js object
const pip1 = {
     username: 'Signe',
     message: 'Mit budskab er ..........',
     created_ad: 'd. 28/3-2025',
     picture: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jude&flip=true&scale=110&backgroundColor[]"

}

const pip2 = {
     username: 'Mette',
     message: 'Jeg er ikke enig ..........',
     created_ad: 'd. 28/9-2025',
     picture: "https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana&flip=true"
}

const pip3 = {
     username: 'Jacob',
     message: 'Nu skal jeg ikke sige mere ..........',
     created_ad: 'd. 7/12-2024',
     picture: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryan&flip=true&scale=130&radius=40"
}

const pip4 = {
     username: 'Ole',
     message: 'Jeg er snart på vej ..........',
     created_ad: 'd. 17/10-2024',
     picture: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryan&flip=true&scale=130&radius=40"
}

// js laver et array med navnet pips der indeholder objekterne ovenover. 
const pips = [pip1, pip2, pip3, pip4];
console.log(pips)

pips.forEach((pip) => {
     // html template som hedder pip, som definerer et pip i html
     let pipHtml = document.getElementById("pip")
     console.log(pipHtml);


     // oprette en kopi fordi jeg skal have templates indhold pr pip
     let clon = pipHtml.content.cloneNode(true);
     //console.log(clon);

     //udvælger bruger, besked og tidspunkt
     let pAvatar = clon.querySelector(".avatar");
     let pUsername = clon.querySelector(".username");
     let pMessage = clon.querySelector(".message");
     let pCreated_ad = clon.querySelector(".created_ad");


     
     
     // Billedet fra URL sættes direkte her:
     pAvatar.src = pip.picture;

    //Sætter jeg pippenes værdier ind i den klon af templaten
     pUsername.innerText = pip.username;
     pMessage.innerText = pip.message;
     pCreated_ad.innerText = pip.created_ad;


     //indsætter vi templaten i html dokumentet (så brugeren kan se den)

     document.getElementById("pips").appendChild(clon);


})