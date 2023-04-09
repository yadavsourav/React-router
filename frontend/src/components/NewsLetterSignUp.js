import classes from './NewsLetterSignUp.module.css';
import { useFetcher } from 'react-router-dom';  // It will not initialize a route transition. But if we use Form then it will transit us to the action route
import { useEffect } from "react";
/* trigger the action that belongs to the currently active route.The problem is however, that this form is included on all routes because it's part of the main navigation.This newsletter signup component is part
of the main navigation.Therefore, we would have to add the action to all routes and that would of course be a lot of code duplication and also clash with other actions that we might need for our routes.
Now this is such a common use case that React. Router has a solution for it. There is a special hook which you can import
from react-router-dom, and that is the useFetcher ho */

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;   // to access the response after sending request, here state is behaving like useNavigation(used for route transition) 

  useEffect(() => {
    if (state === "idle" && data && data.message)   // means we are not executing any action or loader anymore and we got data which has message property
      window.alert(data.message);
  }, [data, state]);
  return (
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}>   {/* So Fetcher should basically be used whenever you wanna trigger, an action, or also a loader with help of the load function without actually navigating to the page to which the loader belongs or the page to which the action belongs. */}
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;