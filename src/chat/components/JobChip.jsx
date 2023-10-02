import { Chip } from "@nextui-org/react";

export function JobChip({ formData }) {
  return (
    <div className="flex flex-row justify-between">
      <Chip
        color="secondary"
        variant="flat"
        size="xs"
        className="text-purple-900 shadow-medium truncate w-[90%]"
      >
        <p className="text-xs font-normal">
          {`${formData.level
            .split("-")
            .map(
              (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            )
            .join(" ")} ${
            formData.title.charAt(0).toUpperCase() + formData.title.slice(1)
          } Interview Session`}
        </p>
      </Chip>
    </div>
  );
}
