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

  let product = validate();
  if (!product) {
  return;
  }

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
     .then(() => {
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
  const newProduct = validate();
  if (!newProduct) return;

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
              <td>${product.price.toLocaleString("en-US", {style:"currency", currency:"VND"})}</td>
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
 //Search
getElement("#txtSearch").onkeypress = (event) => {
  if(event.key !== "Enter"){
    return;
  }

  apiGetProducts(event.target.value)
  .then((response) => {
    display(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
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

//VALIDATE
//Ham kiem tra chuoi rong
function isRequired(value) {
  if (!value.trim()) {
     //chuoi rong
     return false;
  }
  return true;
}

//Hàm kiểm tra ID
function isId(value) {
  if(isNaN(value)){
    return false
  }
  if(value <0 || value > 999) {
    return false
  }
  return true
}

//Hàm kiểm tra tiền
function isPrice(value) {
  if(isNaN(value)){
    return false
  }
  if(value <0 || value > 999999999) {
    return false
  }
  return true
}

//Hàm kiểm tra IMG
function isUrl(value) {
  let regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/ ;
  return regex.test(value)
}
//Ham Validate -> Dom -> khởi tạo object
function validate() {
  let isValid = true;
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

  //ID
  if (!isRequired(product.id)) {
     //khong hop le
     isValid = false;
     getElement("#checkID").innerHTML = "ID không được để trống";
  } else if (!isId(+product.id)){
    isValid = false;
    getElement("#checkID").innerHTML = "ID Phải la số";
  }
  else {
     getElement("#checkID").innerHTML = "";
  }
  //name
  if (!isRequired(product.name)) {
     //khong hop le
     isValid = false;
     getElement("#checkName").innerHTML = "Name không được để trống";
  } else {
     getElement("#checkName").innerHTML = "";
  }
  //Price
  if (!isRequired(product.price)) {
     //khong hop le
     isValid = false;
     getElement("#checkPrice").innerHTML = "Price không được để trống";
  } else if (!isPrice(+product.price)) {
    isValid = false;
    getElement("#checkPrice").innerHTML = "Giá tiền không hợp lệ"
  } 
  else {
     getElement("#checkPrice").innerHTML = "";
  }
  //Screen
  if (!isRequired(product.screen)) {
     //khong hop le
     isValid = false;
     getElement("#checkScreen").innerHTML = "Screen không được để trống";
  } else {
     getElement("#checkScreen").innerHTML = "";
  }
  //Back Camera
  if (!isRequired(product.backCamera)) {
     //khong hop le
     isValid = false;
     getElement("#checkBCamera").innerHTML = "Back Camera không được để trống";
  } else {
     getElement("#checkBCamera").innerHTML = "";
  }
  //fontCamera
  if (!isRequired(product.frontCamera)) {
     //khong hop le
     isValid = false;
     getElement("#checkFCamera").innerHTML = "Font Camera không được để trống";
  } else {
     getElement("#checkFCamera").innerHTML = "";
  }
  //img
  if (!isRequired(product.img)) {
     //khong hop le
     isValid = false;
     getElement("#checkIMG").innerHTML = "Photo không được để trống";
  } else if (!isUrl(product.img)) {
    isValid = false;
    getElement("#checkIMG").innerHTML = "Url không hợp lệ";
  }else {
     getElement("#checkIMG").innerHTML = "";
  }

  //description
  if (!isRequired(product.desc)) {
     //khong hop le
    isValid = false;
     getElement("#checkDesc").innerHTML = "Mô tả không được để trống";
    } else {
     getElement("#checkDesc").innerHTML = "";
    }
  //type
  if (!isRequired(product.type)) {
     //khong hop le
     isValid = false;
     getElement("#checkType").innerHTML = "Brand không được để trống";
  } else {
     getElement("#checkType").innerHTML = "";
  }

  if (!isValid) {
     return;
  }

  return { ...product, price: product.price * 1 };
}
//Resetform
function resetForm() {
  getElement("#id").value = "";
  getElement("#namePhone").value = "";
  getElement("#price").value = "";
  getElement("#screen").value = "";
  getElement("#backCamera").value = "";
  getElement("#frontCamera").value = "";
  getElement("#img").value = "";
  getElement("#desc").value = "";
  getElement("#type").value = "";

  getElement("#checkID").innerHTML = "";
  getElement("#checkName").innerHTML = "";
  getElement("#checkPrice").innerHTML = "";
  getElement("#checkScreen").innerHTML = "";
  getElement("#checkBCamera").innerHTML = "";
  getElement("#checkFCamera").innerHTML = "";
  getElement("#checkIMG").innerHTML = "";
  getElement("#checkDesc").innerHTML = "";
  getElement("#checkType").innerHTML = "";
}

