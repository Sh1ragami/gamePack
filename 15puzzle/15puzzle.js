"use strict";

const tiles = [];
let isShuffling = false;

function init() {
  let table = document.getElementById("table");

  for (let i = 0; i < 4; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      let td = document.createElement("td");
      let index = i * 4 + j;
      td.className = "tile";
      td.index = index;
      td.value = index;
      td.textContent = index === 0 ? "" : index;
      if (index === 0) {
        td.classList.add("empty");
      }
      td.onclick = click;
      tr.appendChild(td);
      tiles.push(td);
    }
    table.appendChild(tr);
  }

  // シャッフル
  isShuffling = true;
  for (let i = 0; i < 1000; i++) {
    let randomIndex = Math.floor(Math.random() * 16);
    click({ target: tiles[randomIndex] });
  }
  isShuffling = false;

  // 右クリックを無効化
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // 範囲選択を無効化
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });
}

function click(e) {
  let i = e.target.index;

  // 上に空白がある場合
  if (i - 4 >= 0 && tiles[i - 4].value === 0) {
    swap(i, i - 4);
  }
  // 下に空白がある場合
  else if (i + 4 < 16 && tiles[i + 4].value === 0) {
    swap(i, i + 4);
  }
  // 左に空白がある場合
  else if (i % 4 !== 0 && tiles[i - 1].value === 0) {
    swap(i, i - 1);
  }
  // 右に空白がある場合
  else if (i % 4 !== 3 && tiles[i + 1].value === 0) {
    swap(i, i + 1);
  }
}

function swap(i, j) {
  if (!isShuffling) {
    let audio = new Audio("./sound/swap.mp3");
    audio.play();
  }
  let tmp = tiles[i].value;
  tiles[i].textContent = tiles[j].textContent;
  tiles[i].value = tiles[j].value;
  tiles[j].textContent = tmp === 0 ? "" : tmp;
  tiles[j].value = tmp;

  tiles[i].classList.toggle("empty", tiles[i].value === 0);
  tiles[j].classList.toggle("empty", tiles[j].value === 0);
}
