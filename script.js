document.getElementById("addAddressToggle").addEventListener("change", function () {
    const addressSection = document.getElementById("addressSection");
  
    // Show or hide address section based on the checkbox state
    if (this.checked) {
      addressSection.style.display = "block";
    } else {
      addressSection.style.display = "none";
    }
  });
  
//models
const addOrderBtn = document.getElementById("addOrderBtn")
const addCompanyBtn = document.getElementById("addCompanyBtn");

const newCompanyDiv = document.getElementById("newCompanyDiv");
        const newCompanyDiv1 = document.getElementById("newCompanyDiv1");
        const cancelBtn = document.getElementById("cancelBtn");
        const cancelBtn1 = document.getElementById("cancelBtn1");

         // Show the new company div when the button is clicked
         addCompanyBtn.addEventListener("click", () => {
            newCompanyDiv.style.display = "flex"; // Show the div
          });
  
          addOrderBtn.addEventListener("click", () => {
            newCompanyDiv1.style.display = "flex"; // Show the div
          });
  
          // Hide the new company div when the cancel button is clicked
          cancelBtn.addEventListener("click", () => {
            newCompanyDiv.style.display = "none"; // Hide the div
          });
          cancelBtn1.addEventListener("click", () => {
            newCompanyDiv1.style.display = "none"; // Hide the div
          });



  

