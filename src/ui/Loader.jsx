import isabella from "../images/isabella.png";
import sofia from "../images/sofia.png";
import mike from "../images/mike.png";

import { Badge, Image } from "@nextui-org/react";
import joe from "../images/joe.png";

export default function Loader({ interviewer }) {
  return (
    <div className="mx-auto my-auto text-center  ">
      <Badge
        content="Typing..."
        color="secondary"
        variant="shadow"
        size="lg"
        className="bg-purple-400"
      >
        <Image
          alt="nextui logo"
          height={200}
          radius="full"
          rounded
          src={`${
            interviewer === "isabella"
              ? isabella
              : interviewer === "sir-joe"
              ? joe
              : interviewer === "mike"
              ? mike
              : interviewer === "sofia"
              ? sofia
              : null
          }`}
          width={200}
        />
      </Badge>
    </div>
  );
}
