// =========================================

// =========================================

// getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      display(response.data);
      // console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm hiển thị data ra giao diện
function display(products) {
  let html = products.reduce((result, value) => {
    product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `
      <tr>
          <td>1</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
            <img src="${product.img}" width="100px" height="100px" />
          </td>
          `
    );
  }, "");
  document.getElementById("tblDanhSachSP").innerHTML = html;
}
