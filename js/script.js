document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTables
    initDataTable();
    
    // Initialize FullCalendar
    initCalendar();
    
    // Smooth scrolling for navigation links
    initSmoothScroll();
    
    // Contact form validation
    initContactForm();
    
    // Add animation on scroll
    initScrollAnimation();
});

// DataTables initialization
function initDataTable() {
    $('#projectsTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
        },
        pageLength: 5,
        lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "Todos"]],
        columnDefs: [
            { className: "align-middle", targets: "_all" }
        ]
    });
}

// FullCalendar initialization
function initCalendar() {
    var calendarEl = document.getElementById('calendar');
    
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        locale: 'es',
        height: 'auto',
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5], // Lunes - Viernes
            startTime: '09:00',
            endTime: '18:00',
        },
        events: [
            {
                title: 'Reunión Disponible',
                start: getTomorrowAt(10, 0),
                end: getTomorrowAt(11, 0),
                color: '#3498db'
            },
            {
                title: 'Reunión Disponible',
                start: getTomorrowAt(14, 0),
                end: getTomorrowAt(15, 0),
                color: '#3498db'
            },
            {
                title: 'Reunión Disponible',
                start: getNextBusinessDay(getTomorrowDate(), 1, 11, 0),
                end: getNextBusinessDay(getTomorrowDate(), 1, 12, 0),
                color: '#3498db'
            },
            {
                title: 'Reunión Disponible',
                start: getNextBusinessDay(getTomorrowDate(), 2, 15, 0),
                end: getNextBusinessDay(getTomorrowDate(), 2, 16, 0),
                color: '#3498db'
            },
        ],
        eventClick: function(info) {
            if (info.event.title === 'Reunión Disponible') {
                if (confirm('¿Desea agendar una reunión en este horario?')) {
                    alert('Reunión agendada con éxito. Recibirá un correo de confirmación.');
                    info.event.setProp('title', 'Reunión Agendada');
                    info.event.setProp('color', '#e74c3c');
                }
            } else {
                alert('Este horario ya está reservado.');
            }
        },
        dateClick: function(info) {
            const clickedDate = info.date;
            const today = new Date();
            
            // Solo permitir seleccionar fechas futuras y días laborables (Lun-