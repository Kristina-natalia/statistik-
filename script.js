// JavaScript code for Mean calculation and displaying it in a bar chart

let data = [];
let selectedDataIndex = -1;

// Menampilkan tab Mean saat halaman dimuat
showMeanTab();

// Menampilkan konten tab Mean
function showMeanTab() {
    document.getElementById('mean-tab').style.display = 'block';
    document.getElementById('modus-tab').style.display = 'none';
    document.getElementById('median-tab').style.display = 'none';

    // Contoh: Menampilkan data Mean dalam grafik
    const values = data.map(item => item.value);
    const mean = calculateMean(values);

    const meanChart = new Chart(document.getElementById('mean-chart'), {
        type: 'bar',
        data: {
            labels: ['Mean'],
            datasets: [{
                label: 'Mean',
                data: [mean],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function untuk menghitung Mean
function calculateMean(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((total, value) => total + value, 0);
    return sum / values.length;
}

// ... (Fungsi lainnya untuk CRUD, perhitungan statistik lainnya, dan tampilan)

