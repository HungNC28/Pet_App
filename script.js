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

const healthyBtn = document.getElementById("healthy-btn");

renderTableData(petArr);
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
    //Thêm thú cưng vào danh sách
    petArr.push(data);
    // lưu dữ liệu
    saveToStorage("petArr", petArr);
    //Xóa các dữ liệu nhập trong Form Input
    clearInput();
    //Hiển thị danh sách thú cưng
    renderTableData(petArr);
  }
});

//3. Validate dữ liệu
function validateData(data) {
  let isValidate = true;
  // Pet ID trống
  if (data.id.trim() === "") {
    alert("Please input for id");
    isValidate = false;
  }

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

  // Giá trị ID không được trùng
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
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
//4.Hiển thị danh sách thú cưng
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
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

//5. Xóa input khi nhán Submit
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//6. Nút delete
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        // lưu lại dữ liệu
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};

//7. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = false;

healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  } else {
    const healthyPetArr = petArr.filter(
      (a) => a.vaccinated && a.dewormed && a.sterilized
    );
    renderTableData(healthyPetArr);
    //nút bấm thay đổi thành "Show All Pet"
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  }
});
