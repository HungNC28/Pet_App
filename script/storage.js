"use strict";

// Bổ sung Animation cho Sidebar
const navEl = document.getElementById("sidebar");

navEl.addEventListener("click", function () {
  navEl.classList.toggle("active");
});

// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr");
}
const petArr = getFromStorage("petArr");

//  Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr");
}
const breedArr = getFromStorage("breedArr");

//  Hàm lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key) !== "undefined" ? JSON.parse(localStorage.getItem(key)) : [];
}



// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
