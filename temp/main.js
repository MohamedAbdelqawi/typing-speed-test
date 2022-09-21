let words = [
  "ahmed",
  "mohamed",
  "Mahfouz",
  "hank",
  "jop",
  "egypt",
  "mask",
  "how",
  "what",
  "id",
  "class",
  "good",
];

let lab = document.querySelector(".lab");
let input = document.querySelector(".input1");
var counter = document.querySelector(".labval");
let allbtn = document.querySelectorAll(".btns");
let level = document.querySelector(".animate-charcter");
input.disabled = true;

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

function getWord() {
  let indexof = Math.floor(Math.random() * words.length);
  return (lab.innerHTML = words[indexof]);
}

input.addEventListener("input", getVal);
function getVal(e) {
  window.localStorage.setItem("valinput", e.target.value);

  if (e.target.value === lab.innerHTML && lab.innerHTML != "") {
    e.target.value = "";
    window.localStorage.setItem("valinput", e.target.value);
    `${document.querySelector(".score").innerHTML++}`;
    window.localStorage.setItem(
      "valscore",
      document.querySelector(".score").innerHTML
    );
    getWord();
    window.localStorage.setItem("vallap", lab.textContent);
  }
}

function getScore() {
  swal({
    title: `Score = ${document.querySelector(".score").innerHTML}`,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 2500,
  });
}

allbtn.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".score").innerHTML = 0;
    window.localStorage.setItem("button", button.innerHTML);
    button.style.background = "red";
    button.style.color = "white";
    level.innerHTML = button.innerHTML;
    allbtn.forEach((button) => {
      button.disabled = true;
      input.disabled = false;
    });
    getWord();
    counter.textContent = button.getAttribute("data-set");

    Timeout = setInterval(function () {
      window.localStorage.setItem("vallap", lab.textContent);
      `${counter.textContent--}`;
      window.localStorage.setItem("valcounter", counter.textContent);

      if (counter.textContent == 0) {
        clearInterval(Timeout);
        counter.textContent = "";
        button.style.backgroundColor = "";
        button.style.color = "";
        input.disabled = true;
        lab.textContent = "";
        input.value = "";
        getScore();
        document.querySelector(".score").innerHTML = "";
        level.innerHTML = "SELECT THE LEVEL";
        localStorage.clear();
        allbtn.forEach((button) => {
          button.disabled = false;
        });
      }
      window.localStorage.setItem(
        "valscore",
        document.querySelector(".score").innerHTML
      );
    }, 1000);
  });
});

window.onload = function () {
  setTimeout(function () {
    allbtn.forEach((button) => {
      if (button.innerHTML == window.localStorage.getItem("button")) {
        if (counter.textContent != 0) {
          {
            button.click();
          }
        }
      }
      counter.textContent = window.localStorage.getItem("valcounter");
      document.querySelector(".score").innerHTML =
        window.localStorage.getItem("valscore");
      lab.textContent = window.localStorage.getItem("vallap");
      input.value = window.localStorage.getItem("valinput");
    });
  }, 2000);
};

let newstart = document.querySelector(".new");

newstart.onclick = function () {
  window.location.reload();
  localStorage.clear();
};


