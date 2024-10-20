

const customerOrders = [
    { id: 1, customerName: 'John Doe', orderDate: '2024-10-10', shipping: 'Express', location: 'New York', trackingId: 'CUST12345', qty: 2, orderTotal: '$250', assignStatus: 'Pending' },
    { id: 2, customerName: 'Jane Smith', orderDate: '2024-10-08', shipping: 'Standard', location: 'Los Angeles', trackingId: 'CUST67890', qty: 1, orderTotal: '$150', assignStatus: 'Shipped' },
    { id: 3, customerName: 'Robert Johnson', orderDate: '2024-10-05', shipping: 'Express', location: 'Chicago', trackingId: 'CUST54321', qty: 3, orderTotal: '$500', assignStatus: 'Delivered' },
    { id: 4, customerName: 'Emily Davis', orderDate: '2024-10-03', shipping: 'Standard', location: 'Houston', trackingId: 'CUST98765', qty: 4, orderTotal: '$600', assignStatus: 'Cancelled' },
    { id: 5, customerName: 'Michael Lee', orderDate: '2024-09-30', shipping: 'Express', location: 'Miami', trackingId: 'CUST11122', qty: 5, orderTotal: '$700', assignStatus: 'Shipped' },
  ];
  
  let rowsPerPageCustomerOrders = 3;  
  let currentPageCustomerOrders = 1;
  
  // Render table
  function renderCustomerOrdersTable() {
    const tableBodyCmOrder = document.getElementById('table-body-cm-order');
    
    tableBodyCmOrder.innerHTML = "";
  
    const start = (currentPageCustomerOrders - 1) * rowsPerPageCustomerOrders;
    const end = Math.min(start + rowsPerPageCustomerOrders, customerOrders.length);
    const customerOrdersToDisplay = customerOrders.slice(start, end);
  
    customerOrdersToDisplay.forEach(order => {
      const statusClass = order.assignStatus === 'Delivered' ? 'text-success' : (order.assignStatus === 'Shipped' ? 'text-info' : 'text-warning');
      const row = `
        <tr>
          <td>
            <label class="custom-checkbox">
              <input type="checkbox" class="cm-order-checkbox" data-id="${order.id}">
              <span class="checkmark"></span>
            </label>
          </td>
          <td id="customerName">${order.customerName}</td>
          <td>${order.orderDate}</td>
          <td>${order.shipping}</td>
          <td>${order.location}</td>
          <td>${order.trackingId}</td>
          <td>${order.qty}</td>
          <td>${order.orderTotal}</td>
      <td>
        <span class="Assigned" id="assignButton-${order.id}">
         Assign too
          <img src="./assests/svg/fi_chevron-down2.svg" />
        </span>
        <div class="dropdown-like" id="dropdown-${order.id}" style="display:none;">
          <input type="text" id="searchInput-${order.id}" placeholder="Search" />
          <ul id="assignList-${order.id}">
            <li>
              <label>
                 <img src="./assests/Image.png" alt="user-avatar" class="user-avatar" />
                Janet Adebayo
              </label>
            </li>
            <li>
              <label>
                <img src="./assests/image_715.png" alt="user-avatar" class="user-avatar" />
                Samuel Johnson
              </label>
            </li>
            <li>
              <label>
                <img src="./assests/image_54321.png" alt="user-avatar" class="user-avatar" />
                Christian Dior
              </label>
            </li>
          </ul>
        </div>
      </td>
        </tr>
      `;
      tableBodyCmOrder.insertAdjacentHTML('beforeend', row);
    

      document.getElementById(`assignButton-${order.id}`)?.addEventListener('click', function() {
      
        
        const dropdown = document.getElementById(`dropdown-${order.id}`);
       
        if (dropdown) {
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
          console.log(dropdown,'dropdown');
        }
      });
      
      document.getElementById(`assignList-${order.id}`)?.addEventListener('click', function(e) {
        if (e.target.tagName === 'LABEL' || e.target.tagName === 'IMG') {
          const labelElement = e.target.closest('label');
          if (labelElement) {
            const selectedName = labelElement.textContent.trim();
            const assignButton = document.getElementById(`assignButton-${order.id}`);
            if (assignButton) {
              assignButton.innerHTML = `${selectedName}   <img src="./assests/svg/fi_chevron-down2.svg" />`;
              const dropdown = document.getElementById(`dropdown-${order.id}`);
              if (dropdown) {
                dropdown.style.display = 'none';
              }
            }
          }
        }
      });
      
      
});
    
    updateCustomerOrdersPaginationInfo(start + 1, end, customerOrders.length);
    updateCustomerOrdersPageSelect();
    updateCustomerOrdersTotalPagesText();
  }
  
  // Update pagination info
  function updateCustomerOrdersPaginationInfo(start, end, total) {
    const paginationInfoCustomerOrders = document.getElementById('pagination-info-customer-orders');
    paginationInfoCustomerOrders.textContent = `${start}-${end} of ${total} items`;
  }
  
  // Update page select
  function updateCustomerOrdersPageSelect() {
    const totalPages = Math.ceil(customerOrders.length / rowsPerPageCustomerOrders);
    const pageSelectCustomerOrders = document.getElementById('page-select-customer-orders');
    pageSelectCustomerOrders.innerHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      const option = `<option value="${i}">${i}</option>`;
      pageSelectCustomerOrders.insertAdjacentHTML('beforeend', option);
    }
  
    pageSelectCustomerOrders.value = currentPageCustomerOrders;
    pageSelectCustomerOrders.addEventListener('change', function() {
      currentPageCustomerOrders = parseInt(this.value);
      renderCustomerOrdersTable();
    });
  }
  
  // Update total pages text
  function updateCustomerOrdersTotalPagesText() {
    const totalPages = Math.ceil(customerOrders.length / rowsPerPageCustomerOrders);
    const totalPagesTextCustomerOrders = document.getElementById('total-pages-text-customer-orders');
    totalPagesTextCustomerOrders.textContent = `Page ${currentPageCustomerOrders} of ${totalPages}`;
  }
  
  // Pagination controls
  function handleCustomerOrdersPagination() {
    document.getElementById('prev-page-customer-orders').addEventListener('click', function(event) {
      event.preventDefault();
      if (currentPageCustomerOrders > 1) {
        currentPageCustomerOrders--;
        renderCustomerOrdersTable();
      }
    });
  
    document.getElementById('next-page-customer-orders').addEventListener('click', function(event) {
      event.preventDefault();
      const totalPages = Math.ceil(customerOrders.length / rowsPerPageCustomerOrders);
      if (currentPageCustomerOrders < totalPages) {
        currentPageCustomerOrders++;
        renderCustomerOrdersTable();
      }
    });
  }
  
  // Change rows per page
  document.getElementById('items-per-page-customer-orders').addEventListener('change', function() {
    rowsPerPageCustomerOrders = parseInt(this.value); 
    currentPageCustomerOrders = 1;
    renderCustomerOrdersTable();
  });
  
  // Initial render
  renderCustomerOrdersTable();
  handleCustomerOrdersPagination();
  

  // Function to handle 'Select All' functionality for CM Order table
