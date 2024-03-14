"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");
const findBtn = document.getElementById("find-btn");

// Hiển thị danh sách thú cưng
renderTableData(petArr);

// Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); //tạo thẻ tr
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>
    ${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}
    </td> `;

    tableBodyEl.appendChild(row);
  }
}

//Hiển thị danh sách breed
renderBreed();
function renderBreed() {
  breedArr.forEach(function (breed) {
    const option = document.createElement("option");
    option.innerHTML = `${breed.breed}`;
    breedInput.appendChild(option);
  });
}

// Bắt sự kiện kích vào nút Find
findBtn.addEventListener("click", function () {
  let petFind = petArr;

  // Nếu nhập vào id thì tìm theo id
  if (idInput.value) {
    petFind = petFind.filter((pet) => pet.id.includes(idInput.value));
  }

  // Nếu nhập vào name thì tìm theo nam
  if (nameInput.value) {
    petFind = petFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  // Nếu chọn vào type thì tìm theo type
  if (typeInput.value !== "Select Type") {
    petFind = petFind.filter((pet) => pet.type.includes(typeInput.value));
  }

  // Nếu chọn vào breed thì tìm theo breed
  if (breedInput.value !== "Select Breed") {
    petFind = petFind.filter((pet) => pet.breed.includes(breedInput.value));
  }

  // Nếu chọn Vaccinated thì tìm theo Vaccinated
  if (vaccinatedInput.checked) {
    petFind = petFind.filter((pet) => pet.vaccinated === true);
  }

  // Nếu chọn Dewormed thì tìm theo Dewormed
  if (dewormedInput.checked) {
    petFind = petFind.filter((pet) => pet.dewormed === true);
  }

  // Nếu chọn Sterilized thì tìm theo Sterilized
  if (sterilizedInput.checked) {
    petFind = petFind.filter((pet) => pet.sterilized === true);
  }

  // Hiển thị lại danh sách được tìm kiếm
  renderTableData(petFind);
});
