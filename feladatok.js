// ============================================================
// DOLGOZAT – Feladatkezelő Alkalmazás
// ============================================================

// ------------------------------------------------------------
// 1. FELADAT – Alap adatstruktúra (10 pont)
// ------------------------------------------------------------
// Hozz létre egy "alkalmazas" nevű objektumot az alábbi kulcsokkal:
//   - cim: 'Feladatkezelő'
//   - verzio: 1
//   - maxFeladat: 5
const alkalmazas = {
    cim: 'Feladatkezelő',
    verzio: 1,
    maxFeladat: 5
}
//
// Hozz létre egy "feladatok" nevű tömböt, amely az alábbi 5 objektumot tartalmazza:
//
//   { nev: 'Bevásárlás', prioritas: 'magas',    elvegzett: false }
//   { nev: 'Edzés',      prioritas: 'alacsony',  elvegzett: false }
//   { nev: 'Olvasás',    prioritas: 'kozepes',   elvegzett: true  }
//   { nev: 'Főzés',      prioritas: 'magas',     elvegzett: false }
//   { nev: 'Takarítás',  prioritas: 'alacsony',  elvegzett: true  }

const feladatok = [
  { nev: 'Bevásárlás', prioritas: 'magas', elvegzett: false },
  { nev: 'Edzés', prioritas: 'alacsony', elvegzett: false },
  { nev: 'Olvasás', prioritas: 'kozepes', elvegzett: true },
  { nev: 'Főzés', prioritas: 'magas', elvegzett: false },
  { nev: 'Takarítás', prioritas: 'alacsony', elvegzett: true }
];
// console.log(feladatok);



// ------------------------------------------------------------
// 2. FELADAT – DOMContentLoaded (5 pont)
// ------------------------------------------------------------
// Csomagold be a teljes kódodat (3-8. feladat) egy DOMContentLoaded
// eseményfigyelőbe az alábbi módon:
//
// document.addEventListener('DOMContentLoaded", function () {
//     // ide kerül a többi kód
// });


