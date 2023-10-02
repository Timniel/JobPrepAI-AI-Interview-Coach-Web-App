import React, { useEffect, useRef, useState } from "react";
import Card from "./sharedcomponents/Card";
import { Input, Textarea, useDisclosure } from "@nextui-org/react";
import emailjs from "emailjs-com";
import {
  Modal,
  Button,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import MobileSidebar from "./sidebar/MobileSidebar";

const SupportForm = ({}) => {
  useEffect(() => {
    document.title = `Feedback`;
  }, []);
  const form = useRef();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_a5sw7aj",
        "template_mmwxe9b",
        form.current,
        "hCeX7YO4AE6UXFTng"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormSubmitted(true);
          setSending(false);
        },
        (error) => {
          console.log(error.text);
          setError(error.text);
          onOpen();
          setSending(false);
        }
      );
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Card>
      {" "}
      <MobileSidebar />
      {formSubmitted ? (
        <div className="flex items-center justify-center my-auto">
          <p>Your feedback has been sent. Thank you!</p>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} className="my-auto">
          <div className="flex flex-col w-[100%] px-2 sm:px-10 gap-7 justify-center  m-auto">
            <p className="font-extrabold text-center text-2xl text-purple-400">
              Please Leave Your Feedback
            </p>
            <div className="flex sm:flex-row flex-col gap-4">
              <Input
                size="sm"
                isRequired
                type="name"
                name="name"
                label="Name"
                variant="flat"
                color="secondary"
              />
              <Input
                size="sm"
                isRequired
                type="email"
                name="email"
                label="Email"
                variant="flat"
                color="secondary"
              />
            </div>
            <Textarea
              isRequired
              label="Feedback"
              size="sm"
              placeholder="Enter your feedback"
              className="w-full"
              variant="flat"
              color="secondary"
              name="message"
            />
            <input
              type="submit"
              value={sending ? "Sending..." : "Send"}
              disabled={sending}
              className="bg-purple-400 p-2 text-sm px-6 rounded-xl shadow-medium text-white hover:bg-gray-700 w-[6rem] mx-auto"
            />
          </div>
        </form>
      )}
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
                <p className="text-red-500">{error}</p>
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
    </Card>
  );
};

export default SupportForm;
