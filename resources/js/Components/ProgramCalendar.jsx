// ProgramCalendar.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // For month view
import interactionPlugin from '@fullcalendar/interaction'; // Optional: click, drag
import '../../css/app.css';


const ProgramCalendar = ({ programs }) => {
    const events = programs.map((program) => {
        const start = new Date(program.start_date);
        const end = new Date(start);
        end.setDate(start.getDate() + program.duration);

        return {
            title: program.title,
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0],
        };
    });

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                height={500}
            />
        </div>
    );
};

export default ProgramCalendar;
