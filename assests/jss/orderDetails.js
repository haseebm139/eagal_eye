document.addEventListener('DOMContentLoaded', function() {
    const orderDetails = [
      { id: 1, name: 'Product A', category: 'Category 1', price: '$100', stock: 10, discount: '10%', value: '$90', action: 'Edit' },
      { id: 2, name: 'Product B', category: 'Category 2', price: '$150', stock: 5, discount: '15%', value: '$127.5', action: 'Edit' },
      { id: 3, name: 'Product C', category: 'Category 3', price: '$200', stock: 8, discount: '5%', value: '$190', action: 'Edit' },
    ];
  
    let rowsPerPageorderDetails = 3;
    let currentPageorderDetails = 1;
  
    function renderorderDetailsTable() {
      const tableBody = document.getElementById('table-body1');
      tableBody.innerHTML = "";
  
      const start = (currentPageorderDetails - 1) * rowsPerPageorderDetails;
      const end = Math.min(start + rowsPerPageorderDetails, orderDetails.length);
      const orderDetailsToDisplay = orderDetails.slice(start, end);
  
      orderDetailsToDisplay.forEach(product => {
        const row = `
          <tr>
            <td>
              <label class="custom-checkbox">
                <input type="checkbox" class="product-checkbox" data-id="${product.id}">
                <span class="checkmark"></span>
              </label>
            </td>
            <td>
              <div class="orderImage">
                <img src="./assests/image_715.png" />
              </div>
            </td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.discount}</td>
            <td>${product.value}</td>
            <td>${product.action}</td>
            <td>
              <span class="Assigned" id="assignButton-${product.id}">
                Assign to
                <img src="./assests/svg/fi_chevron-down2.svg" />
              </span>
              <div class="dropdown-like" id="dropdown-${product.id}" style="display:none;">
                <input type="text" id="searchInput-${product.id}" placeholder="Search" />
                <ul id="assignList-${product.id}">
                  <li><label><img src="./assests/Image.png" class="user-avatar" /> Janet Adebayo</label></li>
                  <li><label><img src="./assests/image_726.png" class="user-avatar" /> Samuel Johnson</label></li>
                  <li><label><img src="./assests/image_715.png" class="user-avatar" /> Christian Dior</label></li>
                </ul>
              </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
  
        // Handle dropdown toggle
        document.getElementById(`assignButton-${product.id}`).addEventListener('click', function() {
          const dropdown = document.getElementById(`dropdown-${product.id}`);
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
  
        // Handle selection in dropdown
        document.getElementById(`assignList-${product.id}`).addEventListener('click', function(e) {
          if (e.target.tagName === 'LABEL' || e.target.tagName === 'IMG') {
            const selectedName = e.target.closest('label').textContent.trim();
            const assignButton = document.getElementById(`assignButton-${product.id}`);
            assignButton.innerHTML = `${selectedName} <img src="./assests/svg/fi_chevron-down2.svg" />`;
            document.getElementById(`dropdown-${product.id}`).style.display = 'none';
          }
        });
      });
  
      updateorderDetailsPaginationInfo(start + 1, end, orderDetails.length);
      updateorderDetailsPageSelect();
      updateorderDetailsTotalPagesText();
    }
  
    function updateorderDetailsPaginationInfo(start, end, total) {
      const paginationInfo = document.getElementById('pagination-info-orderDetails');
      if (paginationInfo) {
        paginationInfo.textContent = `${start}-${end} of ${total} items`;
      }
    }
  
    function updateorderDetailsPageSelect() {
      const totalPages = Math.ceil(orderDetails.length / rowsPerPageorderDetails);
      const pageSelect = document.getElementById('page-select-orderDetails');
      if (pageSelect) {
        pageSelect.innerHTML = '';
  
        for (let i = 1; i <= totalPages; i++) {
          const option = `<option value="${i}">${i}</option>`;
          pageSelect.insertAdjacentHTML('beforeend', option);
        }
  
        pageSelect.value = currentPageorderDetails;
        pageSelect.addEventListener('change', function() {
          currentPageorderDetails = parseInt(this.value);
          renderorderDetailsTable();
        });
      }
    }
  
    function updateorderDetailsTotalPagesText() {
      const totalPages = Math.ceil(orderDetails.length / rowsPerPageorderDetails);
      const totalPagesText = document.getElementById('total-pages-text-orderDetails');
      if (totalPagesText) {
        totalPagesText.textContent = `Page ${currentPageorderDetails} of ${totalPages}`;
      }
    }
  
    const itemsPerPageSelect = document.getElementById('items-per-page-orderDetails');
    if (itemsPerPageSelect) {
      itemsPerPageSelect.addEventListener('change', function() {
        rowsPerPageorderDetails = parseInt(this.value);
        currentPageorderDetails = 1;
        renderorderDetailsTable();
      });
    }
  
    const prevPageButton = document.getElementById('prev-page-orderDetails');
    if (prevPageButton) {
      prevPageButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (currentPageorderDetails > 1) {
          currentPageorderDetails--;
          renderorderDetailsTable();
        }
      });
    }
  
    const nextPageButton = document.getElementById('next-page-orderDetails');
    if (nextPageButton) {
      nextPageButton.addEventListener('click', function(event) {
        event.preventDefault();
        const totalPages = Math.ceil(orderDetails.length / rowsPerPageorderDetails);
        if (currentPageorderDetails < totalPages) {
          currentPageorderDetails++;
          renderorderDetailsTable();
        }
      });
    }
  
    function handleorderDetailselectAll() {
      const selectAll = document.getElementById('select-all-orderDetails');
      const checkboxes = document.querySelectorAll('.product-checkbox');
  
      if (selectAll) {
        selectAll.addEventListener('change', function () {
          checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
          });
        });
      }
  
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
  
    renderorderDetailsTable();
    handleorderDetailselectAll();
  });
  