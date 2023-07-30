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
                <img src="${product.img}" alt="" width="150" height="150" />
              </td>
              <td>${product.desc}</td>
              <td class="" style="text-align: center">
                <button
                  class="btn my-3 me-1 bg-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#editPhoneModal"
                  onclick="btnEdit('3')"
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
