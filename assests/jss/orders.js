const orders = [
    { id: 1, orderDate: '2024-10-01', orderType: 'Online', trackingId: 'TRK12345', orderTotal: '$500', status: 'Delivered' },
    { id: 2, orderDate: '2024-09-28', orderType: 'In-Store', trackingId: 'TRK67890', orderTotal: '$300', status: 'Pending' },
    { id: 3, orderDate: '2024-09-25', orderType: 'Online', trackingId: 'TRK54321', orderTotal: '$800', status: 'Shipped' },
    { id: 4, orderDate: '2024-09-22', orderType: 'In-Store', trackingId: 'TRK98765', orderTotal: '$150', status: 'Cancelled' },
    { id: 5, orderDate: '2024-09-19', orderType: 'Online', trackingId: 'TRK11122', orderTotal: '$1000', status: 'Delivered' },
  ];
  
  let rowsPerPageOrders = 3;  
  let currentPageOrders = 1;
  
  // Render table
  function renderOrdersTable() {
    const tableBodyOrder = document.getElementById('table-body-order');
    tableBodyOrder.innerHTML = "";
    
    const start = (currentPageOrders - 1) * rowsPerPageOrders;
    const end = Math.min(start + rowsPerPageOrders, orders.length);
    const ordersToDisplay = orders.slice(start, end);
  
    ordersToDisplay.forEach(order => {
      const statusClass = order.status === 'Delivered' ? 'text-success' : (order.status === 'Pending' ? 'text-warning' : 'text-danger');
      const row = `
        <tr>
          <td>
            <label class="custom-checkbox">
              <input type="checkbox" class="order-checkbox" data-id="${order.id}">
              <span class="checkmark"></span>
            </label>
          </td>
          <td>${order.orderDate}</td>
          <td>${order.orderType}</td>
          <td>${order.trackingId}</td>
          <td>${order.orderTotal}</td>
          <td>Action Placeholder</td>
          <td><p class="${statusClass}">${order.status}</p></td>
        </tr>
      `;
      tableBodyOrder.insertAdjacentHTML('beforeend', row);
    });
  
    updateOrdersPaginationInfo(start + 1, end, orders.length); 
    updateOrdersPageSelect();
    updateOrdersTotalPagesText();
  }
  
  // Update pagination info
  function updateOrdersPaginationInfo(start, end, total) {
    const paginationInfoOrder = document.getElementById('pagination-info-order');
    paginationInfoOrder.textContent = `${start}-${end} of ${total} items`;
  }
  
  // Update page select
  function updateOrdersPageSelect() {
    const totalPages = Math.ceil(orders.length / rowsPerPageOrders);
    const pageSelectOrder = document.getElementById('page-select-order');
    pageSelectOrder.innerHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      const option = `<option value="${i}">${i}</option>`;
      pageSelectOrder.insertAdjacentHTML('beforeend', option);
    }
  
    pageSelectOrder.value = currentPageOrders;
    pageSelectOrder.addEventListener('change', function() {
      currentPageOrders = parseInt(this.value);
      renderOrdersTable();
    });
  }
  
  // Update total pages text
  function updateOrdersTotalPagesText() {
    const totalPages = Math.ceil(orders.length / rowsPerPageOrders);
    const totalPagesTextOrder = document.getElementById('total-pages-text-order');
    totalPagesTextOrder.textContent = `Page ${currentPageOrders} of ${totalPages}`;
  }
  
  // Pagination controls
  function handleOrdersPagination() {
    document.getElementById('prev-page-order').addEventListener('click', function(event) {
      event.preventDefault();
      if (currentPageOrders > 1) {
        currentPageOrders--;
        renderOrdersTable();
      }
    });
  
    document.getElementById('next-page-order').addEventListener('click', function(event) {
      event.preventDefault();
      const totalPages = Math.ceil(orders.length / rowsPerPageOrders);
      if (currentPageOrders < totalPages) {
        currentPageOrders++;
        renderOrdersTable();
      }
    });
  }
  
  // Change rows per page
  document.getElementById('items-per-page-order').addEventListener('change', function() {
    rowsPerPageOrders = parseInt(this.value); 
    currentPageOrders = 1; 
    renderOrdersTable(); 
  });
  
  // Initial render
  renderOrdersTable();
  handleOrdersPagination();
  // Function to handle 'Select All' functionality for order table
function handleOrderSelectAll() {
    const selectAll = document.getElementById('select-all-orders');
    const checkboxes = document.querySelectorAll('.order-checkbox');
  
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
        } else if (document.querySelectorAll('.order-checkbox:checked').length === checkboxes.length) {
          selectAll.checked = true;
        }
      });
    });
  }
  
  // Call the function to initialize the select all functionality
  handleOrderSelectAll();
  