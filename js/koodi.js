// Kysymykset
const kysymykset = [
  {
    kysymys: "Mikä on saamelaisten perinteinen elinkeino?",
    vaihtoehdot: ["Poronhoito", "Kalastus", "Maanviljely"],
    oikea: 0
  },
  {
    kysymys: "Mikä on saamelaisten perinteinen asu?",
    vaihtoehdot: ["Gákti", "Kimono", "Sari"],
    oikea: 0
  },
  {
    kysymys: "Missä saamelaiset pääosin asuvat?",
    vaihtoehdot: ["Lapissa", "Etelä-Suomessa", "Keski-Euroopassa"],
    oikea: 0
  },
  {
    kysymys: "Mikä on saamelaisten perinteinen laulutapa?",
    vaihtoehdot: ["Joiku", "Rap", "Ooppera"],
    oikea: 0
  },
  {
    kysymys: "Mikä eläin on tärkeä saamelaisille?",
    vaihtoehdot: ["Poro", "Leijona", "Elefantti"],
    oikea: 0
  },
  {
    kysymys: "Mikä on Sámi-kansan oma parlamentti Suomessa?",
    vaihtoehdot: ["Saamelaiskäräjät", "Eduskunta", "Kunnanhallitus"],
    oikea: 0
  },
  {
    kysymys: "Mikä väri EI kuulu usein saamenpukuun?",
    vaihtoehdot: ["Sininen", "Punainen", "Violetti"],
    oikea: 2
  },
  {
    kysymys: "Mikä on perinteinen asumus?",
    vaihtoehdot: ["Kota", "Kerrostalo", "Igloo"],
    oikea: 0
  },
  {
    kysymys: "Mikä juhla liittyy saamelaisiin?",
    vaihtoehdot: ["Saamelaisten kansallispäivä", "Joulu", "Vappu"],
    oikea: 0
  },
  {
    kysymys: "Mikä on saamelaisten kotiseutualue Suomessa?",
    vaihtoehdot: ["Pohjois-Lappi", "Helsinki", "Turku"],
    oikea: 0
  }
];

let indeksi = 0;
let pisteet = 0;
let elamat = 3;
let vastattu = false;

// 🔀 Sekoitusfunktio
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ❤️ Päivitä elämät
function paivitaHearts() {
  document.getElementById("hearts").textContent = "❤️".repeat(elamat);
}

// 📊 Progress bar
function paivitaProgress() {
  const prosentti = (indeksi / kysymykset.length) * 100;
  document.getElementById("progress-bar").style.width = prosentti + "%";
}

// 🎯 Näytä kysymys
function naytaKysymys() {
  const q = kysymykset[indeksi];
  vastattu = false;

  document.getElementById("kysymys").textContent = q.kysymys;

  const vastauksetDiv = document.getElementById("vastaukset");
  vastauksetDiv.innerHTML = "";

  // kopioidaan ja sekoitetaan vastaukset
  const vaihtoehdot = [...q.vaihtoehdot];
  shuffle(vaihtoehdot);

  vaihtoehdot.forEach((teksti) => {
    const btn = document.createElement("button");
    btn.textContent = teksti;

    btn.onclick = () => tarkista(btn, teksti, q);

    vastauksetDiv.appendChild(btn);
  });

  paivitaProgress();
}

// ✅ Tarkistus
function tarkista(btn, valintaTeksti, q) {
  if (vastattu) return;
  vastattu = true;

  const buttons = document.querySelectorAll("#vastaukset button");
  const oikeaTeksti = q.vaihtoehdot[q.oikea];

  buttons.forEach((b) => {
    b.disabled = true;

    if (b.textContent === oikeaTeksti) {
      b.classList.add("correct");
    }
  });

  if (valintaTeksti === oikeaTeksti) {
    pisteet++;
  } else {
    btn.classList.add("wrong");
    elamat--;
    paivitaHearts();

    if (elamat === 0) {
      document.querySelector(".game-container").innerHTML =
        "<h2>Peli ohi 😢</h2><p>Pisteet: " + pisteet +
        "</p><button onclick=\"window.location.href='index.html'\">Takaisin</button>";
    }
  }
}

// ▶️ Seuraava
function seuraava() {
  if (!vastattu) return;

  indeksi++;

  if (indeksi >= kysymykset.length) {
    document.querySelector(".game-container").innerHTML =
      "<h2>🎉 Voitit!</h2><p>Pisteet: " + pisteet +
      "</p><button onclick=\"window.location.href='index.html'\">Takaisin</button>";
    return;
  }

  naytaKysymys();
}

// 🚀 Käynnistys
window.onload = function () {
  shuffle(kysymykset); // kysymykset eri järjestyksessä joka kerta
  paivitaHearts();
  naytaKysymys();
};
