// JavaScript code for CRUD operations and statistics calculations

// Array untuk menyimpan data
const data = [];

// Fungsi untuk menambahkan data
function addData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const value = parseFloat(document.getElementById('value').value);

    if (!id || !name || isNaN(value)) {
        alert('ID, Nama, dan Nilai harus diisi dengan benar.');
        return;
    }

    data.push({ id, name, value });
    displayData();
    calculateStatistics();
    clearInput();
}

// Fungsi untuk menghapus data berdasarkan ID
function deleteData(id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
    displayData();
    calculateStatistics();
}

// Fungsi untuk menampilkan data ke dalam tabel
function displayData() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.value}</td>
            <td><button onclick="deleteData('${item.id}')">Hapus</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk menghitung statistik
function calculateStatistics() {
    const values = data.map(item => item.value);

    const mean = values.length > 0 ? values.reduce((acc, val) => acc + val, 0) / values.length : 0;
    
    const valueCounts = {};
    let modus = null;
    let modusCount = 0;
    values.forEach(val => {
        if (valueCounts[val]) {
            valueCounts[val]++;
            if (valueCounts[val] > modusCount) {
                modus = val;
                modusCount = valueCounts[val];
            }
        } else {
            valueCounts[val] = 1;
        }
    });

    const sortedValues = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 === 0
        ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
        : sortedValues[middle];

    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    const upperBound = max + 0.1 * range;
    const lowerBound = min - 0.1 * range;

    document.getElementById('mean').textContent = mean.toFixed(2);
    document.getElementById('modus').textContent = modus !== null ? modus.toFixed(2) : '-';
    document.getElementById('median').textContent = median.toFixed(2);
    document.getElementById('upper-bound').textContent = upperBound.toFixed(2);
    document.getElementById('lower-bound').textContent = lowerBound.toFixed(2);
}

// Fungsi untuk membersihkan input
function clearInput() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('value').value = '';
}

// Inisialisasi
document.getElementById('add-button').addEventListener('click', addData);

// Menampilkan statistik awal
calculateStatistics();
