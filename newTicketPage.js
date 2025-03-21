document.addEventListener("DOMContentLoaded", function() {
    // Получаем данные из localStorage
    const transport = localStorage.getItem("transport") || "Не указано"; 
    const route = localStorage.getItem("route") || "Не указано"; 
    const vehicleNumber = localStorage.getItem("vehicleNumber") || "Не указано";  
    const startTime = localStorage.getItem("startTime");

    // Если startTime не найдено, выводим ошибку
    if (!startTime) {
        alert("Ошибка: Время начала не найдено.");
        return;
    }

    // Обновляем элементы на странице
    document.getElementById("transport").textContent = `${transport}: №${route}`;
    document.getElementById("vehicleNumber").textContent = `Т/С: ${vehicleNumber}`;  // Отображаем номер Т/С
    document.getElementById("date").textContent = new Date().toLocaleString();

    // Функция для обновления времени отсчета
    function updateTimer() {
        const startTimeObj = new Date(startTime);
        const currentTimeObj = new Date();
        const timeDifference = new Date(currentTimeObj - startTimeObj);
        
        const hours = String(timeDifference.getUTCHours()).padStart(2, '0');
        const minutes = String(timeDifference.getUTCMinutes()).padStart(2, '0');
        const seconds = String(timeDifference.getUTCSeconds()).padStart(2, '0');
        
        const passedTime = `${hours}:${minutes}:${seconds}`;

        // Обновляем таймер на странице
        document.getElementById("timer").textContent = passedTime;
    }

    // Обновляем таймер каждую секунду
    setInterval(updateTimer, 1000);

    // Генерация QR-кода с данными пользователя
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=Тип%20транспорта%3A%20${transport}%2C%20Номер%20маршрута%3A%20${route}%2C%20Номер%20Т%2FС%3A%20${vehicleNumber}%2C%20Дата%3A%20${new Date().toLocaleString()}`;
    document.getElementById("qr-code").src = qrCodeUrl;
});
