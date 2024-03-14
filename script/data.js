"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Bắt sự kiện vào nút Export
btnExport.addEventListener("click", function () {
  // Xác nhận export
  const isExport = confirm("Do you want to export?");
  if (isExport) {
    saveDataToFile();
  }
});

// Hàm lưu dữ liệu xuống file
function saveDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  // Lưu file
  saveAs(blob, "petData.json");
}

// Bắt sự kiện vào nút Import
btnImport.addEventListener("click", function () {
  // Kiểm tra người dùng chọn file tải lên chưa
  if (!fileInput.value) {
    alert("Please select the file to upload!");
  } else {
    // Xác nhận import
    const isImport = confirm("Do you want to import?");

    if (isImport) {
      const reader = new FileReader();
      reader.readAsText(fileInput.files[0]); //đọc file đầu tiên
      reader.onload = function (e) {
        JSON.parse(e.target.result);

        // Lưu lại dữ liệu
        saveToStorage("petArr", JSON.parse(reader.result));
        alert("Import successfully!");

        // Xóa input
        fileInput.value = "";
      };
    }
  }
});





