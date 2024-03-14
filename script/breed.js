"use strict";

"use strict";
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

//Hiển thị danh sách breed
renderTableBreed(breedArr);
// Bắt sự kiện vào nút submit
btnSubmit.addEventListener("click", function () {
  // lấy dữ liệu từ các form input
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  console.log(data);
  //Validate dữ liệu
  const validate = validateData(data);

  if (validate) {
    //Thêm breed vào danh sbreed
    breedArr.push(data);

    //lưu dữ liệu lại
    saveToStorage("breedArr", breedArr);
    //Xóa các dữ liệu nhập trong Form Input
    clearInput();

    //Hiển thị danh sách breed
    renderTableBreed(breedArr);
  }
});

// Validate dữ liệu
function validateData(data) {
  let isValidate = true;

  // để trống hoặc nhập chuỗi rỗng
  if (data.breed.trim() === "") {
    alert("Please input for breed");
    isValidate = false;
  }

  // phải chọn type
  if (data.type === "Select Type") {
    alert("Please select type");
    isValidate = false;
  }
  return isValidate;
}

// Xóa input
function clearInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

//Hiển thị danh sách breed
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${i + 1}</td>
		<td scope="col">${breedArr[i].breed}</td>
		<td scope="col">${breedArr[i].type}</td>

    <td> 
    <button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breedArr[i].breed
    }')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

// Nút delete
const deleteBreed = (e) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (e === breedArr[i].breed) {
        breedArr.splice(i, 1);
        // lưu lại giá trị
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
      }
    }
  }
};
