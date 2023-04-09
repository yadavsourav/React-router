import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditEvent from "./pages/EditEvent";
import EventDetail, { loader as eventDetailLoader, action as deleteEventAction } from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import EventRoots from "./pages/EventsRoots";
import ErrorPage from "./pages/Error";
import NewsletterPage, { action as newsletterAction} from "./pages/NewsLetter";
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventRoots />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,         //first fetch the data from http request before rendering the remaining component it is an optimal way for complex application and it is achieved by loader property which is provided by react router

          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction

              },

              { path: "edit", element: <EditEvent />, action: manipulateEventAction},

            ],
          },
          { path: "new", element: <NewEvent />, action: manipulateEventAction },

        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },

]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
