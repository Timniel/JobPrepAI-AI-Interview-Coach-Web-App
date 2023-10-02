import { User } from "@nextui-org/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import isabella from "../images/isabella.png";
import sofia from "../images/sofia.png";
import mike from "../images/mike.png";
import joe from "../images/joe.png";

export function UserComponent({ formData, isLoading, isSpeaking }) {
  return (
    <div className="flex ">
      <User
        className="text-sm font-medium"
        name={`${formData.interviewer
          .replace("-", " ")
          .split(" ")
          .map(
            (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
          )
          .join(" ")}`}
        description={
          isLoading ? "Typing..." : isSpeaking ? "Speaking" : "Active"
        }
        avatarProps={{
          src: `${
            formData.interviewer === "isabella"
              ? isabella
              : formData.interviewer === "sir-joe"
              ? joe
              : formData.interviewer === "mike"
              ? mike
              : formData.interviewer === "sofia"
              ? sofia
              : null
          }`,
        }}
      />
      <CheckBadgeIcon className="h-6 w-10 text-blue-700 inline" />
    </div>
  );
}
