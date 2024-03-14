import Person from "./Person.js";
export default class Student extends Person {
  toan = "";
  ly = "";
  hoa = "";

  tinhDiemTrungBinh = () => (this.toan * 1 + this.ly * 1 + this.hoa * 1) / 3;
}
