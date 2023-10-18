// JavaScript code for CRUD operations and statistics calculations

// Array untuk menyimpan data
const data = [];
let selectedDataIndex = -1;

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



    // Mengganti tampilan saat tab diklik
    document.getElementById('tab-mean').addEventListener('click', () => {
        showMeanTab();
    });
    document.getElementById('tab-modus').addEventListener('click', () => {
        showModusTab();
    });
    document.getElementById('tab-median').addEventListener('click', () => {
        showMedianTab();
    });

    showData();
    calculateBounds();
}

// Tampilan untuk menghitung mean
function showMeanTab() {
    document.getElementById('mean-tab').style.display = 'block';
    document.getElementById('modus-tab').style.display = 'none';
    document.getElementById('median-tab').style.display = 'none';

    // Implementasikan tampilan konten untuk menghitung mean
    // Isi konten dapat ditambahkan di sini
}

// Tampilan untuk menghitung modus
function showModusTab() {
    document.getElementById('mean-tab').style.display = 'none';
    document.getElementById('modus-tab').style.display = 'block';
    document.getElementById('median-tab').style.display = 'none';

    // Implementasikan tampilan konten untuk menghitung modus
    // Isi konten dapat ditambahkan di sini
}

// Tampilan untuk menghitung median
function showMedianTab() {
    document.getElementById('mean-tab').style.display = 'none';
    document.getElementById('modus-tab').style.display = 'none';
    document.getElementById('median-tab').style.display = 'block';

    // Implementasikan tampilan konten untuk menghitung median
    // Isi konten dapat ditambahkan di sini
}

// Tampilkan data dalam tabel
function showData() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.value}</td>
            <td>
                <button onclick="editData(${index})" class="action-button edit-button">Edit</button>
                <button onclick="deleteData(${index})" class="action-button delete-button">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Menambahkan data
function addData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const value = parseFloat(document.getElementById('value').value);

    if (!id || !name || isNaN(value)) {
        alert('ID, Nama, dan Nilai harus diisi dengan benar.');
        return;
    }

    data.push({ id, name, value });
    showData();
    clearInput();
    calculateBounds();
}

// Menghapus data
function deleteData(index) {
    data.splice(index, 1);
    showData();
    clearInput();
    calculateBounds();
}

// Mengedit data
function editData(index) {
    selectedDataIndex = index;
    const selectedData = data[index];
    document.getElementById('id').value = selectedData.id;
    document.getElementById('name').value = selectedData.name;
    document.getElementById('value').value = selectedData.value;
    document.getElementById('add-button').style.display = 'none';
    document.getElementById('update-button').style.display = 'inline';
    document.getElementById('cancel-button').style.display = 'inline';
}

// Menyimpan data yang telah diubah
function saveData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const value = parseFloat(document.getElementById('value').value);

    if (!id || !name || isNaN(value)) {
        alert('ID, Nama, dan Nilai harus diisi dengan benar.');
        return;
    }

    data[selectedDataIndex] = { id, name, value };
    selectedDataIndex = -1;
    showData();
    clearInput();
    document.getElementById('add-button').style.display = 'inline';
    document.getElementById('update-button').style.display = 'none';
    document.getElementById('cancel-button').style.display = 'none';
    calculateBounds();
}

// Membatalkan pengeditan
function cancelEdit() {
    selectedDataIndex = -1;
    clearInput();
    document.getElementById('add-button').style.display = 'inline';
    document.getElementById('update-button').style.display = 'none';
    document.getElementById('cancel-button').style.display = 'none';
    calculateBounds();
}

// Menghitung dan menampilkan batas atas dan batas bawah
function calculateBounds() {
    if (data.length === 0) {
        document.getElementById('upper-bound').textContent = '-';
        document.getElementById('lower-bound').textContent = '-';
        return;
    }

    const values = data.map(item => item.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    const upperBound = max + 0.1 * range;
    const lowerBound = min - 0.1 * range;

    document.getElementById('upper-bound').textContent = upperBound.toFixed(2);
    document.getElementById('lower-bound').textContent = lowerBound.toFixed(2);
}

// Membersihkan input
function clearInput() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('value').value = '';
}

// Inisialisasi
showInitialView();
document.getElementById('add-button').addEventListener('click', addData);
document.getElementById('update-button').addEventListener('click', saveData);
document.getElementById('cancel-button').addEventListener('click', cancelEdit);
