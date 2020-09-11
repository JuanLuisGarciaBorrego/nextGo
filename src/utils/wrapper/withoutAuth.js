import withAuthRedirect from './withAuthRedirect';
import {ROUTE_LOGIN_REDIRECT_SUCCESS} from "../../constants/routes";

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth(WrappedComponent, location = ROUTE_LOGIN_REDIRECT_SUCCESS) {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false
  });
}
