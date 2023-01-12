var filmovi = [
  {
    naziv: "The Shawshank Redemption",
    godina: 1994,
    drzava: "SAD",
    napomena: "",
    glumci: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    odgledan: false,
  },
  {
    naziv: "The Godfather",
    godina: 1972,
    drzava: "SAD",
    napomena: "",
    glumci: ["Marlon Brando", "Al Pacino", "James Caan"],
    odgledan: false,
  },
  {
    naziv: "The Dark Knight",
    godina: 2008,
    drzava: "SAD",
    napomena: "",
    glumci: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    odgledan: false,
  },
  {
    naziv: "Hunter x Hunter",
    godina: 2011,
    drzava: "Japan",
    napomena: "",
    glumci: ["Gon Freecss", "Feitan", "Leorio"],
    odgledan: false,
  },
];

// Funkcija za ispis filmova u tabelu
function ispisiFilmove() {
  var filmoviTabela = document.getElementById("filmovi-tabela");
  filmoviTabela.innerHTML = "";
  for (var i = 0; i < filmovi.length; i++) {
    var film = filmovi[i];
    var red = document.createElement("tr");
    if (film.odgledan) {
      red.classList.add("odgledan");
    }
    var checkboxKolona = document.createElement("td");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = film.odgledan;
    checkboxKolona.appendChild(checkbox);
    red.appendChild(checkboxKolona);
    var nazivKolona = document.createElement("td");
    nazivKolona.innerText = film.naziv;
    red.appendChild(nazivKolona);
    var godinaKolona = document.createElement("td");
    godinaKolona.innerText = film.godina;
    red.appendChild(godinaKolona);
    var drzavaKolona = document.createElement("td");
    drzavaKolona.innerText = film.drzava;
    red.appendChild(drzavaKolona);
    var napomenaKolona = document.createElement("td");
    napomenaKolona.innerText = film.napomena;
    red.appendChild(napomenaKolona);
    var glumciKolona = document.createElement("td");
    glumciKolona.innerText = film.glumci.join(", ");
    red.appendChild(glumciKolona);
    filmoviTabela.appendChild(red);
  }
}

const promeniBojuReda = (red, odgledan) => {
  if (odgledan) {
    red.style.backgroundColor = "#D1E7DD";
  } else {
    red.style.backgroundColor = "#F8D7DA";
  }
};
// Ispisi filmova u tabelu prilikom učitavanja stranice
ispisiFilmove();

// Funkcija za validaciju forme za dodavanje filma
function validirajFilm() {
  var naziv = document.getElementById("naziv").value;
  var godina = document.getElementById("godina").value;
  var glumci = document.getElementById("glumci").value;
  var greske = [];
  if (!naziv) {
    greske.push("Naziv je obavezno polje");
  }
  if (!godina || godina < 1930 || godina > 2021) {
    greske.push("Godina mora biti između 1930 i 2021");
  }
  if (!glumci) {
    greske.push("Glumci su obavezno polje");
  }
  return greske;
}

// Funkcija za dodavanje filma
function dodajFilm() {
  var greske = validirajFilm();
  if (greske.length > 0) {
    alert(greske.join("\n"));
    return;
  }
  var naziv = document.getElementById("naziv").value;
  var godina = document.getElementById("godina").value;
  var drzava = document.getElementById("drzava").value;
  var napomena = document.getElementById("napomena").value;
  var glumci = document.getElementById("glumci").value.split(",");
  var film = {
    naziv: naziv,
    godina: parseInt(godina),
    drzava: drzava,
    napomena: napomena,
    glumci: glumci,
    odgledan: false,
  };
  filmovi.push(film);
  ispisiFilmove();
  $("#dodaj-film-modal").modal("hide");
}
$("#dodaj-film-modal").on("hidden.bs.modal", function () {
  document
    .getElementById("dodaj-film-dugme")
    .removeEventListener("click", dodajFilm);
});

// Dodavanje listenera pri svakom prikazivanju modala
$("#dodaj-film-modal").on("show.bs.modal", function () {
  document
    .getElementById("dodaj-film-dugme")
    .addEventListener("click", dodajFilm);
});

function promjeniPozadinu(e) {
  var checkbox = e.target;
  var red = checkbox.parentNode.parentNode;
  red.classList.toggle("odgledan");
  var index = Array.prototype.indexOf.call(red.parentNode.childNodes, red);
  filmovi[index].odgledan = checkbox.checked;
}

