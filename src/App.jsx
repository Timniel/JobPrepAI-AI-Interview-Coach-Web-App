import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorContext from "./ui/ErrorContext";
import AppLayout from "./ui/AppLayout";
import JobForm from "./jobs/JobForm";
import MainApp from "./chat/mainapp";
import { useState } from "react";
import ChatHistoryContext from "./chat/ChatHistoryContext";
import { NotFound } from "./ui/NotFound";
import SupportForm from "./SupportForm";
import Jobs from "./jobs/jobs";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <JobForm />,
        errorElement: <NotFound />,
      },
      {
        path: "/interview/:level/:title",
        element: <MainApp />,
        errorElement: <NotFound />,
      },
      { path: "/feedback", element: <SupportForm /> },

      { path: "/jobs", element: <Jobs /> },
    ],
  },
]);
const App = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [errMsgTransformed, setErrMsgTransformed] = useState(null);

  const errorTransformer = (errorMsg) => {
    if (errorMsg === "Failed to fetch") {
      return "Network issues. Please try again.";
    } else if (
      errorMsg === "Unexpected end of JSON input" ||
      `Cannot read properties of undefined (reading '0')`
    ) {
      return "Server Error. Please try again.";
    }
    return errorMsg;
  };

  const handleErrMsg = (msg) => {
    setErrorMsg(msg);
    setErrMsgTransformed(errorTransformer(msg));
  };

  return (
    <ChatHistoryContext.Provider value={{ chatHistory, setChatHistory }}>
      <ErrorContext.Provider
        value={{
          errorMsg,
          setErrorMsg: handleErrMsg,
          errMsgTransformed,
          setErrMsgTransformed,
        }}
      >
        {" "}
        <RouterProvider router={router} />{" "}
      </ErrorContext.Provider>
    </ChatHistoryContext.Provider>
  );
};

export default App;
