import ListPerson from "../models/ListPerson.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";
const STUDENT = "Student";
const EMPLOYEE = "Employee";
const CUSTOMER = "Customer";
let listPerson = new ListPerson();
// console.log(listPerson);

let selectDoiTuong = document.getElementById("select_doiTuongInput");

// khi bấm vào nút đầu tiên để hiện modal
let quanLiInputSelect = () => {
  let txt_toan = document.getElementById("txt_toan");
  let txt_ly = document.getElementById("txt_ly");
  let txt_hoa = document.getElementById("txt_hoa");
  let txt_soNgayLamViec = document.getElementById("txt_soNgayLamViec");
  let txt_luong1Ngay = document.getElementById("txt_luong1Ngay");
  let txt_tenCongTy = document.getElementById("txt_tenCongTy");
  let txt_triGiaHoaDon = document.getElementById("txt_triGiaHoaDon");
  let txt_danhGia = document.getElementById("txt_danhGia");
  txt_toan.style.display = "none";
  txt_ly.style.display = "none";
  txt_hoa.style.display = "none";
  txt_soNgayLamViec.style.display = "none";
  txt_luong1Ngay.style.display = "none";
  txt_tenCongTy.style.display = "none";
  txt_triGiaHoaDon.style.display = "none";
  txt_danhGia.style.display = "none";
  selectDoiTuong.onchange = () => {
    console.log(selectDoiTuong.value);
    if (selectDoiTuong.value == "") {
      txt_toan.style.display = "none";
      txt_ly.style.display = "none";
      txt_hoa.style.display = "none";
      txt_soNgayLamViec.style.display = "none";
      txt_luong1Ngay.style.display = "none";
      txt_tenCongTy.style.display = "none";
      txt_triGiaHoaDon.style.display = "none";
      txt_danhGia.style.display = "none";
    } else if (selectDoiTuong.value == STUDENT) {
      txt_toan.style.display = "block";
      txt_ly.style.display = "block";
      txt_hoa.style.display = "block";
      txt_soNgayLamViec.style.display = "none";
      txt_luong1Ngay.style.display = "none";
      txt_tenCongTy.style.display = "none";
      txt_triGiaHoaDon.style.display = "none";
      txt_danhGia.style.display = "none";
    } else if (selectDoiTuong.value == EMPLOYEE) {
      txt_toan.style.display = "none";
      txt_ly.style.display = "none";
      txt_hoa.style.display = "none";
      txt_soNgayLamViec.style.display = "block";
      txt_luong1Ngay.style.display = "block";
      txt_tenCongTy.style.display = "none";
      txt_triGiaHoaDon.style.display = "none";
      txt_danhGia.style.display = "none";
    } else {
      txt_toan.style.display = "none";
      txt_ly.style.display = "none";
      txt_hoa.style.display = "none";
      txt_soNgayLamViec.style.display = "none";
      txt_luong1Ngay.style.display = "none";
      txt_tenCongTy.style.display = "block";
      txt_triGiaHoaDon.style.display = "block";
      txt_danhGia.style.display = "block";
    }
  };

  document.getElementById("formModal").reset();
  saveDataLocal();
  document.getElementById("ma").readOnly = false;
  document.getElementById("btn_capNhap").style.display = "none";
  document.getElementById("btn_ThemDuLieu").style.display = "block";
};
document.getElementById("btn_themNguoiDung").onclick = quanLiInputSelect;

function validationValue(user) {
  var isValid = true;
  isValid &= checkSelectValue(user.select_doiTuongInput, "tbSelect");
  isValid &= checkEmptyValue(user.ma, "tbMa");
  isValid &= checkEmptyValue(user.hoTen, "tbHoTen");
  isValid &= checkEmptyValue(user.email, "tbEmail");
  isValid &= checkEmailValue(user.diaChi, "tbDiaChi");
  isValid &= checkEmptyValue(user.toan, "tbToan");
  isValid &= checkEmptyValue(user.ly, "tbLy");
  isValid &= checkEmptyValue(user.hoa, "tbHoa");
  isValid &= checkEmptyValue(user.soNgayLamViec, "tbSoNgayLamViec");
  isValid &= checkEmptyValue(user.luong1Ngay, "tbLuong1Ngay");
  isValid &= checkEmptyValue(user.tenCongTy, "tbTenCongTy");
  isValid &= checkEmptyValue(user.triGiaHoaDon, "tbTriGiaHoaDon");
  isValid &= checkEmptyValue(user.danhGia, "tbDanhGia");

  if (!isValid) {
    return false;
  }

  return isValid;
}

