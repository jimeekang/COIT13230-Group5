//This is Sample product data for testing
// const products = [
//   {
//     id: 1,
//     category: 'mobile',
//     brand: 'Apple',
//     name: 'iPhone 12',
//     price: '$999',
//     description: 'Testing sample data',
//     date: '2024-04-22',
//   },
//   {
//     id: 2,
//     category: 'laptop',
//     brand: 'Apple',
//     name: 'MacBook Pro',
//     price: '$1499',
//     description: 'Testing sample data',
//     date: '2024-04-22',
//   },
//   {
//     id: 3,
//     category: 'mobile',
//     brand: 'Samsung',
//     name: 'Samsung Galaxy S22',
//     price: '$899',
//     description: 'Testing sample data',
//     date: '2024-04-22',
//   },
// ];
$(document).ready(function () {
  $.ajax({
    url: '/product',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data.data);

      let products = data.data;
      function renderProducts(productsToShow) {
        const productList = document.querySelector('.product-list tbody');
        productList.innerHTML = '';
        productsToShow.forEach((product, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.category}</td>
      <td>${product.brand}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td>${product.createdAt.slice(0, 10)}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
          productList.appendChild(row);
        });
      }

      // Here we use Function to handle filter change
      function handleFilterChange() {
        const category = document.getElementById('category').value;
        const brand = document.getElementById('brand').value;
        const sort = document.getElementById('sort').value;

        let filteredProducts = products;

        if (category !== 'all') {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          );
        }

        if (brand !== 'all') {
          filteredProducts = filteredProducts.filter(
            (product) => product.brand === brand
          );
        }

        if (sort === 'price') {
          filteredProducts.sort(
            (a, b) =>
              parseFloat(a.price.replace('$', '')) -
              parseFloat(b.price.replace('$', ''))
          );
        }

        renderProducts(filteredProducts);
      }

      // Here we use Function to handle search
      function handleSearch() {
        const searchQuery = document
          .getElementById('search')
          .value.trim()
          .toLowerCase();

        if (!searchQuery) {
          handleFilterChange(); // We are using Function to handle editing a product
          function handleEdit(productId) {
            // Here we use to Find the product to edit
            const productToEdit = products.find(
              (product) => product.id === parseInt(productId)
            );

            // Here displaying  an alert message to test it
            alert(`Editing product ${productId}: ${productToEdit.name}`);
          }

          // using function  to handle deleting a product
          function handleDelete(productId) {
            // Findind the index of the product to delete
            const indexToDelete = products.findIndex(
              (product) => product._id === productId
            );

            if (indexToDelete !== -1) {
              // Here Removing the product from the products array
              products.splice(indexToDelete, 1);

              // Re-rendering  the products
              renderProducts(products);

              // Optionally, here we  can display a message confirming deletion
              alert(`Product ${productId} deleted successfully.`);
            } else {
              // If the product with the given ID is not found
              alert(`Product ${productId} not found.`);
            }
          }

          // Here adding event listener for edit buttons
          document.querySelectorAll('.edit-btn').forEach((button) => {
            button.addEventListener('click', () => {
              const productId = button
                .closest('tr')
                .querySelector('td:first-child').innerText;
              handleEdit(productId);
            });
          });

          // Here adding event listener for delete buttons
          document.querySelectorAll('.delete-btn').forEach((button) => {
            button.addEventListener('click', () => {
              const productId = button
                .closest('tr')
                .querySelector('td:first-child').innerText;
              handleDelete(productId);
            });
          });

          return;
        }

        const searchResults = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );

        renderProducts(searchResults);
      }

      document
        .getElementById('category')
        .addEventListener('change', handleFilterChange);
      document
        .getElementById('brand')
        .addEventListener('change', handleFilterChange);
      document
        .getElementById('sort')
        .addEventListener('change', handleFilterChange);
      document
        .getElementById('search-btn')
        .addEventListener('click', handleSearch);

      // firsly in initial stage  rendering products
      renderProducts(products);

      // Here using a Function to handle editing a product
      function handleEdit(productId) {
        const productToEdit = products.find(
          (product) => product.id === parseInt(productId)
        );
        alert(`Editing product ${productId}: ${productToEdit.name}`);
      }

      // This is Delete function
      function handleDelete(productId) {
        // using the index of the product to delete
        const indexToDelete = products.findIndex(
          (product) => product.id === parseInt(productId)
        );

        if (indexToDelete !== -1) {
          products.splice(indexToDelete, 1);

          renderProducts(products);

          alert(`Product ${productId} deleted successfully.`);
        } else {
          alert(`Product ${productId} not found.`);
        }
      }

      // Adding event listener for edit buttons
      document.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button
            .closest('tr')
            .querySelector('td:first-child').innerText;
          handleEdit(productId);
        });
      });

      // Adding  event listener for delete buttons
      document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button
            .closest('tr')
            .querySelector('td:first-child').innerText;
          handleDelete(productId);
        });
      });
    },
  });
});
