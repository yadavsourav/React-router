import { useRouteLoaderData, json, redirect, defer,Await } from "react-router-dom";
import { Suspense } from 'react';
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
function EventDetail() {
    const { event, events } = useRouteLoaderData("event-detail");
    // const params = useParams();

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: "center " }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}

                </Await>

            </Suspense>

            <Suspense fallback={<p style={{ textAlign: "center " }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}

                </Await>

            </Suspense>

        </>
    );

};

export default EventDetail;

async function loadEvent(id) {

    const response = await fetch("http://localhost:8080/events/" + id);
    //  return fetch("http://localhost:8080/events/" + id);      // we can also do this like that as router will await it by itself
    if (!response.ok) {
        throw json({ message: "Could not fetch details for selected event." },
            { status: 500 })

    } else {
        const resData = await response.json();   

        return resData.event; // its a promised json object
    }

}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json(
            { message: "500. could not fetch events." },
            { status: 500 },
        );
    } else {

        const resData = await response.json();   // async function always return a promise but here it is take cared by router

        return resData.events;
    }

}

export async function loader({ request, params }) {
    const id = params.eventId;                    // we cant use regular params here as hooks can only used in react component

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    })

    /* 
you can simply add the await keyword here, and that will make sure that defer waits for this data to be loaded before loading this page component at all,
so before moving and navigating to this page component, but will load this data, the loadEvents data, after the page was loaded. */
}

export async function action({ params, request }) {
    const eventId = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + eventId, {
        method: request.method,
    });
    if (!response.ok) {
        throw json({ message: "Could not delete event." },
            { status: 500 })

    }

    return redirect("..");
}