// Dodajemo listener na svaki checkbox koji se pojavi u tabeli
var filmoviTabela = document.getElementById("filmovi-tabela");
filmoviTabela.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    promjeniPozadinu(e);
  }
});

// Funkcija za dodavanje filma
function dodajFilm() {
  var greske = validirajFormu();
  if (greske.length > 0) {
    // Prikaz gresaka
    return;
  }

  var naziv = document.getElementById("naziv").value;
  var godina = document.getElementById("godina").value;
  var drzava = document.getElementById("drzava").value;
  var napomena = document.getElementById("napomena").value;
  var glumci = document.getElementById("glumci").value.split(",");

  // Dodavanje filma u niz
  var noviFilm = {
    odgledan: false,
    naziv: naziv,
    godina: godina,
    drzava: drzava,
    napomena: napomena,
    glumci: glumci,
  };
  filmovi.push(noviFilm);

  // Prikaz novog filma u tabeli
  var filmoviTabela = document.getElementById("filmovi-tabela");
  var red = filmoviTabela.insertRow();
  var checkboxKolona = red.insertCell();
  var nazivKolona = red.insertCell();
  var godinaKolona = red.insertCell();
  var drzavaKolona = red.insertCell();
  var napomenaKolona = red.insertCell();
  var glumciKolona = red.insertCell();

  checkboxKolona.innerHTML = "<input type='checkbox'";
  nazivKolona.innerHTML = noviFilm.naziv;
  godinaKolona.innerHTML = noviFilm.godina;
  drzavaKolona.innerHTML = noviFilm.drzava;
  napomenaKolona.innerHTML = noviFilm.napomena;
  glumciKolona.innerHTML = noviFilm.glumci.join(", ");
  var checkbox = checkboxKolona.querySelector("input");
  checkbox.addEventListener("change", function () {
    red.classList.toggle("odgledan");
  });
  // Zatvaranje modala
  $("#dodaj-film-modal").modal("hide");

  // Resetovanje forme
  var form = document.querySelector("#dodaj-film-modal form");
  form.reset();
}
document
  .getElementById("dodaj-film-dugme")
  .addEventListener("click", dodajFilm);

//DODAVANJE FILMA 2 pokusaj

function dodajFilm() {
  var naziv = document.getElementById("naziv").value;
  var godina = document.getElementById("godina").value;
  var drzava = document.getElementById("drzava").value;
  var napomena = document.getElementById("napomena").value;
  var glumci = document.getElementById("glumci").value.split(",");

  // Validacija polja
  if (naziv.trim() === "") {
    alert("Unesite naziv filma");
    return;
  }

  if (godina < 1930 || godina > 2021) {
    alert("Unesite validnu godinu filma između 1930 i 2021");
    return;
  }

  if (glumci.length < 1) {
    alert("Unesite bar jednog glumca");
    return;
  }

  // Prikaz novog filma u tabeli
  var filmoviTabela = document.getElementById("filmovi-tabela");
  var red = filmoviTabela.insertRow();
  // var checkboxKolona = red.insertCell();
  var nazivKolona = red.insertCell();
  var godinaKolona = red.insertCell();
  var drzavaKolona = red.insertCell();
  var napomenaKolona = red.insertCell();
  var glumciKolona = red.insertCell();

  // checkboxKolona.innerHTML = "<input type='checkbox'";
  nazivKolona.innerHTML = noviFilm.naziv;
  godinaKolona.innerHTML = noviFilm.godina;
  drzavaKolona.innerHTML = noviFilm.drzava;
  napomenaKolona.innerHTML = noviFilm.napomena;
  glumciKolona.innerHTML = noviFilm.glumci.join(", ");
  var checkbox = checkboxKolona.querySelector("input");
  checkbox.addEventListener("change", function () {
    red.classList.toggle("odgledan");
  });
  // Zatvaranje modala
  $("#dodaj-film-modal").modal("hide");

  // Resetovanje forme
  var form = document.querySelector("#dodaj-film-modal ");
  form.reset();
}

document
  .getElementById("dodaj-film-dugme")
  .addEventListener("click", function () {
    document.getElementById("sacuvaj-film-dugme").onclick = dodajFilm;
  });

