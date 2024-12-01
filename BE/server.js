const express = require('express');
const cors = require('cors')
const mysql = require('mysql2/promise');
const app = express();

app.use(cors())
app.use(express.json());

// Kết nối tới MySQL
const db = mysql.createPool({
    host: 'db', // Tên service trong docker-compose
    user: 'user',
    password: '123@Abcd',
    database: 'maytinh'
});

// Tạo bảng nếu chưa tồn tại
db.query(`
    CREATE TABLE IF NOT EXISTS calculations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        num1 FLOAT NOT NULL,
        num2 FLOAT NOT NULL,
        operation VARCHAR(10) NOT NULL,
        result FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

// API lưu lịch sử
app.post('/save-calculation', async (req, res) => {
    const { num1, num2, operation, result } = req.body;
    try {
        await db.query('INSERT INTO calculations (num1, num2, operation, result) VALUES (?, ?, ?, ?)', [num1, num2, operation, result]);
        res.status(201).send('Calculation saved');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to save calculation');
    }
});

app.get('/get-history', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM calculations ORDER BY id DESC LIMIT 10');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch history:', error);
        res.status(500).send('Internal server error.');
    }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