const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all links
        document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
        
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});



  // Sample data
  const dataValues = [30, 50, 20]; // Change these values as needed
  const backgroundColors = ['#ff0000', '#fbbd00', '#ff8800']; // Colors for the segments
  const labels = ['Acquisition', 'Purchase', 'Retention']; // Labels

  // Create the chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        
          datasets: [{
              data: dataValues,
              backgroundColor: backgroundColors,
              borderWidth: 0,
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              }
          },
          cutout: '75%' // Adjust this value to change the size of the inner circle
      }
  });


   // Create a custom legend
   const legendContainer = document.getElementById('legend-container');
   labels.forEach((label, index) => {
       const legendItem = document.createElement('div');
       legendItem.classList.add('legend-item');

       const colorCircle = document.createElement('div');
       colorCircle.classList.add('legend-color');
       colorCircle.style.backgroundColor = backgroundColors[index];

       const labelText = document.createElement('span');
       labelText.textContent = label;

       legendItem.appendChild(colorCircle);
       legendItem.appendChild(labelText);
       legendContainer.appendChild(legendItem);
   });






   ///bar chart
       // Initialize custom data arrays
    const customLabels = ['Oct 01', 'Oct 02', 'Oct 03', 'Oct 04', 'Oct 05', 'Oct 06', 'Oct 07'];
    const customDataValues = [50000, 30000, 45000, 25000, 35000, 48000, 52000];

  // Custom plugin to draw the background behind the revenue bars
  const backgroundPlugin = {
    id: 'backgroundPlugin',
    beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const meta = chart.getDatasetMeta(0); // Bar dataset metadata
        const dataset = chart.data.datasets[0]; // Assuming the dataset for revenue

        ctx.save();
        ctx.fillStyle = 'rgba(200, 200, 200, 0.3)'; // Light gray for the background

        dataset.data.forEach((value, index) => {
            const bar = meta.data[index]; // Get the bar model (position and size)
            const x = bar.x - bar.width / 2; // Bar starting X position
            const y = chartArea.top; // Start from the top of the chart area
            const width = bar.width; // Bar width
            const height = chartArea.bottom - chartArea.top; // Full chart height

            // Draw background rectangle behind each bar
            ctx.fillRect(x, y, width, height);
        });

        ctx.restore();
    }
};
    // Chart.js configuration for the custom chart
    const customCtx = document.getElementById('customBarChart').getContext('2d');
    const customBarChart = new Chart(customCtx, {
        type: 'bar',
        data: {
            labels: customLabels,
            datasets: [{
                label: 'Revenue',
                data: customDataValues,
                backgroundColor: '#fcbf49', // Custom yellow color for the bars
                borderColor: '#fcbf49',
                borderWidth: 1,
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10000,
                        callback: function(value) {
                            return value + 'k';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            barPercentage: 0.2, // Adjust bar width
            categoryPercentage: 0.5, // Adjust spacing between bars
        },
        plugins: [backgroundPlugin] // Register the custom background plugin
    });

    // Handling form submission to add data dynamically
    document.getElementById('custom-data-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customDate = document.getElementById('custom-date-input').value;
        const customValue = parseInt(document.getElementById('custom-value-input').value);
        
        if (customDate && customValue) {
            // Add data to chart
            customLabels.push(customDate);
            customDataValues.push(customValue);
            customBarChart.update();
            
            // Clear input fields
            document.getElementById('custom-date-input').value = '';
            document.getElementById('custom-value-input').value = '';
        }
    });

    // Update chart when dropdowns are changed
    document.getElementById('data-category').addEventListener('change', function() {
        customBarChart.data.datasets[0].label = this.value;
        customBarChart.update();
    });

    document.getElementById('time-range').addEventListener('change', function() {
        const selectedRange = parseInt(this.value);

        // Slice the data based on the selected range
        const updatedLabels = customLabels.slice(-selectedRange);
        const updatedValues = customDataValues.slice(-selectedRange);

        customBarChart.data.labels = updatedLabels;
        customBarChart.data.datasets[0].data = updatedValues;
        customBarChart.update();
    });


    function previewUploadedFile(event) {
        const previewImage = document.getElementById('previewImage');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result; // Set the image source to the uploaded file
                
                // Remove the initial size and apply the full class to expand the image
                previewImage.style.width = '100%';  // Set width to 100% to fill the container
                previewImage.style.height = '100%'; // Set height to 100% to fill the container
                previewImage.style.position = 'absolute';
                previewImage.style.top = "0"
                previewImage.style.left ="0"
                previewImage.style.objectFit = 'cover'; // Ensure the image covers the whole div
                uploadPlaceholder.style.display = 'none'; // Hide the upload placeholder
            };
            
            reader.readAsDataURL(file);
        }
    }
    

    function previewUploadedFile2(event) {
       
        const previewImage2 = document.getElementById('previewImage2');
        const uploadPlaceholder2 = document.getElementById('uploadPlaceholder2');
        
        const file = event.target.files[0];
        
        if (file) {
            const reader2 = new FileReader();
            
            reader2.onload = function(e) {
                previewImage2.src = e.target.result; // Set the image source to the uploaded file
                
                // Remove the initial size and apply the full class to expand the image
                previewImage2.style.width = '100%';  // Set width to 100% to fill the container
                previewImage2.style.height = '100%'; // Set height to 100% to fill the container
                previewImage2.style.position = 'absolute';
                previewImage2.style.top = "0"
                previewImage2.style.left ="0"
                previewImage2.style.objectFit = 'cover'; // Ensure the image covers the whole div
                uploadPlaceholder2.style.display = 'none'; // Hide the upload placeholder
            }
            
            reader2.readAsDataURL(file);
        }
    }
    function previewUploadedFile3(event) {
      
        const previewImage3 = document.getElementById('previewImage3');
        const uploadPlaceholder3 = document.getElementById('uploadPlaceholder3');
        
        const file = event.target.files[0];
        
        if (file) {
            const reader2 = new FileReader();
            
            reader2.onload = function(e) {
                previewImage3.src = e.target.result; // Set the image source to the uploaded file
                
                // Remove the initial size and apply the full class to expand the image
                previewImage3.style.width = '100%';  // Set width to 100% to fill the container
                previewImage3.style.height = '100%'; // Set height to 100% to fill the container
                previewImage3.style.position = 'absolute';
                previewImage3.style.top = "0"
                previewImage3.style.left ="0"
                previewImage3.style.objectFit = 'cover'; // Ensure the image covers the whole div
                uploadPlaceholder3.style.display = 'none'; // Hide the upload placeholder
            }
            
            reader2.readAsDataURL(file);
        }
            
    }


    function previewUploadedFile4(event) {
      
        const previewImage4 = document.getElementById('previewImage4');
        const uploadPlaceholder4 = document.getElementById('uploadPlaceholder4');
        
        const file = event.target.files[0];
        
        if (file) {
            const reader4 = new FileReader();
            
            reader4.onload = function(e) {
                previewImage4.src = e.target.result; // Set the image source to the uploaded file
                
                // Remove the initial size and apply the full class to expand the image
                previewImage4.style.width = '100%';  // Set width to 100% to fill the container
                previewImage4.style.height = '100%'; // Set height to 100% to fill the container
                previewImage4.style.position = 'absolute';
                previewImage4.style.top = "0"
                previewImage4.style.left ="0"
                previewImage4.style.objectFit = 'cover'; // Ensure the image covers the whole div
                uploadPlaceholder4.style.display = 'none'; // Hide the upload placeholder
            }
            
            reader4.readAsDataURL(file);
        }
            
    }





    const fromBtn = document.getElementById('from-btn');
    const toBtn = document.getElementById('to-btn');
    
    fromBtn.addEventListener('click', () => {
      fromBtn.classList.add('active');
      toBtn.classList.remove('active');
    });
    
    toBtn.addEventListener('click', () => {
      toBtn.classList.add('active');
      fromBtn.classList.remove('active');
    });
    



    document.addEventListener("DOMContentLoaded", function() {
        const orders = [
            { id: 1, customer: "John Doe", date: "2024-10-01", status: "Shipped", total: "$100.00" },
            { id: 2, customer: "Jane Smith", date: "2024-10-02", status: "Pending", total: "$50.00" },
            { id: 3, customer: "Robert Brown", date: "2024-10-03", status: "Delivered", total: "$75.00" },
            { id: 4, customer: "Emily White", date: "2024-10-04", status: "Shipped", total: "$200.00" },
            { id: 5, customer: "Michael Green", date: "2024-10-05", status: "Pending", total: "$120.00" },
            { id: 6, customer: "Alice Black", date: "2024-10-06", status: "Delivered", total: "$30.00" },
            { id: 7, customer: "Tom Davis", date: "2024-10-07", status: "Cancelled", total: "$400.00" },
            { id: 8, customer: "Rachel Moore", date: "2024-10-08", status: "Delivered", total: "$90.00" },
            // Add more orders here as needed
        ];

        const rowsPerPageOrders = 3;
        let currentPageOrders = 1;

        const ordersTableBody = document.getElementById("ordersTableBody");
        const currentPageOrdersDisplay = document.getElementById("currentPageOrdersDisplay");
        const totalPagesOrdersDisplay = document.getElementById("totalPagesOrdersDisplay");
        const prevPageBtnOrders = document.getElementById("prevPageBtnOrders");
        const nextPageBtnOrders = document.getElementById("nextPageBtnOrders");

        // Function to render table rows
        function renderOrderTableRows() {
            const start = (currentPageOrders - 1) * rowsPerPageOrders;
            const end = start + rowsPerPageOrders;
            const paginatedOrders = orders.slice(start, end);

            ordersTableBody.innerHTML = "";
            paginatedOrders.forEach(order => {
                const row = `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.customer}</td>
                        <td>${order.date}</td>
                        <td>${order.status}</td>
                        <td>${order.total}</td>
                    </tr>
                `;
                ordersTableBody.innerHTML += row;
            });

            // Update page information
            currentPageOrdersDisplay.textContent = currentPageOrders;
            totalPagesOrdersDisplay.textContent = Math.ceil(orders.length / rowsPerPageOrders);
        }

        // Initial render
        renderOrderTableRows();

        // Event listener for Next button
        nextPageBtnOrders.addEventListener("click", function (e) {
            e.preventDefault();
            const totalPages = Math.ceil(orders.length / rowsPerPageOrders);
            if (currentPageOrders < totalPages) {
                currentPageOrders++;
                renderOrderTableRows();
            }
        });

        // Event listener for Previous button
        prevPageBtnOrders.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPageOrders > 1) {
                currentPageOrders--;
                renderOrderTableRows();
            }
        });
    });

