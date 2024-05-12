document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-product-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(form);

    try {
      const response = await fetch('/product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('Product added:', result.data); // Log the added product data
      // You can redirect the user or show a success message here
    } catch (error) {
      console.error('Error adding product:', error.message);
      // Handle error: Show error message to the user
    }
  });
});
