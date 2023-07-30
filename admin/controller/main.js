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
  let product = {
    name: getElement("#name").value,
    price: +getElement("#price").value,
    screen: getElement("#screen").value,
    backCamera: getElement("#backCamera").value,
    fontCamera: getElement("#fontCamera").value,
    img: getElement("#img").value,
    desc: getElement("#desc").value,
    brand: getElement("#brand").value,
  };
  // gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      // Ẩn modal
      $("#exampleModalLabel").modal("hide");
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
    console.log(product.name);
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
                  onclick="btnDelete('3')"
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