function handleCmOrderSelectAll() {
    const selectAll = document.getElementById('select-all-cm-orders');
    const checkboxes = document.querySelectorAll('.cm-order-checkbox');
  
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
        } else if (document.querySelectorAll('.cm-order-checkbox:checked').length === checkboxes.length) {
          selectAll.checked = true;
        }
      });
    });
  }
  
  // Call the function to initialize the select all functionality
  handleCmOrderSelectAll();
 

  const customerName = document.getElementById("customerName");
  const orderContainer = document.getElementById("orderContainer");
  const viewOrder = document.getElementById("viewOrder");
  const customerOrder = document.getElementById("customerOrders");
  const orderSummary = document.getElementById("viewSummary");

  // Check if the elements exist before adding event listeners
  if (customerName && orderContainer && viewOrder) {
    customerName.addEventListener("click", () => {
      orderContainer.style.display = "none";
      viewOrder.style.display = "block";
    });
  }

  if (customerOrder && orderContainer && orderSummary) {
    customerOrder.addEventListener("click", () => {
      orderContainer.style.display = "none";
      orderSummary.style.display = "block";
    });
  }



    let rowsPerPageCustomerOrders2 = 3;
let currentPageCustomerOrders2 = 1;

// Function to render the second table
function renderCustomerOrdersTable2() {
  const tableBodyCmOrder2 = document.getElementById('table-body-cm-order2');
  tableBodyCmOrder2.innerHTML = '';

  const start = (currentPageCustomerOrders2 - 1) * rowsPerPageCustomerOrders2;
  const end = Math.min(start + rowsPerPageCustomerOrders2, customerOrders.length);
  const customerOrdersToDisplay = customerOrders.slice(start, end);

  customerOrdersToDisplay.forEach(order => {
    const statusClass = order.assignStatus === 'Delivered' ? 'custom-active' : (order.assignStatus === 'Shipped' ? 'custom-inactive' : 'custom-inactive');
    const row = `
      <tr>
        <td>
          <label class="custom-checkbox">
            <input type="checkbox" class="cm-order-checkbox2" data-id="${order.id}">
            <span class="checkmark"></span>
          </label>
        </td>
        <td>${order.customerName}</td>
        <td>${order.orderDate}</td>
        <td>${order.shipping}</td>
        <td>${order.location}</td>
        <td>${order.trackingId}</td>
        <td>${order.qty}</td>
        <td>${order.orderTotal}</td>
         <td>
        <span class="Assigned" id="assignButton2-${order.id}">
         Assign too
          <img src="./assests/svg/fi_chevron-down2.svg" />
        </span>
        <div class="dropdown-like" id="dropdown2-${order.id}" style="display:none;">
          <input type="text" id="searchInput2-${order.id}" placeholder="Search" />
          <ul id="assignList2-${order.id}">
            <li>
              <label>
                 <img src="./assests/Image.png" alt="user-avatar" class="user-avatar" />
                Janet Adebayo
              </label>
            </li>
            <li>
              <label>
                <img src="./assests/image_715.png" alt="user-avatar" class="user-avatar" />
                Samuel Johnson
              </label>
            </li>
            <li>
              <label>
                <img src="./assests/image_54321.png" alt="user-avatar" class="user-avatar" />
                Christian Dior
              </label>
            </li>
          </ul>
        </div>
      </td>
        <td>
           <select
                        id="itemsPerPage"
                        class="form-select form-select-sm filter-dropdown"
                        style="width: auto"
                      >
                        <option value="3">bulk Action</option>
                        <option value="5">page</option>
                        <option value="10">per page</option>
                      </select>
        </td>
        <td><span class="${statusClass}">${order.assignStatus}</span></td>
      </tr>
    `;
    tableBodyCmOrder2.insertAdjacentHTML('beforeend', row);
    // Add event listener for each dropdown toggle
    document.getElementById(`assignButton2-${order.id}`).addEventListener('click', function() {
      const dropdown2 = document.getElementById(`dropdown2-${order.id}`);
      dropdown2.style.display = dropdown2.style.display === 'none' ? 'block' : 'none';
    });

    // Add event listener for selecting an assign option and close dropdown
    document.getElementById(`assignList2-${order.id}`).addEventListener('click', function(e) {
      if (e.target.tagName === 'LABEL' || e.target.tagName === 'IMG') {
        const labelElement2 = e.target.closest('label');
        const selectedName2 = labelElement2.textContent.trim();
        const assignButton2 = document.getElementById(`assignButton2-${order.id}`);

        // Update the "Assign too" text but keep the chevron icon
        assignButton2.innerHTML = `${selectedName2} <img src="./assests/svg/fi_chevron-down2.svg" />`;

        // Hide the dropdown after selection
        const dropdown2 = document.getElementById(`dropdown2-${order.id}`);
        dropdown2.style.display = 'none';
      }
    });
    
  });

  updateCustomerOrdersPaginationInfo2(start + 1, end, customerOrders.length);
  updateCustomerOrdersPageSelect2();
  updateCustomerOrdersTotalPagesText2();
}

