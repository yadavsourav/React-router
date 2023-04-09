import classes from './MainNavigation.module.css';
import { Link, NavLink } from "react-router-dom";
import NewsletterSignup from './NewsLetterSignUp';


function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="events">Events</Link>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />

    </header>
  );
}

export default MainNavigation;
