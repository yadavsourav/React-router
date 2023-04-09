import { Suspense } from "react";   /*  The suspense component is a component which can be used in certain situations to show a fallback whilst we're waiting for other data to arrive. */
import { useLoaderData, json, defer, Await } from "react-router-dom";  // defer -> to render remaining component of page until data loads in navigate we achieved this but there we were rendering something else in place of remaining page component

import EventsList from '../components/EventsList';

function EventsPage() {
    /* const data = useLoaderData();
    const events = data.events;

    return (
        <>
            {<EventsList events={events} />}
        </>
    ); */

    const { events } = useLoaderData();
    console.log(events);

    return (

        <Suspense fallback={<p style={{ textAlign: "center " }}>Loading...</p>}>
            <Await resolve={events}>   
                {(loadedEvents) => <EventsList events={loadedEvents} />}        

            </Await>  {/* once we have the data than this line will execute by router */}

        </Suspense>

    );
};

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {/* 
        throw new Response(JSON.stringify({message: "500. Could not fetch events."}), {status: 500}); */
        throw json(
            { message: "500. could not fetch events." },
            { status: 500 },
        );
    } else {
        // const resData = await response.json();  // no need to do this react router will take care of it in case when it is return to loader or action but here this is not the case we have loader function in between so we will use it
        const resData = await response.json();   // async function always return a promise but here it is take cared by router
        return resData.events;
    }
}


export function loader() {
    return defer({
        events: loadEvents(),  // here to use defer we must have a promise as in this case loaderEvent is
    });
};