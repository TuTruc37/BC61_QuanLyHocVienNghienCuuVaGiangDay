//listPERSON LÀ DÙNG ĐẺ DÙNG HÀM XOÁ SỬA CẬP NHẬP
export default class ListPerson {
  listP = [];

  addPersonToList = function (item) {
    // console.log(item);
    //thêm món ăn vào mảng
    this.listP.push(item);
  };
  delteItem = function (index) {
    //tìm kiếm
    this.listP.splice(index, 1);
  };

  updateItem(itemId, newItem) {
    const index = this.listP.findIndex((item) => item.ma === itemId);
    if (index !== -1) {
      this.listP[index] = newItem;
    }
  }
}
