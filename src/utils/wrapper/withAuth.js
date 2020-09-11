import withAuthRedirect from './withAuthRedirect';
import {ROUTE_LOGIN} from "../../constants/routes";

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAuth(WrappedComponent, location = ROUTE_LOGIN) {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true
  });
}
