const employeeRoles = [
    { id: 1, name: 'John Doe', email:'john@gmail.com',  empId: 'E12394332', role: 'Manager', status: 'Active' },
    { id: 2, name: 'Jane Smith', email:'jane@gmail.com', empId: 'E12434344', role: 'Engineer', status: 'Inactive' },
    { id: 3, name: 'Sam Green', email:'sam@gmail.com', empId: 'E12544343', role: 'HR', status: 'Active' },
    { id: 4, name: 'Sara Blue', email:'sara@gmail.com', empId: 'E12643433', role: 'Designer', status: 'Active' },
    { id: 5, name: 'Tom Brown', email:'tom@gmail.com', empId: 'E12743443', role: 'Sales', status: 'Inactive' },
    { id: 6, name: 'Alex White', email:'alex@gmail.com', empId: 'E12843343', role: 'Technician', status: 'Active' }
    // Add more as needed...
  ];
  let currentPageEmpRole = 1;
  const rowsPerPageEmpRole = 2;  // Fixed number of rows per page
  
  function renderEmployeeRoleTable() {
    const tableBody = document.getElementById('table-body-emp-role');
    tableBody.innerHTML = ""; // Clear existing rows
  
    const start = (currentPageEmpRole - 1) * rowsPerPageEmpRole;
    const end = Math.min(start + rowsPerPageEmpRole, employeeRoles.length);
    const rolesToDisplay = employeeRoles.slice(start, end);
  
    rolesToDisplay.forEach(role => {
      const statusClass = role.status === 'Active' ? 'custom-active' : 'custom-inactive';
      const row = `
        <tr>
          <td>
            <label class="custom-checkbox">
              <input type="checkbox" class="emp-role-checkbox" data-id="${role.id}">
              <span class="checkmark"></span>
            </label>
          </td>
          
          <td class="d-flex">
          <img src="./assests/svg/Avatar.svg"  />
          <div class="pl-3">
          <p class="semi-bold-name mb-0 pb-1 ">${role.name}</p>
          <small class="mb-0">${role.email}</small>
          </div>
          </td>
          <td><p class="custom-blue">${role.empId}</p></td>
          <td>${role.role}</td>
          <td><p class="${statusClass}">${role.status}</p></td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });
  
    updatePaginationButtonsEmpRole(); // Update the pagination buttons
  }
  
  // Function to update pagination buttons
  function updatePaginationButtonsEmpRole() {
    const totalPages = Math.ceil(employeeRoles.length / rowsPerPageEmpRole);
    const paginationNumbers = document.getElementById('pagination-numbers-emp-role');
    paginationNumbers.innerHTML = ''; // Clear existing page numbers
  
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = `<li class="page-item ${i === currentPageEmpRole ? 'active' : ''}">
                          <a class="page-link" href="#">${i}</a>
                        </li>`;
      paginationNumbers.insertAdjacentHTML('beforeend', pageItem);
    }
  
    // Event listener for page number clicks
    paginationNumbers.querySelectorAll('.page-link').forEach((pageLink, index) => {
      pageLink.addEventListener('click', function(event) {
        event.preventDefault();
        currentPageEmpRole = index + 1;
        renderEmployeeRoleTable();
      });
    });
  }
  
  // Handle Previous/Next buttons
  document.getElementById('prev-page-emp-role').addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPageEmpRole > 1) {
      currentPageEmpRole--;
      renderEmployeeRoleTable();
    }
  });
  
  document.getElementById('next-page-emp-role').addEventListener('click', function(event) {
    event.preventDefault();
    const totalPages = Math.ceil(employeeRoles.length / rowsPerPageEmpRole);
    if (currentPageEmpRole < totalPages) {
      currentPageEmpRole++;
      renderEmployeeRoleTable();
    }
  });
  
  // Checkbox select/deselect all logic
  document.getElementById('select-all-emp-role').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.emp-role-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
  });
  
  renderEmployeeRoleTable();  // Initial render
  