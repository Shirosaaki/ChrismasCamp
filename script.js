let NbCadeaux = 0;

// Fonction pour créer un cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Durée en jours
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Fonction pour lire un cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name + "=") === 0) {
            return c.substring(name.length + 1);
        }
    }
    return null;
}

document.getElementById("BoutonPereNoel").addEventListener("click", function() {
    NbCadeaux++;
    if (NbCadeaux == 10) {
        window.alert("Bravo, continu comme ça!");
    }
    document.getElementById("NbCadeaux").textContent = NbCadeaux;
});

let CoutMachineMagique = 50;
let NbMachineMagique = 0;

document.getElementById("MachineMagique").addEventListener("click", function() {
    if (NbCadeaux >= CoutMachineMagique) {
        NbCadeaux -= CoutMachineMagique;
        NbMachineMagique++;
    }
});

function updateGifts() {
    // Production par machine magique
    NbCadeaux += NbMachineMagique;
    // Sauvegarder le nombre de cadeaux dans un cookie
    setCookie("NbCadeaux", NbCadeaux.toString(), 7); // Durée : 7 jours
    setCookie("NbMachineMagique", NbMachineMagique.toString(), 7); // Durée : 7 jours
    //met a jour l'affichage
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("NbCadeaux").textContent = NbCadeaux;
    document.getElementById("NbMachineMagique").textContent = NbMachineMagique;
}

function updateNoel() {
    let date = new Date();
    let noel = new Date(date.getFullYear(), 11, 25);
    document.getElementById("nbAvantNoel").textContent = Math.ceil((noel - date) / (1000 * 60 * 60 * 24));
}

setInterval(updateGifts, 1000);
setInterval(updateNoel, 1000);

window.onload = function() {
    const savedGiftCount = getCookie("NbCadeaux");
    const savedMachineCount = getCookie("NbMachineMagique");
    if (savedGiftCount) {
        NbCadeaux = parseInt(savedGiftCount, 10);
        document.getElementById("NbCadeaux").textContent = NbCadeaux
    }
    if (savedMachineCount) {
        NbMachineMagique = parseInt(savedMachineCount, 10);
        document.getElementById("NbMachineMagique").textContent = NbMachineMagique
    }
}