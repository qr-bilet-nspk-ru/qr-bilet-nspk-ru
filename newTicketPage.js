document.addEventListener("DOMContentLoaded", function() {
    // Получаем данные из localStorage
    const transport = localStorage.getItem("transport") || "Не указано"; 
    const route = localStorage.getItem("route") || "Не указано"; 
    const vehicleNumber = localStorage.getItem("vehicleNumber") || "Не указано";  
    
    // Устанавливаем startTime в sessionStorage (чтобы обнулять при обновлении страницы)
    let startTime = sessionStorage.getItem("startTime");
    if (!startTime) {
        startTime = Date.now();
        sessionStorage.setItem("startTime", startTime);
    }

    // Обновляем элементы на странице
    document.getElementById("transport").textContent = `${transport}: №${route}`;
    document.getElementById("vehicleNumber").textContent = `Т/С: ${vehicleNumber}`;
    document.getElementById("date").textContent = new Date().toLocaleString();

    // Функция для обновления времени отсчета
    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        
        const passedTime = `${minutes}:${seconds}`;
        document.getElementById("timer").textContent = passedTime;
    }

    // Обновляем таймер каждую секунду
    setInterval(updateTimer, 1000);
    updateTimer();

    // Генерация QR-кода с данными пользователя
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=Тип%20транспорта%3A%20${transport}%2C%20Номер%20маршрута%3A%20${route}%2C%20Номер%20Т%2FС%3A%20${vehicleNumber}%2C%20Дата%3A%20${new Date().toLocaleString()}`;
    document.getElementById("qr-code").src = qrCodeUrl;
});