// nút thêm dữ liệu
document.getElementById("btn_ThemDuLieu").onclick = () => {
  const arrField = document.querySelectorAll(
    "#formModal input, #formModal select, #formModal textarea"
  );
  let person;

  if (selectDoiTuong.value === STUDENT) {
    person = new Student();
    console.log("person", person);
    assignStudentValues(person, arrField);
  } else if (selectDoiTuong.value === EMPLOYEE) {
    person = new Employee();
    console.log(person);
    assignEmployeeValues(person, arrField);
  } else if (selectDoiTuong.value === CUSTOMER) {
    person = new Customer();
    console.log(person);
    assignCustomerValues(person, arrField);
  }
  // validationValue(person);
  listPerson.addPersonToList(person);
  renderArr(listPerson.listP);

  // validationValue(person);
  // tắt modal
  var modalElement = document.getElementById("modalId");
  var modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  //clear dữ liệu trên form
  document.getElementById("formModal").reset();
  saveDataLocal();
  //validation
};

function assignStudentValues(student, arrField) {
  arrField.forEach((field) => {
    const { id, value } = field;
    student[id] = value;
  });
  console.log("student", student);
}

function assignEmployeeValues(employee, arrField) {
  arrField.forEach((field) => {
    const { id, value } = field;
    employee[id] = value;
  });
}
function assignCustomerValues(Customer, arrField) {
  arrField.forEach((field) => {
    const { id, value } = field;
    Customer[id] = value;
  });
}
// hiển thị lên giao diện
const renderArr = (arr = listPerson.listP) => {
  let content = "";
  arr.forEach((user) => {
    // Kiểm tra loại ng dùng
    if (user.select_doiTuongInput == "Student") {
      let newStudent = new Student();
      newStudent = { ...newStudent, ...user };
      const { hoTen, ma, email, toan, ly, hoa } = newStudent;

      content += `
    <tr class="select_item" data-output='Student'>
    <td>${ma}</td>
      <td>${hoTen}</td>
      <td>${email}</td>
      <td >Student</td>
      <td>Điểm toán:${toan}</br>Điểm lý:${ly}</br>Điểm hoá:${hoa}</br> Điểm trung bình:${newStudent.tinhDiemTrungBinh()}</td>
     <td>
     <button onclick="deleteItem('${ma}')" data-id ="${ma}"  class="btn btn-danger">Xoá</button>
     <button onclick="getDetailPerson('${ma}')" class="btn btn-warning" >Sửa</button>
     </td>
  
      </tr>`;
    } else if (user.select_doiTuongInput == "Employee") {
      let newEmployee = new Employee();
      newEmployee = { ...newEmployee, ...user };
      const { hoTen, ma, email, soNgayLamViec, luong1Ngay } = newEmployee;

      content += `
    <tr  class="select_item" data-output='Employee'>
    <td>${ma}</td>
      <td>${hoTen}</td>
      <td>${email}</td>
      <td>Employee</td>
      
      <td>Số ngày làm việc: ${soNgayLamViec}</br>Lương theo ngày: ${luong1Ngay}</br>Tổng lương: ${newEmployee.tinhLuong()}</td>
     <td>
     <button onclick="deleteItem('${ma}')" data-id ="${ma}"  class="btn btn-danger">Xoá</button>
     <button onclick="getDetailPerson('${ma}')" class="btn btn-warning" >Sửa</button>
     </td>
  
      </tr>`;
    } else {
      let newCustomer = new Customer();
      newCustomer = { ...newCustomer, ...user };
      const { hoTen, ma, email, tenCongTy, triGiaHoaDon, danhGia } =
        newCustomer;

      content += `
    <tr class="select_item" data-output='Customer'>
    <td>${ma}</td>
      <td>${hoTen}</td>
      <td>${email}</td>
      <td >Customer</td>
      
      <td>Tên công ty :${tenCongTy}</br>Trị giá hoá đơn:${triGiaHoaDon}</br>Đánh giá:${danhGia}</td>
     <td>
     <button onclick="deleteItem('${ma}')" data-id ="${ma}"  class="btn btn-danger">Xoá</button>
     <button onclick="getDetailPerson('${ma}')" class="btn btn-warning" >Sửa</button>
     </td>
      </tr>`;
    }
  });
  document.getElementById("tbodyTable").innerHTML = content;
};

//Hàm giúp lưu trữ dữ liệu xuống localStorage
function saveDataLocal() {
  let stringData = JSON.stringify(listPerson.listP);
  localStorage.setItem("arr", stringData);
}

