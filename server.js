const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/calculate', (req, res) => {
    const data = req.body.data;
    const process = spawn('your_cpp_program', data);
    let output = '';

    process.stdout.on('data', (data) => {
        output += data.toString();
    });

    process.on('close', (code) => {
        const result = parseOutput(output);
        res.json(result);
    });
});

function parseOutput(output) {
    // Implementasi parsing output dari program C++ Anda
    const parsedData = {
        mean: 0,
        modus: 0,
        median: 0,
        batasAtas: 0,
        batasBawah: 0,
        zTable: 0,
    };
    return parsedData;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
