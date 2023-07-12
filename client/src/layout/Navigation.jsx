import { Link, Outlet } from "react-router-dom";

function Navigation({ props, addons }) {
  return (
    <>
      <ul
        className="nav nav-tabs shadow-lg bg-dark bg-gradient p-2 my-3"
        id="myTabs"
        role="tablist"
      >
        <li className="nav-item">
          <Link
            to=""
            className="nav-link text-light "
            role="pill"
            aria-selected="true"
            data-toggle="tab"
          >
            {props + "s"} List
          </Link>
        </li>
        {props !== "Employee" ? (
          <li className="nav-item">
            <Link
              to="create"
              className="nav-link text-light"
              role="pill"
              aria-selected="false"
              data-toggle="tab"
            >
              Add {props}
            </Link>
          </li>
        ) : (
          <></>
        )}
        {addons === "Process Item" ? (
          <>
            <li className="nav-item">
              <Link
                to="processItems"
                className="nav-link text-light"
                role="pill"
                aria-selected="false"
                data-toggle="tab"
              >
                {addons + "s"} List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="processItems/create"
                className="nav-link text-light"
                role="pill"
                aria-selected="false"
                data-toggle="tab"
              >
                Add {addons}
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      <div className="tab-content">
        <Outlet />
      </div>
    </>
  );
}

export default Navigation;
