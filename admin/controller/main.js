alert("Trang chỉ dành cho Admin");
getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm thêm sản phẩm
function createProduct() {
  // DOM và khởi tạo object product
  const product = {
    id: getElement("#id").value,
    name: getElement("#namePhone").value,
    price: getElement("#price").value,
    screen: getElement("#screen").value,
    backCamera: getElement("#backCamera").value,
    frontCamera: getElement("#frontCamera").value,
    img: getElement("#img").value,
    desc: getElement("#desc").value,
    type: getElement("#type").value,
  };

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
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

function selectProduct(productId) {
  // Hiển thị modal
  $("#addPhoneModal").modal("show");

  // Hiển thị title và footer của modal
  getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
    <button class="btn btn-success" onclick="updateProduct('${productId}')">Cập nhật</button>
  `;

  apiGetProductById(productId)
    .then((response) => {
      // Lấy thông tin sản phẩm thành công => hiển thị dữ liệu lên form
      let product = response.data;
      getElement("#id").value = product.id;
      getElement("#namePhone").value = product.name;
      getElement("#price").value = product.price;
      getElement("#screen").value = product.screen;
      getElement("#backCamera").value = product.backCamera;
      getElement("#frontCamera").value = product.frontCamera;
      getElement("#img").value = product.img;
      getElement("#desc").value = product.desc;
      getElement("#type").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
  // DOM và khởi tạo object new product
  let newProduct = {
    id: getElement("#id").value,
    name: getElement("#namePhone").value,
    price: getElement("#price").value,
    screen: getElement("#screen").value,
    backCamera: getElement("#backCamera").value,
    frontCamera: getElement("#frontCamera").value,
    img: getElement("#img").value,
    desc: getElement("#desc").value,
    type: getElement("#type").value,
  };

  apiUpdateProduct(productId, newProduct)
    .then(() => {
      // Cập nhật thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      $("#addPhoneModal").modal("hide");
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
              <td>${product.id}</td>
              <td>${product.price} $</td>
              <td>
                <img src="${product.img}" alt="" width="100" height="100" />
              </td>
              <td>${product.desc}</td>
              <td class="" style="text-align: center">
                <button
                  class="btn my-3 me-1 bg-warning"
                  onclick="selectProduct('${product.id}')"
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

// DOM thêm title và button khi nhấm button Add Phone
getElement("#btnAddPhone").onclick = () => {
  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
> Close </button>
    <button id="btnAdd" class="btn btn-success" onclick="createProduct()"
    
    >Thêm</button>

  `;
};
// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}

let searchArr = [];
// sắp sếp tăng dần
getElement("#sortUp").onclick = function () {
  apiGetProducts()
    .then((response) => {
      let searchArr = response.data;
      function compare(a, b) {
        const priceA = a.price;
        const priceB = b.price;

        let comparison = 0;
        if (priceA > priceB) {
          comparison = 1;
        } else if (priceA < priceB) {
          comparison = -1;
        }
        return comparison;
      }

      searchArr.sort(compare);
      display(searchArr);
    })
    .catch((error) => {
      console.log(error);
    });
};

// sắp xếp giảm dần
getElement("#sortDown").onclick = function () {
  apiGetProducts()
    .then((response) => {
      let searchArr = response.data;
      function compare(a, b) {
        const priceA = a.price;
        const priceB = b.price;

        let comparison = 0;
        if (priceA > priceB) {
          comparison = 1;
        } else if (priceA < priceB) {
          comparison = -1;
        }
        return comparison * -1;
      }

      searchArr.sort(compare);
      display(searchArr);
    })
    .catch((error) => {
      console.log(error);
    });
};