document.addEventListener("DOMContentLoaded", function () {
    // ide kerül a többi kód




// ------------------------------------------------------------
// 3. FELADAT – Fejléc és számláló (10 pont)
// ------------------------------------------------------------
// Írj egy "fejlecLetrehoz(szoveg)" nevű függvényt, amely:
//   - létrehoz egy <h1> elemet
//   - beleteszi a kapott szoveg paramétert
//   - visszaadja az elkészült elemet
function fejlecLetrehoz(szoveg){
    const h1 = document.createElement("h1");
    // h1.append(szoveg);
    h1.textContent = szoveg;
    return h1;
};
//
// Hívd meg az alkalmazas.cim értékével, és az eredményt fűzd a document.body-hoz!
const fejlec = fejlecLetrehoz(alkalmazas.cim);
document.body.append(fejlec);

// Ezután hozz létre egy <p> elemet, és tárold el egy "szamlalo" nevű változóban!
// A szövege legyen: "Elvégezve: X / 5"
// ahol X az elvégzett feladatok száma.



const szamlalo = document.createElement("p");
szamlaloFrissit();

// A számoláshoz:
//   - hozz létre egy "db" nevű változót 0 értékkel
//   - menj végig a feladatok tömbön egy for ciklussal
//   - ha egy feladat elvegzett értéke true, növeld db-t 1-gyel
function szamlaloFrissit(){
    let db = 0;
    for (const feladat of feladatok) {
        if (feladat.elvegzett === true){
            db++;
        }
    }
//    szamlalo.textContent = "Elvégezve: " + db + " / " + (feladatok.length > alkalmazas.maxFeladat ? feladatok.length : alkalmazas.maxFeladat);
    szamlalo.textContent = "Elvégezve: " + db + " / " + feladatok.length;
}
//
// Fűzd a szamlalo elemet is a document.body-hoz!
// document.body.append(szamlalo);
    document.body.append(szamlalo);



// ------------------------------------------------------------
// 4. FELADAT – Kártya létrehozó függvény (15 pont)
// ------------------------------------------------------------
// Írj egy "kartyaLetrehoz({ nev, prioritas, elvegzett })" nevű függvényt!
//
// A függvény hozzon létre egy <div> elemet az alábbi osztályokkal:
//
//   ✅ KÖTELEZŐ osztályok:
//      div.classList.add("kartya", prioritas)
//      → pl. ha prioritas = 'magas', az elem osztályai: "kartya magas"
//      → ha prioritas = 'kozepes':                       "kartya kozepes"
//      → ha prioritas = 'alacsony':                      "kartya alacsony"
//
//   ✅ Ha az elvegzett értéke true, add hozzá az "elvegzett" osztályt is:
//      div.classList.add("elvegzett")
//      → az elem osztályai ekkor pl.: "kartya magas elvegzett"
//
// A <div>-be kerüljön bele:
//   - egy <p> elem a feladat nevével (nev)
//   - egy <span> elem ilyen szöveggel: "⚡ magas"
//     (a prioritas értékét írd ki dinamikusan, ne fix szöveget!)
//
// A függvény adja vissza a <div> elemet!
function kartyaLetrehoz({ nev, prioritas, elvegzett}, index) {
    const div = document.createElement("div");
    div.classList.add("kartya", prioritas);
    div.dataset.index = index;

    if (elvegzett){
        div.classList.add("elvegzett");
    }

    const p = document.createElement("p");
    p.textContent = nev;

    const span = document.createElement("span");
    span.textContent = `⚡ ${ prioritas }`;

    // lásd 5. feladat - "KÉSZ" gomb:
    const keszGomb = document.createElement("button");
    keszGomb.textContent = elvegzett ? "Visszavonás" : "Kész";
    keszGomb.addEventListener("click", function(){
        // index = feladatok.indexOf({nev, prioritas, elvegzett});
        let idx = Number(div.dataset.index);
        // const parentDiv = e.target.closest("div");
        // console.log(index);
        if (keszGomb.textContent === "Kész"){
            div.classList.add("elvegzett");
            keszGomb.textContent = "Visszavonás";
            feladatok[idx].elvegzett = true;
        } else {
            div.classList.remove("elvegzett");
            keszGomb.textContent = "Kész";
            feladatok[idx].elvegzett = false;
        }
        szamlaloFrissit();
    })

    // lásd 5. feladat - "Törlés" gomb:
    const torlesGomb  = document.createElement("button");
    torlesGomb.textContent = "Törlés";
    torlesGomb.addEventListener("click", function(){
        let idx = Number(div.dataset.index);
        div.remove();
        // feladatok[idx].remove();
        feladatok.splice(idx, 1);
        szamlaloFrissit();
    })

    div.append(p, span, keszGomb, torlesGomb);

    // div.append(span, button, button2);
    return div;
}
//
// Menj végig a feladatok tömbön egy for ciklussal, hívd meg minden elemre
// a kartyaLetrehoz függvényt, és fűzd az elkészült kártyákat a document.body-hoz!
for (let feladat of feladatok) {
    const nev = feladat.nev;
    const prioritas = feladat.prioritas;
    const elvegzett = feladat.elvegzett;
    document.body.append(kartyaLetrehoz({nev, prioritas, elvegzett}, feladatok.indexOf(feladat)));
    // const kartya = kartyaLetrehoz(feladat);
    // document.body.append(kartyaLetrehoz(kartya));
    // document.body.append(feladatok.indexOf(feladat));
};


// ------------------------------------------------------------
// 5. FELADAT – Gombok és Click esemény (20 pont)
// ------------------------------------------------------------
// Bővítsd ki a kartyaLetrehoz függvényt két gombbal:
//
// "Kész" gomb:
//   - hozz létre egy <button> elemet "Kész" felirattal
//   - adj hozzá click eseményfigyelőt!
//   - ha a gomb felirata "Kész":
//       * a szülő div kapja meg az "elvegzett" osztályt → div.classList.add("elvegzett")
//       * a gomb felirata legyen "Visszavonás"
//   - ha a gomb felirata "Visszavonás":
//       * vedd le az "elvegzett" osztályt → div.classList.remove("elvegzett")
//       * a gomb felirata legyen vissza "Kész"
//   - minden kattintás után hívd meg a szamlaloFrissit() függvényt!
//
// Írj egy "szamlaloFrissit()" nevű függvényt, amely:
//   - létrehoz egy db = 0 változót
//   - for ciklussal végigmegy a feladatok tömbön
//   - minden elvegzett: true elemnél növeli db-t
//   - frissíti a szamlalo elem textContent értékét:
//     "Elvégezve: " + db + " / " + feladatok.length
//
// "Törlés" gomb:
//   - hozz létre egy <button> elemet "Törlés" felirattal
//   - adj hozzá click eseményfigyelőt!
//   - kattintásra távolítsa el a kártyát a DOM-ból a remove() metódussal
//   - törlés után hívd meg a szamlaloFrissit() függvényt!
//
// ⚠️  FONTOS: mindkét gombot fűzd bele a <div>-be, a <p> és <span> után!
//     div.append(p, span, keszGomb, torlesGomb)



// ------------------------------------------------------------
// 6. FELADAT – Új feladat hozzáadása (20 pont)
// ------------------------------------------------------------
// Add hozzá az alábbi új feladatot a feladatok tömbhöz a push() metódussal:
//   { nev: 'Futás', prioritas: 'magas', elvegzett: false }
// const ujFeladat = { nev: 'Futás', prioritas: 'magas', elvegzett: false };
feladatok.push({ nev: 'Futás', prioritas: 'magas', elvegzett: false }); //Hát...ez eléggé bekavart :(
feladatok.push({ nev: 'Futás', prioritas: 'magas', elvegzett: false }); //Hát...ez eléggé bekavart :(
feladatok.push({ nev: 'Futás', prioritas: 'magas', elvegzett: false }); //Hát...ez eléggé bekavart :(
console.log(feladatok.length);
console.log(feladatok);


// console.log(feladatok.length);
//
// Ezután ellenőrizd:
//   - ha feladatok.length > alkalmazas.maxFeladat:
//       * írd ki a konzolra: 'Hiba: maximum 5 feladat adható hozzá!'
//       * ne jelenítsd meg az új kártyát
//   - ha nem haladja meg:
//       * hívd meg a kartyaLetrehoz függvényt az új feladattal
//       * fűzd az új kártyát a document.body-hoz
//       * hívd meg a szamlaloFrissit() függvényt!
if (feladatok.length > alkalmazas.maxFeladat){
    console.log('Hiba: maximum 5 feladat adható hozzá!'); 
    while(feladatok.length > alkalmazas.maxFeladat){
        feladatok.pop(); //kitörlöm a feladatok tomb utolsó elemét, mert max. 5 a megengedett.
        console.log(feladatok.length);
    }
} else {
    document.body.append(kartyaLetrehoz({ nev: 'Futás', prioritas: 'magas', elvegzett: false }, feladatok.length-1));
    szamlaloFrissit();
}



// ------------------------------------------------------------
// 7. FELADAT – Szűrő gombok (15 pont)
// ------------------------------------------------------------
// Hozz létre három gombot az oldal tetején:
//   - "Mind" gomb
//   - "Elvégzett" gomb
//   - "Aktív" gomb
const mindGomb = document.createElement("button");
const elvegzettGomb = document.createElement("button");
const aktivGomb = document.createElement("button");
mindGomb.textContent = "Mind";
elvegzettGomb.textContent = "Elvégzett";
aktivGomb.textContent = "Aktív";

//
// Mindhárom gombot a body ELEJÉRE fűzd a prepend() segítségével:
//   document.body.prepend(aktivGomb);
//   document.body.prepend(elvegzettGomb);
//   document.body.prepend(mindGomb);
//   → Fontos: fordított sorrendben prepend-eld őket, hogy Mind legyen legelöl!
  document.body.prepend(aktivGomb);
  document.body.prepend(elvegzettGomb);
  document.body.prepend(mindGomb);
//
// Minden gombhoz adj click eseményfigyelőt!
// A szűréshez:
//   - válaszd ki az összes kártyát: document.querySelectorAll(".kartya")
//   - menj végig rajtuk egy for ciklussal
//   - vizsgáld meg minden kártyán: tartalmazza-e az "elvegzett" osztályt?
//     → classList.contains("elvegzett")  →  true vagy false értéket ad vissza
//
//   "Mind" gomb:      minden kártya → style.display = "block"
//   "Elvégzett" gomb: ha classList.contains("elvegzett") → style.display = "block"
//                     egyébként                          → style.display = "none"
//   "Aktív" gomb:     ha NEM tartalmazza ("elvegzett")   → style.display = "block"
//                     egyébként                          → style.display = "none"

// Az alábbi gombok megnyomása után a kártyák egyenkénti belső elrendezése kissé átalakul !!!
mindGomb.addEventListener("click", function(){
    const kartyak = document.querySelectorAll(".kartya");
    // console.log(kartyak);
    for (const kartya of kartyak) {
        kartya.style.display = "block";
    }
})

elvegzettGomb.addEventListener("click", function(){
    const kartyak = document.querySelectorAll(".kartya");
    for (const kartya of kartyak) {
        kartya.classList.contains("elvegzett") ?
        kartya.style.display = "block" :
        kartya.style.display = "none";
    }
})

aktivGomb.addEventListener("click", function(){
    const kartyak = document.querySelectorAll(".kartya");
    for (const kartya of kartyak) {
        !kartya.classList.contains("elvegzett") ?
        kartya.style.display = "block" :
        kartya.style.display = "none";
    }    
})



// ------------------------------------------------------------
// 8. FELADAT – Rendezés (5 pont)
// ------------------------------------------------------------
// Írj egy "rendez(tomb)" nevű függvényt!
//
// Hozz létre benne egy "sorrend" objektumot:
//   const sorrend = { magas: 1, kozepes: 2, alacsony: 3 };
//
// A rendezéshez használj beágyazott for ciklust (bubble sort):
//   - külső ciklus: i = 0-tól tomb.length-1-ig
//   - belső ciklus: j = 0-tól tomb.length-2-ig
//   - ha sorrend[tomb[j].prioritas] > sorrend[tomb[j+1].prioritas]:
//       * cseréld fel a két elemet egy "csere" segédváltozóval:
//           const csere = tomb[j];
//           tomb[j] = tomb[j + 1];
//           tomb[j + 1] = csere;
//
// A függvény adja vissza a rendezett tömböt!
//
// Hívd meg: const rendezettFeladatok = rendez(feladatok);
// Majd írd ki a konzolra for ciklussal minden elem nev tulajdonságát!
function rendez(tomb){
    // console.log(tomb);
    const sorrend = { magas: 1, kozepes: 2, alacsony: 3 };
    for (let i = tomb.length-1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (sorrend[tomb[j].prioritas] > sorrend[tomb[j+1].prioritas]){
                // console.log(sorrend[tomb[j].prioritas])
                let temp = tomb[j];
                tomb[j] = tomb[j+1];
                tomb[j+1] = temp;
            }  
        }
    }
    console.log(tomb);
    return(tomb);
}

const rendezettFeladatok = rendez(feladatok);
for (const feladat of rendezettFeladatok) {
    console.log(feladat.nev);
}

});