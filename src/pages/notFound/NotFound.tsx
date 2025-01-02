import { Link } from "react-router";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="bg_body">
      <h1 className="h1__404">404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2>We can not find that page</h2>
        <p>
          We are fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it is behalf.
        </p>
        <Link className="link" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}
