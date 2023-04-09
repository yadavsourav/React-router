import { useNavigate, Form, useNavigation, useActionData, redirect, json } from 'react-router-dom';  // Form will contain all the data that we are sending automatically, it automatically triggers an action which belongs to the currently active route.

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();    // It gives us the access to the closest action and here this response (data) is automatically parsed by router for us as in of loaders 
  const navigate = useNavigate();
  const navigation = useNavigation();  // it gives us access to navigation object and we can access various information from that object such as the data that we are submitting but we can also access what is the state of currently active transition(changing from one route to another route or submitting data) is

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>   {/* this form tag will make sure that browser default to send the request to backend will be omitted and give this request(contain all the data that need to be submitted) to your action*/}
      {data && data.errors &&
        <ul>
          {/* JavaScript object.values() method is used to return an array whose elements are the enumerable property values found on the object. The ordering of the properties is the same as that given by the object manually if a loop is applied to the properties. Object.values() takes the object as an argument of which the enumerable own property values are to be returned and returns an array containing all the enumerable property values of the given object. */}
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}

        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ""} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ""} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ""} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ""} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();          // request contains form data
  
  const eventData = {
      title: data.get("title"),
      image: data.get("image"),
      date: data.get("date"),
      description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH"){
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }



 const response = await fetch( url , {
      method: method,
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
 });

 if (response.status === 422){
  return response;
 }

 if (!response.ok) {
  throw json({ message: "could not save event"}, {status: 500});
 }

 return redirect("..");
}