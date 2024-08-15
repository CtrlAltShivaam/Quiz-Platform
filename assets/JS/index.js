// var key = Object.value(localStorage)
const userName = sessionStorage.getItem('username');

if(userName!==null){
    const myDiv = document.getElementById("showUser");
    myDiv.innerHTML = `<p style="margin-top:18px"><span  >Hello  </span> ${userName} </p>`;
    document.getElementById("loginbuttons").style="display: none";

}
