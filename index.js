/*  Проект.

  1. При введенні символу input (латиниця, нижній регістр) - клавіші з таким символом
  надається клас .active. Клавіша фарбується помаранчевим фоном.
  2. Тобто при введенні наступного символу попередня клавіша втратить помаранчевий фон,
  а нова введена забарвиться.
  3. Додано всі цифри та другий ряд клавіш від a до l
  4. Додано клавішу alt, enter.
*/

let arrLetter = [
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  // "z",
  // "x",
  // "c",
  // "v",
  // "b",
  // "n",
  // "m",
];

let additionalKey = {
  enter: "Enter",
  alt: "Alt",
  space: "Space",
  ctrl: "Control",
};

let additionalNum = [4, 5, 6, 7, 8, 9, 0];

replaceKey();
addKey();
styleKey();

function interactiveKey(event) {
  let divs = document.querySelectorAll(".keyboard");

  // змінюємо значення атрибуту для "space" та "ctrl"
  for (let item of divs) {
    for (let key in additionalKey) {
      if (item.getAttribute("data") === key) {
        item.setAttribute("data", additionalKey[key]);
      }
    }
  }

  // додаємо класс "active" при зміні клавіші
  for (let itemKey in additionalKey) {
    if (
      (event.key >= "a" && event.key <= "z") ||
      (event.key >= 0 && event.key <= 9) ||
      event.code === additionalKey[itemKey] ||
      event.key === additionalKey[itemKey]
    ) {
      for (let item of divs) {
        item.classList.remove("active");
        if (
          item.getAttribute("data") === event.key ||
          item.getAttribute("data") === event.code
        ) {
          item.classList.add("active");
        }
      }
    }
  }
}
document.querySelector(".i").onkeydown = interactiveKey;

// змінюємо розташування клавіш згідно клівіатури
function replaceKey() {
  let divs = document.querySelectorAll(".keyboard");
  let q = document.querySelector(".keyboard[data='q']");
  let ctrl = document.querySelector(".keyboard[data='ctrl']");

  divs.forEach((elem) => {
    if (
      elem.getAttribute("data") === "1" ||
      elem.getAttribute("data") === "2" ||
      elem.getAttribute("data") === "3"
    ) {
      q.before(elem);
    }
    if (elem.getAttribute("data") === "space") {
      ctrl.before(elem);
    }
  });
}

function addKey() {
  let divs = document.querySelectorAll(".keyboard");
  let q = document.querySelector(".keyboard[data='q']");
  let r = document.querySelector(".keyboard[data='r']");
  let ctrl = document.querySelector(".keyboard[data='ctrl']");

  // додаємо цифри
  for (let item of additionalNum) {
    let div = document.createElement("div");
    div.textContent = `${item}`;
    div.classList.add("keyboard");
    div.setAttribute("data", `${item}`);
    q.before(div);
  }

  // додаємо літери
  for (let i = arrLetter.length - 1; i >= 0; i--) {
    let div = document.createElement("div");
    div.textContent = `${arrLetter[i]}`;
    div.classList.add("keyboard");
    div.setAttribute("data", `${arrLetter[i]}`);
    r.after(div);
  }
  // додаємо alt - 'Alt'
  // додаємо enter - 'Enter'
  for (let keyName in additionalKey) {
    let keyExists = false;

    for (let item of divs) {
      if (item.getAttribute("data") === keyName) {
        keyExists = true;
        break;
      }
    }
    if (!keyExists) {
      let newKey = document.createElement("div");
      newKey.textContent = keyName;
      newKey.classList.add("keyboard");
      newKey.setAttribute("data", additionalKey[keyName]);

      if (keyName === "enter") {
        let lKey = document.querySelector(".keyboard[data='l']");
        lKey.after(newKey);
      } else {
        ctrl.before(newKey);
      }
    }
  }
}

// змінюємо стилі клавіш
function styleKey() {
  let divs = document.querySelectorAll(".keyboard");
  let out = document.querySelector(".out");

  out.style.width = "800px";
  out.style.flexWrap = "wrap";
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].getAttribute("data") === "space") {
      divs[i].style.width = "610px";
    }
  }
}
