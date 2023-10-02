import { useChatMessages } from "./useChatMessages";
import { Divider, Button } from "@nextui-org/react";
import ErrorContext from "../ui/ErrorContext";
import { MyInput } from "../utils/MyInput";
import { useNavigate } from "react-router-dom";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import {
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import Loader from "../ui/Loader";
import { useContext, useEffect, useRef, useState } from "react";
import Card from "../sharedcomponents/Card";
import MobileSidebar from "../sidebar/MobileSidebar";
import { UserComponent } from "./UserComponent";
import { JobChip } from "./components/JobChip";
import { TextAnimator } from "./components/TextAnimator";
import { MyModal } from "../sharedcomponents/MyModal";

function MainApp() {
  const navigate = useNavigate();
  const { errMsgTransformed, setErrorMsg } = useContext(ErrorContext);
  const {
    input,
    setInput,
    messages,
    isLoading,
    handlePrev,
    sendMessage,
    handleSkip,
    isOpen,
    onOpenChange,
    formData,
    setIsLoading,
  } = useChatMessages();
  const assistantMessage =
    messages
      .slice()
      .reverse()
      .find((message) => message.sender === "assistant")?.text || "";
  const isDone =
    messages
      .slice()
      .reverse()
      .find(
        (message) =>
          message.sender === "assistant" &&
          (message.text.toLowerCase().includes("(done)") ||
            message.text.toLowerCase().includes("done"))
      ) !== undefined;

  const inputRef = useRef();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    document.title = `${formData.level
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} ${
      formData.title.charAt(0).toUpperCase() + formData.title.slice(1)
    } Interview Session `;
  }, [formData]);

  const handleClose = () => {
    setErrorMsg(null);
    onOpenChange(false);
  };

  useEffect(() => {
    if (input.trim() !== "") {
      inputRef.current.focus();
    }
  }, [input]);

  const handleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop speaking
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        assistantMessage.replace("(done)", "")
      );

      // Choose a voice
      let voices = window.speechSynthesis.getVoices();
      let selectedVoice;
      if (formData.interviewer === "mike") {
        selectedVoice = voices.find((voice) =>
          voice.name.includes("US English Male")
        );
      }
      if (formData.interviewer === "isabella") {
        selectedVoice = voices.find((voice) => voice.name.includes("Samantha"));
      }
      if (formData.interviewer === "sir-joe") {
        selectedVoice = voices.find((voice) =>
          voice.name.includes("Google UK English Male")
        );
      }
      if (formData.interviewer === "sofia") {
        selectedVoice = voices.find((voice) => voice.name.includes("Karen"));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = function (event) {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  function submit() {
    sendMessage(input, "user");
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  }

  const assistantMessageCleaned = assistantMessage.replace("(done)", "");

  useEffect(() => {
    window.speechSynthesis.cancel(); // Stop speech synthesis
    setIsSpeaking(false); // Set isSpeaking to false
    // setIsLoading(false);
  }, [assistantMessageCleaned]); // Run this effect when assistantMessageCleaned changes

  const availableJobs = () => {
    navigate(`/jobs`, { state: { fromForm: formData } });
  };

  return (
    <Card>
      <div id="" className="  flex-grow flex flex-col ">
        <UserComponent
          formData={formData}
          isLoading={isLoading}
          isSpeaking={isSpeaking}
        />
        <MobileSidebar />
        <Divider orientation="horizontal" className="my-4" />
        <JobChip formData={formData} />
        {isLoading ? (
          <Loader interviewer={formData.interviewer} />
        ) : (
          <TextAnimator
            assistantMessage={assistantMessage}
            isDone={isDone}
            handleSpeech={handleSpeech}
          />
        )}
        {!isLoading && (
          <div className="flex flex-row-reverse">
            {isSpeaking ? (
              <SpeakerWaveIcon
                className="w-6 text-purple-400"
                onClick={handleSpeech}
              />
            ) : (
              <SpeakerXMarkIcon className="w-6" onClick={handleSpeech} />
            )}
            {isDone ? (
              <div
                className="mx-auto py-3 text-red-400 cursor-pointer hover:text-purple-400"
                onClick={availableJobs}
              >
                See Available {formData.title} Jobs here!
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {!isDone && (
        <div className={`flex flex-col justify-end `}>
          {!isLoading ? (
            <>
              <div className={`sm:m-7 mx-0 my-7`}>
                <MyInput
                  type="text"
                  name="title"
                  label="Reply"
                  labelPlacement="inside"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  color="olive"
                  size="md"
                  ref={inputRef}
                  onKeyDown={(event) =>
                    event.key === "Enter" && input.trim() !== ""
                      ? submit()
                      : null
                  }
                  endContent={
                    input.trim() !== "" ? (
                      <button onClick={() => submit()} className="text-black">
                        <CursorArrowRaysIcon className="h-6 w-10 text-purple-400 " />
                      </button>
                    ) : (
                      ""
                    )
                  }
                  className="rounded-full placeholder:text-purple-600"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <Button
                    color="secondary"
                    onClick={() => {
                      handlePrev("user");
                    }}
                    size="sm"
                    isDisabled={messages.length <= 2}
                    className="bg-purple-400"
                  >
                    <BackwardIcon
                      width="18"
                      height="18"
                      className="text-white"
                    />
                    Prev
                  </Button>
                </div>

                <div className="text-red-700"></div>
              </div>
            </>
          ) : null}

          <>
            <MyModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              handleClose={handleClose}
              errMsgTransformed={errMsgTransformed}
            />
          </>
        </div>
      )}

      {/* <div className="flex justify-end">
 {/* <button onClick={handleSkip}>  Skip  <ForwardIcon width="18" height="18" className='text-purple-400 inline'/></button>  }


    </div> */}
    </Card>
  );
}

export default MainApp;
