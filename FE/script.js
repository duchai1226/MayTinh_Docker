document.getElementById('calculateButton').addEventListener('click', async function () {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        result = "Please enter valid numbers!";
    } else {
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    result = "Cannot divide by zero!";
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                result = "Unknown operation!";
        }
    }

    document.getElementById('result').textContent = "Result: " + result;

    // Gửi dữ liệu lên Backend
    if (!isNaN(num1) && !isNaN(num2)) {
        try {
            await fetch('http://localhost:3000/save-calculation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1,
                    num2,
                    operation,
                    result,
                }),
            });

            // Lấy lịch sử sau khi lưu thành công
            loadHistory();
        } catch (error) {
            console.error('Failed to save calculation:', error);
        }
    }
});

// Hàm tải và hiển thị lịch sử
async function loadHistory() {
    try {
        const response = await fetch('http://localhost:3000/get-history');
        const history = await response.json();
        const historyList = document.getElementById('history');

        // Xóa lịch sử cũ
        historyList.innerHTML = '';

        // Hiển thị lịch sử mới
        history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.num1} ${item.operation} ${item.num2} = ${item.result}`;
            historyList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Failed to load history:', error);
    }
}

// Tải lịch sử khi trang được tải
document.addEventListener('DOMContentLoaded', loadHistory);
