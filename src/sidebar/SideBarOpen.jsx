import { Image, Listbox, ListboxItem } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import jobprep from "../images/jobprep.png";
import {
  ChatBubbleOvalLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChatHistoryContext from "../chat/ChatHistoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const SideBarOpen = ({}) => {
  const [chatHistories, setChatHistories] = useState([]);
  const { setChatHistory } = useContext(ChatHistoryContext);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location?.state?.fromForm;

  useEffect(() => {
    const fetchChatHistories = () => {
      const histories = [];

      // Go through each key in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // If the key starts with "chat-", it's a chat history
        if (key.startsWith("chat-")) {
          let chatInfo = JSON.parse(localStorage.getItem(key));

          // Adding key to the chatInfo
          chatInfo.key = key;

          histories.push(chatInfo);
        }
      }

      // Sort histories by timestamp in ascending order
      histories.sort((a, b) => b.timestamp - a.timestamp);

      // Keep only the latest 5 chats
      while (histories.length > 4) {
        const toRemove = histories.pop();
        localStorage.removeItem(toRemove.key);
      }

      setChatHistories(histories);
    };

    // Run it once immediately and then at intervals
    fetchChatHistories();
    const timer = setInterval(fetchChatHistories, 100);

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // An empty array makes it run only on component mount and unmount

  const handleDelete = (key) => {
    localStorage.removeItem(key);
    navigate("/");
  };

  const handleChatClick = (chatInfo) => {
    setChatHistory(chatInfo.history);
    navigate(`/interview/${chatInfo.level}/${chatInfo.title}`, {
      state: { fromForm: chatInfo },
    });
    // console.log(chatInfo)
  };

  const availableJobs = () => {
    navigate(`/jobs`, { state: { fromForm: formData } });
  };

  return (
    <div>
      <div className="w-full h-screen">
        <div className="w-[17rem] hidden md:flex h-full absolute sm:relative bg-white shadow-medium  flex-col justify-between">
          <div className="px-8 py-6 flex flex-col h-full justify-between">
            <div>
              <div className="h-16 w-full flex items-center bg-purple-300 rounded-2xl shadow-2xl pl-2">
                <Image src={jobprep} width={50} height={30} />
                <p className="text-gray-100 font-bold ml-2">JobPrepAI</p>
              </div>
              <ul className="mt-12">
                <li className="flex w-full justify-between text-gray-700 cursor-pointer items-center mb-6">
                  <a
                    href="javascript:void(0)"
                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <HomeIcon
                      width="18"
                      height="18"
                      className="text-purple-400"
                    />
                    <span className="text-sm ml-2 text-gray-400 ">
                      {" "}
                      <Link to="/">Home</Link>
                    </span>
                  </a>
                </li>
                <li className="flex w-full justify-between text-gray-400 hover:text-gray-700 cursor-pointer items-center mb-6">
                  <a
                    href="javascript:void(0)"
                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {/* <LightBulbIcon width="18" height="18" className='text-purple-400'/> */}
                    <FontAwesomeIcon
                      icon={faDiscord}
                      width="18"
                      height="18"
                      className="text-purple-400"
                    />
                    <span className="text-sm ml-2">
                      <a href="https://discord.com/invite/d2gfCTT7Yf">
                        Join Discord
                      </a>
                    </span>
                  </a>
                </li>
                <li className="w-full text-gray-400 hover:text-gray-700 cursor-pointer items-center mb-6">
                  <a
                    href="javascript:void(0)"
                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {formData && (
                      <div className="flex w-full justify-between">
                        <span>
                          <InformationCircleIcon
                            width="18"
                            height="18"
                            className="text-purple-400 inline"
                          />
                          <span
                            className="text-sm ml-2"
                            onClick={availableJobs}
                          >
                            {formData.title.length > 15 ? (
                              <>{`${formData.title.substring(0, 15)}...  `}</>
                            ) : (
                              <>
                                {`Available ${
                                  formData.title.charAt(0).toUpperCase() +
                                  formData.title.slice(1)
                                }`}
                              </>
                            )}
                            {" Jobs"}
                          </span>
                        </span>
                        <div className="py-1 px-3 bg-purple-300 rounded text-gray-700 flex items-center justify-center text-xs">
                          🔥
                        </div>
                      </div>
                    )}
                  </a>
                </li>

                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div>
              {Object.entries(chatHistories).length > 0 && (
                <p className="py-4 text-gray-400 text-sm">Interview Sessions</p>
              )}
              <Listbox
                variant="flat"
                color="secondary"
                className="p-0 gap-0 text-xs divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 w-full overflow-visible shadow-small rounded-medium"
                itemClasses={{
                  base: "px-3  first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12  data-[hover=true]:bg-default-100/80",
                }}
              >
                {Object.entries(chatHistories).map(([, chatInfo], index) => (
                  <ListboxItem
                    key={index}
                    endContent={
                      <button
                        onClick={() => handleDelete(chatInfo.key)}
                        className="text-red-500"
                      >
                        x
                      </button>
                    }
                  >
                    <span onClick={() => handleChatClick(chatInfo)}>
                      {chatInfo.name}
                    </span>
                  </ListboxItem>
                ))}
              </Listbox>
            </div>

            <div className="flex justify-end items-end  mb-4 w-full">
              <div className="flex w-full justify-between items-end text-gray-400 hover:text-gray-700 cursor-pointer">
                <a
                  href="javascript:void(0)"
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <ChatBubbleOvalLeftIcon
                    width="18"
                    height="18"
                    className="text-purple-400"
                  />
                  <span className="text-sm ml-2">
                    {" "}
                    <Link to="/feedback">Feedback</Link>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarOpen;
