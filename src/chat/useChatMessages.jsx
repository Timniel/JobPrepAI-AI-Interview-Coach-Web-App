import { useState, useEffect, useRef, useContext } from "react";
import ErrorContext from "../ui/ErrorContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { callGpt } from "../services/callGpt";
import { useDisclosure } from "@nextui-org/react";
import ChatHistoryContext from "./ChatHistoryContext";

export function useChatMessages() {
  const firstMessageRan = useRef(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { errMsgTransformed, setErrorMsg } = useContext(ErrorContext);
  const { chatHistory } = useContext(ChatHistoryContext);
  const location = useLocation();

  const formData = location?.state?.fromForm;
  // console.log(formData)
  useEffect(() => {
    if (firstMessageRan.current === false) {
      if (!formData.localStorage) {
        let firstMessage;
        if (formData.interviewer === "mike") {
          firstMessage = `I need your assistance as a job interview coach. You're  ${formData.interviewer}, a male character With 25+ years of corporate experience, that provides invaluable advice on the interview process. you promotes learning from mistakes to help you grow both personally and professionally. My goal is for you to ask me one interview question based on my job title as a ${formData.title} & level as ${formData.level}. start with hi, i'm ${formData.interviewer} (rephrase). only when i've replied well to the question you can ask another. question should also be based on your characteristics. if i do not answer your question correctly, repeat same question unless you're told to skip the question. but if i answer the question correctly ask another. after every 5 question have been answered correctly ask me if i want to continue the interview session, if i then wish not to continue then wish me goodluck and rate my interview level over 10 using my responses, and give me advice if i need to continue practising the interview session or not. if i'm done with the interview session also add this at the end of the reply, (done). note: dont not repeat instruction back to me and make sure to follow instruction carefully. `;
        }
        if (formData.interviewer === "isabella") {
          firstMessage = `I need your assistance as a job interview coach. You're  ${formData.interviewer}, a female character With  a psychology background holder and a performance coach, is your cheerleader. You boosts self-confidence, identifies unique values, and helps articulate them effectively. Your mantra is: "Believe you can, and you're halfway there!. My goal is for you to ask me one interview question based on my job title as a ${formData.title} & level as ${formData.level}. start with hi, i'm ${formData.interviewer} (rephrase). only when i've replied well to the question you can ask another. question should also be based on your characteristics. if i do not answer your question correctly, repeat same question unless you're told to skip the question. but if i answer the question correctly ask another. after every 5 question have been answered correctly ask me if i want to continue the interview session, if i then wish not to continue then wish me goodluck and rate my interview level over 10 using my responses, and give me advice if i need to continue practising the interview session or not. if i'm done with the interview session also add this at the end of the reply, (done). note: dont not repeat instruction back to me and make sure to follow instruction carefully. `;
        }
        if (formData.interviewer === "sir-joe") {
          firstMessage = `I need your assistance as a job interview coach. You're  ${formData.interviewer
            .replace("-", " ")
            .split(" ")
            .map(
              (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            )
            .join(
              " "
            )}, an old male character, a seasoned corporate tactician  and strategy expert. you help decode complex interview questions and showcases skills ideally. With your planning tools and creative advice, you help interviewee stay two steps ahead in their  interview preparation. My goal is for you to ask me one interview question based on my job title as a ${
            formData.title
          } & level as ${formData.level}. start with hi, i'm ${
            formData.interviewer
          } (rephrase). only when i've replied well to the question you can ask another. question should also be based on your characteristics. if i do not answer your question correctly, repeat same question unless you're told to skip the question. but if i answer the question correctly ask another. after every 5 question have been answered correctly ask me if i want to continue the interview session, if i then wish not to continue then wish me goodluck and rate my interview level over 10 using my responses, and give me advice if i need to continue practising the interview session or not. if i'm done with the interview session also add this at the end of the reply, (done). note: dont not repeat instruction back to me and make sure to follow instruction carefully.`;
        }
        if (formData.interviewer === "sofia") {
          firstMessage = `I need your assistance as a job interview coach. You're  ${formData.interviewer
            .replace("-", " ")
            .split(" ")
            .map(
              (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            )
            .join(
              " "
            )}, a female character, a practical analyst, turning data into action plans. With your market trend analysis background, you keep interviewee updated on the latest trends. you make complex concepts understandable, helping interviewee impress at their next interview. My goal is for you to ask me one interview question based on my job title as a ${
            formData.title
          } & level as ${formData.level}. start with hi, i'm ${
            formData.interviewer
          } (rephrase). only when i've replied well to the question you can ask another. question should also be based on your characteristics. if i do not answer your question correctly, repeat same question unless you're told to skip the question. but if i answer the question correctly ask another. after every 5 question have been answered correctly ask me if i want to continue the interview session, if i then wish not to continue then wish me goodluck and rate my interview level over 10 using my responses, and give me advice if i need to continue practising the interview session or not. if i'm done with the interview session also add this at the end of the reply, (done). note: dont not repeat instruction back to me and make sure to follow instruction carefully.`;
        }

        const systemMessage = { text: firstMessage, sender: "system" };
        sendMessage(firstMessage, systemMessage.sender);
      } else {
        setMessages(formData.history);
        //  console.log(chatHistory);
        setIsLoading(false);
      }
      return () => {
        firstMessageRan.current = true;
      };
    }
  }, []);

  useEffect(() => {
    if (formData.localStorage) {
      setMessages(formData.history);
    }
    // console.log(chatHistory);
  }, [formData]);

  const sendMessage = async (text, sender) => {
    setIsLoading(true);
    const userMessage = {
      text: text,
      sender: sender,
      timeStamp: new Date().getTime(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const gptResponse = await callGpt([...messages, userMessage]);
      let assistantMessage = {
        text: gptResponse,
        sender: "assistant",
        timeStamp: new Date().getTime(),
      };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, assistantMessage];

        // Get the timestamp from the first message
        const timestamp = updatedMessages[0].timeStamp;

        // Set into local storage with a unique key that starts with "chat-"
        const chatTitle = "chat-" + timestamp;

        localStorage.setItem(
          chatTitle,
          JSON.stringify({
            history: updatedMessages,
            name: `${formData.level
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")} ${
              formData.title.charAt(0).toUpperCase() + formData.title.slice(1)
            } Interview Session`,
            title: formData.title,
            level: formData.level,
            interviewer: formData.interviewer,
            localStorage: true,
            timestamp: timestamp,
          })
        );

        return updatedMessages;
      });
      setInput("");
      setErrorMsg(null);
    } catch (error) {
      // console.log(error);
      setErrorMsg(error.message);
      handlePrev("assistant");
      onOpen();
      if (messages.length === 0) {
        navigate("/");
      }
      //   setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  function handlePrev(user) {
    let updatedMessages = [...messages]; // Copy the array

    if (user === "user") {
      let lastAssMessageData = updatedMessages
        .slice()
        .reverse()
        .find((msg) => msg.sender === "assistant");
      updatedMessages = updatedMessages.filter(
        (msg) => msg !== lastAssMessageData
      );

      let userMessages = updatedMessages.filter((msg) => msg.sender === "user");
      //  console.log(userMessages);
      // Get the last User message from the updated array

      let lastUserMessageData = updatedMessages
        .slice()
        .reverse()
        .find((msg) => msg.sender === "user");
      // Get its text
      let lastUserMessage = lastUserMessageData?.text;
      setInput(lastUserMessage || "");
      // console.log(lastUserMessage)
      // Remove the last User message from the array

      updatedMessages = updatedMessages.filter(
        (msg) => msg !== lastUserMessageData
      );
    }
    // Get the last System message from the updated array
    // let lastSystemMessageData = updatedMessages.slice().reverse()[0];

    // // Check if the last message (according to your adapted requirements) in the array is a System message
    // if (lastSystemMessageData && lastSystemMessageData.sender === 'system') {
    //   // If it is, then remove it
    //   updatedMessages = updatedMessages.filter(msg => msg !== lastSystemMessageData);
    // }

    // Update the state with the new array and the last user message

    setMessages(updatedMessages);

    // console.log(updatedMessages)
  }
  async function handleSkip() {
    setIsLoading(true);
    // Define the 'skip' message
    const skipMessage = {
      text: "Skip the message.",
      sender: "system",
      timeStamp: new Date().getTime(),
    };

    // Update the state with the new array
    setMessages((prevMessages) => [...prevMessages, skipMessage]);

    const gptResponse = await callGpt([...messages, skipMessage]);

    // Include the AI response in the messages list
    let assistantMessage = {
      text: gptResponse,
      sender: "assistant",
      timeStamp: new Date().getTime(),
    };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    setIsLoading(false);
  }

  return {
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
  };
}
