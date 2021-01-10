let token
let chatId = "ida8c4761e5eace3cf3b1551b7421870"

function poNacteni() {
  ukazPrihlaseni();
}

function ukazPrihlaseni() {
  document.getElementById("div_registrace").style.display = "none";
  document.getElementById("div_prihlaseni").style.display = "block";
  document.getElementById("div_chat").style.display = "none";
}

async function prihlas() {
  let url = "https://nodejs-3260.rostiapp.cz/users/login";
  let body = {}
  body.username = document.getElementById("uz_jmeno").value;
  body.password = document.getElementById("heslo").value;
  let opt = { method: "POST", body: JSON.stringify(body)};
  let req = await fetch(url, opt);
  let ans = await req.json()
  if (ans.status == "OK") {
    ukazChat();
    token = ans.token;
  }
  if (ans.error) {
    console.error(ans.error);
  }
}

function ukazRegistraci() {
  document.getElementById("div_registrace").style.display = "block";
  document.getElementById("div_prihlaseni").style.display = "none";
  document.getElementById("div_chat").style.display = "none";
}

async function registrovat(){
  let url = "https://nodejs-3260.rostiapp.cz/users/registry";
  let body = {};
  body.fullname = document.getElementById("cele_jmeno").value;
  body.username = document.getElementById("prihlas_jmeno").value;
  body.password = document.getElementById("heslo_r").value;
  body.email = document.getElementById("email").value;
  let opt = { method: "POST", body: JSON.stringify(body)};
  let req = await fetch(url, opt);
  let ans = await req.json()
  if (ans.error) {
    console.error(ans.error);
  }
  if (ans.status == "OK") {
    ukazPrihlaseni();
    alert("Nyní se můžete přihlásit :D");
  }
}

function ukazChat() {
  document.getElementById("div_registrace").style.display = "none";
  document.getElementById("div_prihlaseni").style.display = "none";
  document.getElementById("div_chat").style.display = "block";
  setInterval(obnovZpravy, 1000);
}

async function odesliZpravu() {
  let mes = document.getElementById("zprava").value;
  let url = "https://nodejs-3260.rostiapp.cz/chat/addMsg";
  let body = {};
  body.token = token;
  body.chat = chatId;
  body.msg = mes;
  let opt = { method: "POST", body: JSON.stringify(body)};
  let req = await fetch(url, opt);
  let ans = await req.json();
  let zpravy = "";
  for(let data of ans){
    zpravy += data.user + ": " + data.msg + "<br>";
  }
  document.getElementById("zpravy").innerHTML = zpravy;
}

async function obnovZpravy() {
  let url = "https://nodejs-3260.rostiapp.cz/chat/listMsgs";
  let body = {};
  body.token = token;
  body.chat = chatId;
  let opt = { method: "POST", body: JSON.stringify(body)};
  let req = await fetch(url, opt);
  let ans = await req.json();
  let zpravy = "";
  for(let data of ans){
    zpravy += data.user + ": " + data.msg + "<br>";
  }
  document.getElementById("zpravy").innerHTML = zpravy;
}