// Update pagination info for second table
function updateCustomerOrdersPaginationInfo2(start, end, total) {
  const paginationInfoCustomerOrders2 = document.getElementById('pagination-info-customer-orders2');
  paginationInfoCustomerOrders2.textContent = `${start}-${end} of ${total} items`;
}

// Update page select for second table
function updateCustomerOrdersPageSelect2() {
  const totalPages = Math.ceil(customerOrders.length / rowsPerPageCustomerOrders2);
  const pageSelectCustomerOrders2 = document.getElementById('page-select-customer-orders2');
  pageSelectCustomerOrders2.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const option = `<option value="${i}">${i}</option>`;
    pageSelectCustomerOrders2.insertAdjacentHTML('beforeend', option);
  }

  pageSelectCustomerOrders2.value = currentPageCustomerOrders2;
  pageSelectCustomerOrders2.addEventListener('change', function () {
    currentPageCustomerOrders2 = parseInt(this.value);
    renderCustomerOrdersTable2();
  });
}

// Update total pages text for second table
function updateCustomerOrdersTotalPagesText2() {
  const totalPages = Math.ceil(customerOrders.length / rowsPerPageCustomerOrders2);
  const totalPagesTextCustomerOrders2 = document.getElementById('total-pages-text-customer-orders2');
  totalPagesTextCustomerOrders2.textContent = `Page ${currentPageCustomerOrders2} of ${totalPages}`;
}

// Pagination controls for second table
function handleCustomerOrdersPagination2() {
  document.getElementById('prev-page-customer-orders2').addEventListener('click', function (event) {
    event.preventDefault();
    if (currentPageCustomerOrders2 > 1) {
      currentPageCustomerOrders2--;
      renderCustomerOrdersTable2();
    }
  });

  document.getElementById('next-page-customer-orders2').addEventListener('click', function (event) {
    event.preventDefault();
    const totalPages = Math.ceil(customerOrders.length / rowsPerPageCustomerOrders2);
    if (currentPageCustomerOrders2 < totalPages) {
      currentPageCustomerOrders2++;
      renderCustomerOrdersTable2();
    }
  });
}

// Change rows per page for second table
document.getElementById('items-per-page-customer-orders2').addEventListener('change', function () {
  rowsPerPageCustomerOrders2 = parseInt(this.value);
  currentPageCustomerOrders2 = 1;
  renderCustomerOrdersTable2();
});

// Initial render for the second table
renderCustomerOrdersTable2();
handleCustomerOrdersPagination2();
