getProducts();

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

// Hàm thêm sản phẩm
function createProduct() {
  // DOM và khởi tạo object product
  let product = {
    name: getElementById("namePhone").value,
    price: getElementById("price").value,
    screen: getElementById("screen").value,
    backCamera: getElementById("backCamera").value,
    frontCamera: getElementById("frontCamera").value,
    img: getElementById("img").value,
    desc: getElementById("desc").value,
    type: getElementById("type").value,
  };

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      return apiGetProducts();
    })
    .then((response) => {
      // response là kết quả promise của hàm apiGetProducts
      display(response.data);
      // Ẩn modal
      $("#addPhoneModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      // Xoá thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm hiển thị data ra giao diện
function display(products) {
  let html = products.reduce((result, value, index) => {
    let product = new Product(
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
              <td>${index + 1}</td>
              <td><strong>${product.name}</strong></td>
              <td>${product.price}</td>
              <td>
                <img src="${product.img}" alt="" width="100" height="100" />
              </td>
              <td>${product.desc}</td>
              <td class="" style="text-align: center">
                <button
                  class="btn my-3 me-1 bg-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#addphoneModal"
                  data-bs-whatever="@mdo"
                  id="btnEdit"
                >
                  Edit
                </button>

                <button
                  class="btn bg-danger"
                  onclick="deleteProduct('${product.id}')"
                  id="btnDelete"
                >
                  Delete
                </button>
              </td>
            </tr>
    `
    );
  }, "");

  document.getElementById("tablePhone").innerHTML = html;
}

document.getElementById("btnAddPhone").onclick = () => {
  document.getElementsByClassName("modal-title").innerHTML = "Thêm sản phẩm";
  document.getElementsByClassName("modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    <button class="btn btn-success" onclick="createProduct()">Save</button>
  `;
};
