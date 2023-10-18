// JavaScript code for CRUD operations and statistics calculations

let data = [];
let selectedDataIndex = -1;

// Function to add a new data entry
function addData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const value = parseFloat(document.getElementById('value').value);

    if (!isNaN(value)) {
        const newData = { id, name, value };
        data.push(newData);
        updateTable();
        clearForm();
        calculateStatistics();
    } else {
        alert('Nilai harus berupa angka.');
    }
}

// Function to update a data entry
function updateData() {
    if (selectedDataIndex !== -1) {
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const value = parseFloat(document.getElementById('value').value);

        if (!isNaN(value)) {
            data[selectedDataIndex] = { id, name, value };
            updateTable();
            clearForm();
            calculateStatistics();
        } else {
            alert('Nilai harus berupa angka.');
        }
    }
}

// Function to delete a data entry
function deleteData() {
    if (selectedDataIndex !== -1) {
        data.splice(selectedDataIndex, 1);
        selectedDataIndex = -1;
        updateTable();
        clearForm();
        calculateStatistics();
    }
}

// Function to update the table with current data
function updateTable() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const row = tableBody.insertRow();
        row.innerHTML = `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].value}</td>
            <td>
                <button class="edit-button" onclick="editData(${i})">Edit</button>
                <button class="delete-button" onclick="deleteData(${i})">Hapus</button>
            </td>
        </tr>`;
    }
}

// Function to clear the data input form
function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('value').value = '';
    document.getElementById('add-button').style.display = 'block';
    document.getElementById('update-button').style.display = 'none';
    document.getElementById('cancel-button').style display = 'none';
}

// Function to edit a data entry
function editData(index) {
    selectedDataIndex = index;
    const selectedData = data[index];
    document.getElementById('id').value = selectedData.id;
    document.getElementById('name').value = selectedData.name;
    document.getElementById('value').value = selectedData.value;
    document.getElementById('add-button').style.display = 'none';
    document.getElementById('update-button').style.display = 'block';
    document.getElementById('cancel-button').style.display = 'block';
}

// Function to calculate statistics
function calculateStatistics() {
    const values = data.map(item => item.value);

    if (values.length === 0) {
        document.getElementById('mean').textContent = '-';
        document.getElementById('median').textContent = '-';
        document.getElementById('modus').textContent = '-';
        document.getElementById('upper-bound').textContent = '-';
        document.getElementById('lower-bound').textContent = '-';
    } else {
        const sum = values.reduce((total, value) => total + value, 0);
        const mean = sum / values.length;
        const sortedValues = values.slice().sort((a, b) => a - b);
        const middle = Math.floor(sortedValues.length / 2);
        const median = (sortedValues.length % 2 === 0) ?
            (sortedValues[middle - 1] + sortedValues[middle]) / 2 :
            sortedValues[middle];
        const counts = {};
        let maxCount = 0;
        let mode = [];

        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
            if (counts[value] > maxCount) {
                maxCount = counts[value];
                mode = [value];
            } else if (counts[value] === maxCount && !mode.includes(value)) {
                mode.push(value);
            }
        });

        const upperBound = sortedValues[Math.ceil(0.75 * sortedValues.length)];
        const lowerBound = sortedValues[Math.floor(0.25 * sortedValues.length)];

        document.getElementById('mean').textContent = mean.toFixed(2);
        document.getElementById('median').textContent = median.toFixed(2);
        document.getElementById('modus').textContent = mode.join(', ');
        document.getElementById('upper-bound').textContent = upperBound.toFixed(2);
        document.getElementById('lower-bound').textContent = lowerBound.toFixed(2);
    }
}

// Event listener for the "Tambah" button
document.getElementById('add-button').addEventListener('click', addData);

// Event listener for the "Simpan" button
document.getElementById('update-button').addEventListener('click', updateData);

// Event listener for the "Batal" button
document.getElementById('cancel-button').addEventListener('click', clearForm);

// Initialize the table and clear the form
updateTable();
clearForm();
calculateStatistics();
