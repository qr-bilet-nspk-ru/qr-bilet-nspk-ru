const validCodes = ["ABC1234", "DEF5678", "GHI9101", "JKL2345", "MNO6789", "PQR4321", "STU8765", "VWX0987", "YZA5432", "BCD6780"];

function checkCode() {
    const inputCode = document.getElementById("accessCode").value.toUpperCase();
    const errorMessage = document.getElementById("errorMessage");
    
    if (validCodes.includes(inputCode)) {
        window.location.href = "form.html";
    } else {
        errorMessage.textContent = "Неверный код доступа";
    }
}

function updateRoutes() {
    const transportType = document.getElementById("transportType").value; // Получаем тип транспорта
    const routeNumber = document.getElementById("routeNumber"); // Селектор маршрута

    // Список маршрутов для автобусов и троллейбусов
    const busRoutes = ["1", "10А", "5", "11", "18", "33Р"];
    const trolleybusRoutes = ["3", "4", "6", "10"];

    // Очищаем список маршрутов перед добавлением новых
    routeNumber.innerHTML = "<option value=''>Выберите маршрут</option>";

    // Заполняем список маршрутов в зависимости от типа транспорта
    const routes = transportType === "bus" ? busRoutes : trolleybusRoutes;

    // Для каждого маршрута создаем <option> и добавляем в список
    routes.forEach(route => {
        const option = document.createElement("option");
        option.value = route;
        option.textContent = route;
        routeNumber.appendChild(option);
    });
}

function submitForm() {
    const transportType = document.getElementById("transportType").value;
    const routeNumber = document.getElementById("routeNumber").value;
    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const entryTime = new Date().toISOString();
    
    localStorage.setItem("ticket", JSON.stringify({ transportType, routeNumber, vehicleNumber, entryTime }));
    window.location.href = "ticket.html";
}

function loadTicket() {
    const ticket = JSON.parse(localStorage.getItem("ticket"));
    if (!ticket) return;
    
    document.getElementById("transportType").textContent = ticket.transportType === "bus" ? "Автобус" : "Троллейбус";
    document.getElementById("routeNumber").textContent = ticket.routeNumber;
    document.getElementById("vehicleNumber").textContent = ticket.vehicleNumber;
    document.getElementById("entryDate").textContent = new Date(ticket.entryTime).toLocaleDateString();
    document.getElementById("entryTime").textContent = new Date(ticket.entryTime).toLocaleTimeString();
    document.getElementById("ticketSeries").textContent = `QR${Math.floor(Math.random() * 1000000000000)}`;
    
    // Новый формат номера билета (год, месяц, день, часы, минуты, секунды)
    const now = new Date();
    const ticketNumber = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds()}`;
    document.getElementById("ticketNumber").textContent = ticketNumber;
    
    

    setInterval(() => {
        const elapsed = Math.floor((new Date() - new Date(ticket.entryTime)) / 1000);
        const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
        const seconds = String(elapsed % 60).padStart(2, '0');
        document.getElementById("elapsedTime").textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
    
    generateQRCode(ticket);
}

function generateQRCode(ticket) {
    const qrData = `Транспорт: ${ticket.transportType}, Маршрут: ${ticket.routeNumber}, ТС: ${ticket.vehicleNumber}, Время входа: ${new Date(ticket.entryTime).toLocaleString()}, Стоимость: 46₽`;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    document.getElementById("qrCode").src = qrCodeURL;
}

function downloadTicket() {
    window.print();
}
