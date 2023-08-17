function apiGetProducts(searchValue) {
  return axios({
    url: "https://64bc101c7b33a35a4446fd69.mockapi.io/phone-data",
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64bc101c7b33a35a4446fd69.mockapi.io/phone-data/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://64bc101c7b33a35a4446fd69.mockapi.io/phone-data",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64bc101c7b33a35a4446fd69.mockapi.io/phone-data/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64bc101c7b33a35a4446fd69.mockapi.io/phone-data/${productId}`,
    method: "DELETE",
  });
}
