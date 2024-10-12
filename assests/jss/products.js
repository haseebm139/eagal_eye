let productsPerPage = 3;  // Default number of products per page
let currentProductPage = 1;

// Function to render product table rows
function renderProductTable() {
  const tableBody = document.getElementById('table-body-products');
  tableBody.innerHTML = ""; // Clear existing rows

  const start = (currentProductPage - 1) * productsPerPage;
  const end = Math.min(start + productsPerPage, products.length);
  const productsToDisplay = products.slice(start, end);

  productsToDisplay.forEach(product => {
    const statusClass = product.status === 'Active' ? 'text-success' : 'text-danger';
    const row = `
      <tr>
        <td>
          <label class="custom-checkbox">
            <input type="checkbox" class="product-checkbox" data-id="${product.id}">
            <span class="checkmark"></span>
          </label>
        </td>
        <td></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.unitPrice}</td>
        <td>${product.inStock}</td>
        <td>${product.discount}</td>
        <td>${product.totalValue}</td>
        <td>---</td> <!-- Action column, no delete functionality -->
        <td><p class="${statusClass}">${product.status}</p></td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });

  updateProductPaginationInfo(start + 1, end, products.length); // Update dynamic text {1-5 of X items}
  updateProductPageSelect(); // Update the page selection dropdown
  updateTotalProductPagesText(); // Update total pages text like (Page 1 of X)
}

// Function to update pagination info (e.g., {1-5 of X items})
function updateProductPaginationInfo(start, end, total) {
  const paginationInfo = document.getElementById('pagination-info-products');
  paginationInfo.textContent = `${start}-${end} of ${total} items`;
}

// Function to update the page selection dropdown
function updateProductPageSelect() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageSelect = document.getElementById('page-select-products');
  pageSelect.innerHTML = ''; // Clear existing options

  for (let i = 1; i <= totalPages; i++) {
    const option = `<option value="${i}">${i}</option>`;
    pageSelect.insertAdjacentHTML('beforeend', option);
  }

  pageSelect.value = currentProductPage;

  // Event listener for directly jumping to a page
  pageSelect.addEventListener('change', function() {
    currentProductPage = parseInt(this.value);
    renderProductTable();
  });
}

// Function to update total pages text (e.g., "Page 1 of X")
function updateTotalProductPagesText() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const totalPagesText = document.getElementById('total-pages-text-products');
  totalPagesText.textContent = `Page ${currentProductPage} of ${totalPages}`;
}

// Function to handle pagination (previous/next buttons)
function handleProductPagination() {
  document.getElementById('prev-page-products').addEventListener('click', function(event) {
    event.preventDefault();
    if (currentProductPage > 1) {
      currentProductPage--;
      renderProductTable();
    }
  });

  document.getElementById('next-page-products').addEventListener('click', function(event) {
    event.preventDefault();
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentProductPage < totalPages) {
      currentProductPage++;
      renderProductTable();
    }
  });
}

// Function to change rows per page
document.getElementById('items-per-page-products').addEventListener('change', function() {
  productsPerPage = parseInt(this.value); // Update rows per page
  currentProductPage = 1;  // Reset to first page
  renderProductTable();    // Re-render table with new rows per page
});

// Initial render
renderProductTable();
handleProductPagination();

// Function to handle the 'Select All' functionality for product table
function handleProductSelectAll() {
    const selectAll = document.getElementById('select-all-products');
    const checkboxes = document.querySelectorAll('.product-checkbox');
  
    // Select or deselect all checkboxes
    selectAll.addEventListener('change', function () {
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
      });
    });
  
    // If any checkbox is deselected, uncheck the 'select all' checkbox
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        if (!this.checked) {
          selectAll.checked = false;
        } else if (document.querySelectorAll('.product-checkbox:checked').length === checkboxes.length) {
          selectAll.checked = true;
        }
      });
    });
  }
  
  // Call the function to initialize the select all functionality
  handleProductSelectAll();
  