import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

function EventRoots() {
    return (
        <>
        <EventsNavigation />
        <Outlet />
        </>
    );

};

export default EventRoots;