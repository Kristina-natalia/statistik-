/* styles.css */

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    background-color: #fff;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
}

.data-entry {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.data-entry input {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.action-button {
    background-color: #4299e1;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.action-button:hover {
    background-color: #2b6cb0;
}

#update-button, #cancel-button {
    display: none;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #4299e1;
    color: #fff;
}

table, th, td {
    border: 1px solid #ccc;
}

th, td {
    text-align: center;
    padding: 10px;
}

.edit-button {
    background-color: #63ba69;
}

.edit-button:hover {
    background-color: #4e9e57;
}

.delete-button {
    background-color: #d9534f;
}

.delete-button:hover {
    background-color: #c9302c;
}

.statistics {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
}
