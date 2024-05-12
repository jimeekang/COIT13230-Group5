// Sample review data for test
const reviews = [
  {
    id: 1,
    userNumber: 1,
    userEmail: "kus@gmail.com",
    category: "Mobile",
    brand: "Apple",
    productName: "iPhone 15 Pro",
    review: "Review",
    starRate: 1,
    date: "2024-04-22",
  },

  {
    id: 2,
    userNumber: 2,
    userEmail: "john@example.com",
    category: "Laptop",
    brand: "Apple",
    productName: "MacBook Air",
    review: "Great product",
    starRate: 5,
    date: "2024-04-20",
  },
  {
    id: 3,
    userNumber: 3,
    userEmail: "sara@example.com",
    category: "Mobile",
    brand: "Samsung",
    productName: "Samsung Galaxy S21",
    review: "Nice phone",
    starRate: 4,
    date: "2024-04-21",
  },
];

// we use Function to render reviews
function renderReviews(reviewsToShow) {
  const reviewList = document.querySelector(".product-list tbody");
  reviewList.innerHTML = "";

  reviewsToShow.forEach((review, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${review.userNumber}</td>
      <td>${review.userEmail}</td>
      <td>${review.category}</td>
      <td>${review.brand}</td>
      <td>${review.productName}</td>
      <td>${review.review}</td>
      <td>${review.starRate}</td>
      <td>${review.date}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    reviewList.appendChild(row);
  });
}
// Here using Function to handle filter change

function handleFilterChange() {
  const category = document.getElementById("category").value;
  const brand = document.getElementById("brand").value;
  const sort = document.getElementById("sort").value;

  let filteredReviews = reviews;

  if (category !== "all") {
    filteredReviews = filteredReviews.filter(
      (review) => review.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand !== "all") {
    filteredReviews = filteredReviews.filter(
      (review) => review.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (sort === "recent") {
    filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  renderReviews(filteredReviews);
}

// Here using Function to handle search
function handleSearch() {
  const searchQuery = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();

  if (!searchQuery) {
    handleFilterChange();
    return;
  }

  const searchResults = reviews.filter(
    (review) =>
      review.productName.toLowerCase().includes(searchQuery) ||
      review.review.toLowerCase().includes(searchQuery)
  );

  renderReviews(searchResults);
}

document
  .getElementById("category")
  .addEventListener("change", handleFilterChange);
document.getElementById("brand").addEventListener("change", handleFilterChange);
document.getElementById("sort").addEventListener("change", handleFilterChange);
document.getElementById("search-btn").addEventListener("click", handleSearch);

// Now Initially  rendering the data
renderReviews(reviews);

// Here using  Function to handle editing a review
function handleEdit(reviewId) {
  const reviewToEdit = reviews.find(
    (review) => review.id === parseInt(reviewId)
  );
  if (reviewToEdit) {
    alert(`Editing review ${reviewId}: ${reviewToEdit.productName}`);
  } else {
    alert(`Review ${reviewId} not found.`);
  }
}

// Using Function to handle deleting a review
function handleDelete(reviewId) {
  const indexToDelete = reviews.findIndex(
    (review) => review.id === parseInt(reviewId)
  );

  if (indexToDelete !== -1) {
    reviews.splice(indexToDelete, 1);
    renderReviews(reviews);
    alert(`Review ${reviewId} deleted successfully.`);
  } else {
    alert(`Review ${reviewId} not found.`);
  }
}

// Adding event listeners for edit buttons
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const reviewId = button
      .closest("tr")
      .querySelector("td:first-child").innerText;
    handleEdit(reviewId);
  });
});

// Adding event listeners for delete buttons
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const reviewId = button
      .closest("tr")
      .querySelector("td:first-child").innerText;
    handleDelete(reviewId);
  });
});
