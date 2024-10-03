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
        const imageUploader = document.getElementById('imageUploader');
        const previewImage = document.getElementById('previewImage');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
            }
            
            reader.readAsDataURL(file);
        }
    }



  
     


