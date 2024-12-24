import { AppointmentsTable } from "../components";
import { CalendarAppointments } from "../components/calendar-appointments";

export async function AppointmentPage() {
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2 className="font-bold">Turnos</h2>
      </div>
      <hr />
      <div className="flex flex-col gap-0 p-4 max-md:p-1">
        <CalendarAppointments />
      </div>
    </div>
  );
}
