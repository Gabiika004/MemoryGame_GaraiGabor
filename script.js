// Metódus megadott kereteken belül, random számok generálására --> hivatkozás a képekre
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

//Tömbök létrehozása a képekre való hivatkozáshoz, egy változó a pontoknak;
let nums = [];
let nums2 = [];
let numsRandom = [];
let pontok = 0;


function disableBtn(id) {
    document.getElementById(id).disabled = true;
}

function enableBtn(id) {
    document.getElementById(id).disabled = false;
}


// Füügvény, ami visszaállítja az ereteti verziót (elrejtsük a képek helyét)
function restart(){
    //Képek forráskódjának beállítása a létrehozott tömbből
    for(let i = 0; i < 10; i++){
        if(!parok.includes(i+1))
            document.getElementById(String(i)).src = "Kepek/Hatlap.jpg";
    }

    //Képek forráskódjának beállítása a létrehozott riverse tömbből
    let j = 10; 
    for(let i = 0; i < 10; i++){
        if(!parok.includes(j+1))
        document.getElementById(String(j)).src = "Kepek/Hatlap.jpg";
        j++;
    }
}

//Függvény a játék indításához
function Start(second){

    //Tömbök kiürítése és a pontok nullázása
    nums = [];
    nums2 = [];
    pontok = 0;
    numsRandom = [];
    document.getElementById("1#").value = null;
    document.getElementById("2#").value = null;

    //segédváltozók létrehozása --> értékük 0;
    let num = 0;
    let index = 0;

    //nums tömbök feltöltése a képek számával
    do {
        num = getRandomInt(1,98);
        if(!nums.includes(num))
            nums.push(num);
            nums.push(num);
    }
    while(nums.length < 20)

    do {
        num = getRandomInt(0,20);
        if(!numsRandom.includes(nums[num])){
            index++;   
            numsRandom.push(nums[num]);          
        }    
    }
    while(index < 10)

    index = 0;
    do {
        num = getRandomInt(0,10);
        if(!nums2.includes(numsRandom[num])){
            index++;   
            nums2.push(numsRandom[num]);          
        }    
    }
    while(index < 10)


    //Képek forráskódjának beállítása a létrehozott tömbből
    for(let i = 0; i < 10; i++){
        document.getElementById(String(i)).src = "Kepek/" + String(numsRandom[i]) + ".jpg";
    }

    //Képek forráskódjának beállítása a létrehozott riverse tömbből
    let j = 10; 
    for(let i = 0; i < 10; i++){
        document.getElementById(String(j)).src = "Kepek/" + String(nums2[i]) + ".jpg";
        j++;
    }

    //Az eredeti állapot visszaállítása megadott időn belül
    let secondsBeforeRestart = second;
    setTimeout(restart, secondsBeforeRestart * 1000);

    enableBtn("test");
    enableBtn("segitseg");
    enableBtn("ujJatek");
    disableBtn("start")

}

// Függvény, ami új képeket ad, random helyekre, majd x másodperc múlva elrejti
function UjJatek(second){

    Start(second);

    //Az eredeti állapot visszaállítása megadott időn belül
    let secondsBeforeRestart = second;
    setTimeout(restart, secondsBeforeRestart * 1000);

    enableBtn("test");
    enableBtn("segitseg")
}

let parok = [];

function PairCheck(){
    let tipp1 = Number(document.getElementById("1#").value);
    let tipp2 = Number(document.getElementById("2#").value);
    
    let result = document.getElementById("result");

    if(tipp1 == tipp2 && (tipp1  == 0 || tipp2 == 0))
        alert("A képek számának megadása kötelező!");

    else if(tipp1 <= 0 || tipp2 <= 0 || tipp1 > 20 || tipp2 > 20)
        alert("Nincs ilyen kép, próbáld újra!")

    else if(tipp1 <= 10 && tipp2 > 10){
        if(parok.includes(tipp1) || parok.includes(tipp1))
            alert("Ez a pár már volt!");
        else if(numsRandom[tipp1-1] == nums2[tipp2-11]){
            pontok++;
            document.getElementById(String(tipp1-1)).src = "Kepek/Ures.jpg";
            document.getElementById(String(tipp2-1)).src = "Kepek/Ures.jpg";
            parok.push(tipp1);
            parok.push(tipp2);
        }
        else
            alert("A két kép nem egyezik!");
    }
    else if(tipp2 <= 10 && tipp1 > 10 ){
        if(numsRandom[tipp2-1] == nums2[tipp1-11]){
        pontok++;
        document.getElementById(String(tipp1-1)).src = "Kepek/Ures.jpg";
        document.getElementById(String(tipp2-1)).src = "Kepek/Ures.jpg";
        parok.push(tipp1);
        parok.push(tipp2);
        }
        else
            alert("A két kép nem egyezik!");
    }

    if(pontok < 10)
        result.innerHTML = 0 + String(pontok);
    else if(pontok == 10){
        alert("Megtaláltál minden képet! Szeretnél újra játszani? Kattinst az 'Új játék' gombra és csapj bele!");
        disableBtn("test");
        disableBtn("segitseg")
        parok = [];
    }

}

function Segitseg(second){

    //Képek forráskódjának beállítása a létrehozott tömbből
    for(let i = 0; i < 10; i++){
        if(!parok.includes(i+1))
            document.getElementById(String(i)).src = "Kepek/" + String(numsRandom[i]) + ".jpg";
    }

    //Képek forráskódjának beállítása a létrehozott riverse tömbből
    let j = 10; 
    for(let i = 0; i < 10; i++){
        if(!parok.includes(j+1))
        document.getElementById(String(j)).src = "Kepek/" + String(nums2[i]) + ".jpg";
        j++;
    }
        //Az eredeti állapot visszaállítása megadott időn belül
        let secondsBeforeRestart = second;
        setTimeout(restart, secondsBeforeRestart * 1000);
}