// Hàm giúp lấy dữ liệu từ localStorage
function getDataLocal() {
  let stringData = localStorage.getItem("arr");
  //Kiểm tra nếu không bị null thì thêm dữ liệu vào mảng
  if (stringData) {
    listPerson.listP = JSON.parse(stringData);
    renderArr();
  }
}
getDataLocal();
// hàm xoá
function deleteItem(idItem) {
  console.log(idItem);
  let index = listPerson.listP.findIndex((item) => item.ma === idItem);
  if (index !== -1) {
    listPerson.delteItem(index);
    saveDataLocal();
    renderArr();
  }
}

// Hàm giúp lấy thông tin trong mảng
let getDetailPerson = (itemID) => {
  let item = listPerson.listP.find((item) => {
    return item.ma == itemID;
  });

  if (item) {
    const arrField = document.querySelectorAll(
      "#formModal input, #formModal select, #formModal textarea"
    );
    arrField.forEach((field) => {
      let { id } = field;
      console.log(id);
      field.value = item[id];
    });
    // Hoạt động
    if (selectDoiTuong.value == "") {
      txt_toan.style.display = "none";
      txt_ly.style.display = "none";
      txt_hoa.style.display = "none";
      txt_soNgayLamViec.style.display = "none";
      txt_luong1Ngay.style.display = "none";
      txt_tenCongTy.style.display = "none";
      txt_triGiaHoaDon.style.display = "none";
      txt_danhGia.style.display = "none";
    } else if (selectDoiTuong.value == STUDENT) {
      txt_toan.style.display = "block";
      txt_ly.style.display = "block";
      txt_hoa.style.display = "block";
      txt_soNgayLamViec.style.display = "none";
      txt_luong1Ngay.style.display = "none";
      txt_tenCongTy.style.display = "none";
      txt_triGiaHoaDon.style.display = "none";
      txt_danhGia.style.display = "none";
    } else if (selectDoiTuong.value == EMPLOYEE) {
      txt_toan.style.display = "none";
      txt_ly.style.display = "none";
      txt_hoa.style.display = "none";
      txt_soNgayLamViec.style.display = "block";
      txt_luong1Ngay.style.display = "block";
      txt_tenCongTy.style.display = "none";
      txt_triGiaHoaDon.style.display = "none";
      txt_danhGia.style.display = "none";
    } else {
      txt_toan.style.display = "none";
      txt_ly.style.display = "none";
      txt_hoa.style.display = "none";
      txt_soNgayLamViec.style.display = "none";
      txt_luong1Ngay.style.display = "none";
      txt_tenCongTy.style.display = "block";
      txt_triGiaHoaDon.style.display = "block";
      txt_danhGia.style.display = "block";
    }
    // Bật modal
    let modalElement = document.getElementById("modalId");
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
    document.getElementById("ma").readOnly = true;
    document.getElementById("btn_capNhap").style.display = "block";
    document.getElementById("btn_ThemDuLieu").style.display = "none";
  }
};

function searchUser(event) {
  let valueUser = event.target.value;
  console.log(valueUser);
  let keyword = valueUser.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyword);
  console.log(newKeyWord);
  let arrUserFilter = [];
  console.log(listPerson);
  for (let i = 0; i < listPerson.listP.length; i++) {
    console.log(listPerson.listP[i]);
    let User = listPerson.listP[i];
    console.log(User);
    let newUser = removeVietnameseTones(User.hoTen.trim().toLowerCase());
    if (newUser.includes(newKeyWord)) {
      arrUserFilter.push(User);
    }
  }
  renderArr(arrUserFilter);
  console.log(arrUserFilter);
}
window.searchUser = searchUser;

window.onload = () => {
  window.deleteItem = (idItem) => {
    console.log(idItem);
    deleteItem(idItem);
  };
  window.getDetailPerson = (idItem) => {
    getDetailPerson(idItem);
  };
};
// Hàm cập nhật
let updateItem = () => {
  const arrField = document.querySelectorAll(
    "#formModal input, #formModal select, #formModal textarea"
  );
  let person;

  if (selectDoiTuong.value === STUDENT) {
    person = new Student();
    assignStudentValues(person, arrField);
  } else if (selectDoiTuong.value === EMPLOYEE) {
    person = new Employee();
    assignEmployeeValues(person, arrField);
  } else if (selectDoiTuong.value === CUSTOMER) {
    person = new Customer();
    assignCustomerValues(person, arrField);
  }
  const itemID = document.getElementById("ma").value;
  let index = listPerson.listP.findIndex((item) => item.ma === itemID);
  if (index !== -1) {
    listPerson.listP[index] = person;
    saveDataLocal();
    renderArr();
  }
  // Hide the modal
  var modalElement = document.getElementById("modalId");
  var modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  //clear dữ liệu trong form
  document.getElementById("formModal").reset();
  saveDataLocal();
  document.getElementById("ma").readOnly = false;
};
document.getElementById("btn_capNhap").onclick = updateItem;
