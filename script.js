document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const eventModal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close');

    // Datos de eventos y promociones
    const events = [
        { date: '2024-08-15', title: 'Descuento en Frutas', description: '20% de descuento en todas las frutas.' },
        { date: '2024-08-24', title: 'Especial pollos', description: 'Promo especial, lleva 2 kilos de muslo a tan solo $2000.' },
        { date: '2024-08-05', title: 'Venta de Verduras', description: 'Lleva tus verduras frescas a un 15% de descuento' }
    ];

    // Creación de calendario
    function createCalendar() {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let calendarHTML = '<table><thead><tr>';

        // Encabezados de los días
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        days.forEach(day => calendarHTML += `<th>${day}</th>`);
        calendarHTML += '</tr></thead><tbody><tr>';

        // los días antes del primer día del mes
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<td></td>';
        }

        // Rellenar los días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = events.some(event => event.date === dateStr);

            calendarHTML += `<td class="${hasEvent ? 'event' : ''}" data-date="${dateStr}">${day}</td>`;

            if ((firstDay + day) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
        }

        calendarHTML += '</tr></tbody></table>';
        calendar.innerHTML = calendarHTML;
    }

    // Ventana modal con los detalles del evento
    function showEventDetails(date) {
        const event = events.find(event => event.date === date);
        if (event) {
            modalTitle.textContent = event.title;
            modalDescription.textContent = event.description;
            eventModal.style.display = 'block';
        }
    }

    // Cerrar ventana modal
    closeModal.addEventListener('click', function() {
        eventModal.style.display = 'none';
    });

    // Cerrar ventana modal si se hace clic fuera de ella
    window.addEventListener('click', function(event) {
        if (event.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });

    calendar.addEventListener('click', function(e) {
        if (e.target.tagName === 'TD' && e.target.dataset.date) {
            showEventDetails(e.target.dataset.date);
        }
    });

    createCalendar();
});
