// tab container
var tabbuttons = document.querySelectorAll(".buttoncontainer button");
var mobbuttons = document.querySelectorAll(".hello2");
var tabpanels = document.querySelectorAll(".tabcontainer .dtabpanel");
function showpanel(panelindex, colorcode) {
  if (panelindex == 3) {
    setTimeout(() => {
      var mytab = document.getElementById("tab1");
      var loading = document.getElementById("loading");
      loading.style.display = "none";
      mytab.classList.add("tabshow2");
    }, 12);
  }
  tabbuttons.forEach((node) => {
    node.style.backgroundcolor = null;
    node.style.color = "";
    node.style.boxShadow = "";
    node.style.backgroundColor = "";
    node.style.borderRadius = "0px";
    node.style.fontSize = " 1rem";
  });
  mobbuttons.forEach((node) => {
    node.style.backgroundcolor = null;
    node.style.color = "";
    node.style.boxShadow = "";
    node.style.backgroundColor = "";
    node.style.borderRadius = "0px";
    node.style.fontSize = " 1rem";
  });

  tabbuttons[panelindex].style.color = "#7986CB";
  tabbuttons[panelindex].style.backgroundColor = "white";
  // tabbuttons[panelindex].style.boxShadow = "2px 2px 5px #BFAFB2";
  // tabbuttons[panelindex].style.borderRadius = "50px ";
  tabbuttons[panelindex].style.fontSize = " 1.1rem";
  tabpanels.forEach(function (node) {
    node.style.display = "none";
  });
  tabpanels[panelindex].style.display = "block";

  tabpanels[panelindex].style.backgroundColor = colorcode;

  //asfsafsafas
  mobbuttons[panelindex].style.color = "white";
  mobbuttons[panelindex].style.backgroundColor = "#7986cb";
  // mobbuttons[panelindex].style.boxShadow = "2px 2px 5px #BFAFB2";
  mobbuttons[panelindex].style.fontSize = " 1.1rem";
  tabpanels.forEach(function (node) {
    node.style.display = "none";
  });
  tabpanels[panelindex].style.display = "block";
  tabpanels[panelindex].style.backgroundColor = colorcode;
  //asdasdsa
}
showpanel(0, "black");
