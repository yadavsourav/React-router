import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
function ErrorPage() {
    const error = useRouteError();    //for throw, throw has two parts data and status we are using both here
    let title = "An error occured";
    let message = "something went wrong";
    if (error.status === 500) {
       // message = JSON.parse(error.data).message;
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "not found 404"
        message = "404 could not find resource or page"
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>

        </>
    );
};

export default ErrorPage;