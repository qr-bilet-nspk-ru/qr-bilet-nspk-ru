// Обработчик отправки формы
document.getElementById('update-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвратить стандартное поведение формы

    // Получаем значения из полей ввода
    const transport = document.getElementById('new-transport').value;
    const route = document.getElementById('new-route').value;
    const tc = document.getElementById('new-tc').value;

    // Проверка: Если все поля заполнены
    if (transport && route && tc) {
        // Формируем строку с параметрами для URL
        const queryParams = `transport=${encodeURIComponent(transport)}&route=${encodeURIComponent(route)}&tc=${encodeURIComponent(tc)}`;

        // Перенаправляем пользователя на новую страницу с параметрами
        window.location.href = `newTicketPage.html?${queryParams}`;
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
});
