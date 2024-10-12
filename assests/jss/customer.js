const products = 
[
    {
      id: 1,
      name: 'CET 126" UV Printer',
      category: "Printer",
      price: "$1,500",
      stock: 50,
      discount: "5%",
      value: "$75,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Graphtec FC8000 Cutter",
      category: "Cutter",
      price: "$2,000",
      stock: 30,
      discount: "10%",
      value: "$60,000",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Graphtec FC9000",
      category: "Cutter",
      price: "$2,500",
      stock: 25,
      discount: "15%",
      value: "$62,500",
      status: "Active",
    },
    {
      id: 4,
      name: "High-Speed Sewing Machine",
      category: "Machine",
      price: "$1,200",
      stock: 80,
      discount: "8%",
      value: "$96,000",
      status: "Active",
    },
    {
      id: 5,
      name: "Wide-Format Laminator",
      category: "Laminator",
      price: "$900",
      stock: 15,
      discount: "12%",
      value: "$13,500",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Graphic Cutter",
      category: "Cutter",
      price: "$1,700",
      stock: 20,
      discount: "20%",
      value: "$34,000",
      status: "Active",
    },
    {
      id: 7,
      name: "Industrial Printer",
      category: "Printer",
      price: "$5,500",
      stock: 10,
      discount: "7%",
      value: "$55,000",
      status: "Active",
    },
    {
      id: 8,
      name: "Laser Cutter",
      category: "Cutter",
      price: "$8,500",
      stock: 5,
      discount: "5%",
      value: "$42,500",
      status: "Inactive",
    },
  ];


let rowsPerPage = 3;  // Default number of rows per page
let currentPage = 1;

// Function to render table rows
function renderTable() {
const tableBody = document.getElementById('table-body');
tableBody.innerHTML = ""; // Clear existing rows

const start = (currentPage - 1) * rowsPerPage;
const end = Math.min(start + rowsPerPage, products.length);
const productsToDisplay = products.slice(start, end);

productsToDisplay.forEach(product => {
const statusClass = product.status === 'Active' ? 'text-success' : 'text-danger';
const row = `
<tr>
  <td>
    <label class="custom-checkbox">
      <input type="checkbox" class="customer-checkbox" data-id="${product.id}">
      <span class="checkmark"></span>
    </label>
  </td>
  <td>${product.name}</td>
  <td>${product.category} <img src="./assests/svg/copyIconGray.svg" /></td>
  <td>${product.price}<img src="./assests/svg/copyIconGray.svg" /></td>
  <td>${product.stock}</td>
  <td>${product.discount}</td>
  <td>${product.value}</td>
  <td><p class="${statusClass}">${product.status}</p></td>
</tr>
`;
tableBody.insertAdjacentHTML('beforeend', row);
});

updatePaginationInfo(start + 1, end, products.length); // Update the dynamic text {1-5 of X items}
updatePageSelect(); // Update the page selection dropdown
updateTotalPagesText(); // Update total pages text like (Page 1 of X)
}

// Function to update pagination info (e.g., {1-5 of 8 items})
function updatePaginationInfo(start, end, total) {
const paginationInfo = document.getElementById('pagination-info');
paginationInfo.textContent = `${start}-${end} of ${total} items`;
}

// Function to update the page selection dropdown
function updatePageSelect() {
const totalPages = Math.ceil(products.length / rowsPerPage);
const pageSelect = document.getElementById('page-select');
pageSelect.innerHTML = ''; // Clear existing options

for (let i = 1; i <= totalPages; i++) {
const option = `<option value="${i}">${i}</option>`;
pageSelect.insertAdjacentHTML('beforeend', option);
}

// Set the current page as the selected option
pageSelect.value = currentPage;

// Event listener for directly jumping to a page
pageSelect.addEventListener('change', function() {
currentPage = parseInt(this.value);
renderTable();
});
}

// Function to update total pages text (e.g., "Page 1 of X")
function updateTotalPagesText() {
const totalPages = Math.ceil(products.length / rowsPerPage);
const totalPagesText = document.getElementById('total-pages-text');
totalPagesText.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to handle pagination (previous/next buttons)
function handlePagination() {
document.getElementById('prev-page').addEventListener('click', function(event) {
event.preventDefault();
if (currentPage > 1) {
currentPage--;
renderTable();
}
});

document.getElementById('next-page').addEventListener('click', function(event) {
event.preventDefault();
const totalPages = Math.ceil(products.length / rowsPerPage);
if (currentPage < totalPages) {
currentPage++;
renderTable();
}
});
}

// Function to change rows per page
document.getElementById('items-per-page').addEventListener('change', function() {
rowsPerPage = parseInt(this.value); // Update rows per page
currentPage = 1;  // Reset to first page
renderTable();    // Re-render table with new rows per page
});

// Initial render
renderTable();
handlePagination();
// Function to handle 'Select All' functionality for customer table
function handleCustomerSelectAll() {
    const selectAll = document.getElementById('select-all-customers');
    const checkboxes = document.querySelectorAll('.customer-checkbox');
  
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
        } else if (document.querySelectorAll('.customer-checkbox:checked').length === checkboxes.length) {
          selectAll.checked = true;
        }
      });
    });
  }
  
  // Call the function to initialize the select all functionality
  handleCustomerSelectAll();
  