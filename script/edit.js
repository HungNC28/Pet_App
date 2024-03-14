"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const formEL = document.getElementById("container-form");
// Hiển thị danh sách thú cưng
renderTableData(petArr);

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
    </td>
    <td>
    <button class="btn btn-danger" onclick="editPet('${
      petArr[i].id
    }')">Edit</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

// Hàm sửa lại thông tin
function editPet(id) {
  // Hiển thị lại form nhập input
  formEL.classList.remove("hide");

  // Tìm đến thú cưng cần sửa
  const pet = petArr.find((pet) => pet.id === id);

  // Hiển thị thông tin lên form
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  //Hàm hiển thị loài vs Dog-Cat
  renderBreed();
  breedInput.value = `${pet.breed}`;
}

// Bắt sự kiện vào input Type
typeInput.addEventListener("change", renderBreed);

// Hàm hiện thị loài vs Dog - Cat
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // Type là Dog
  if (typeInput.value === "Dog") {
    const breedDog = breedArr.filter((breed) => breed.type === "Dog");
    breedDog.forEach(function (breed) {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.appendChild(option);
    });
  }

  // Type là Cat
  else if (typeInput.value === "Cat") {
    const breedCat = breedArr.filter((breed) => breed.type === "Cat");
    breedCat.forEach(function (breed) {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Bắt sự kiện kích vào nút submit

//1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function () {
  //2.Lấy dữ liệu từ các Form Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //Validate dữ liệu
  const validate = validateData(data);

  if (validate) {
    // tìm vị trí pet đang được sửa
    const index = petArr.findIndex((pet) => pet.id === data.id);

    // cập nhật lại thông tin thú cưng đó
    petArr[index] = data;

    // lưu dữ liệu
    saveToStorage("petArr", petArr);

    //Hiển thị danh sách thú cưng
    renderTableData(petArr);

    // Ẩn form điền thông tin
    formEL.classList.add("hide");
  }
});

// Validate dữ liệu
function validateData(data) {
  let isValidate = true;

  // Pet Name trống
  if (data.name.trim() === "") {
    alert("Please input for name");
    isValidate = false;
  }

  // Age trống
  if (isNaN(data.age)) {
    alert("Please input for age");
    isValidate = false;
  }

  // Weight trống
  if (isNaN(data.weight)) {
    alert("Please input for weight");
    isValidate = false;
  }

  // Length trống
  if (isNaN(data.length)) {
    alert("Please input for length");
    isValidate = false;
  }

  // Age chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  //Weight chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  //Length chỉ được nhập giá trị trong khoảng 1 đến 100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }

  // Bắt buộc phải chọn giá trị cho trường Type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }

  //Bắt buộc phải chọn giá trị cho trường Breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}
