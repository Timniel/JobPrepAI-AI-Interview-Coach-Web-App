import {
  Modal,
  Button,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";

export function MyModal({
  isOpen,
  onOpenChange,
  handleClose,
  errMsgTransformed,
}) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      radius="2xl"
      size="xs"
      classNames={{
        body: "py-6 ",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
            <ModalBody>
              <p className="text-red-500">{errMsgTransformed}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-purple-400 text-white shadow-lg shadow-indigo-500/20"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
