import { useNavigate, useRouteError } from "react-router-dom";
import Card from "../sharedcomponents/Card";
import { Button } from "@nextui-org/react";
import { BackwardIcon } from "@heroicons/react/24/outline";

export function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="w-full my-auto">
      <Card>
        <div className="flex flex-col gap-4 my-auto">
          <h1 className="text-center text-xl font-bold">
            404 - Page Not Found
          </h1>
          <p>We're sorry, but the page you requested could not be found.</p>
          {/* <p>{error.data || error.message}</p> */}

          <Button
            color="secondary"
            onClick={() => navigate("/")}
            size="sm"
            className="bg-purple-400 w-8 px-10"
          >
            &larr; Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default NotFound;
