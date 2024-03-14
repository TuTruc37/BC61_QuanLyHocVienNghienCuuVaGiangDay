import Person from "./Person.js";
export default class Employee extends Person {
  soNgayLamViec = "";
  luong1Ngay = "";
  //phương thức
  tinhLuong = () => this.soNgayLamViec * 1 * this.luong1Ngay * 1;
}
