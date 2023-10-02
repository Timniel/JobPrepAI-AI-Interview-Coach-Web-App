import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import isabella from "../images/isabella.png";
import sofia from "../images/sofia.png";
import mike from "../images/mike.png";
import joe from "../images/joe.png";
import ErrorContext from "../ui/ErrorContext";
import Card from "../sharedcomponents/Card";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import MobileSidebar from "../sidebar/MobileSidebar";
import { MyModal } from "../sharedcomponents/MyModal";
const interviewers = [
  {
    name: "Mike",
    imageUrl: `${mike}`,
    description: "(Mentor)",
    bio: `With 25+ years of corporate experience, Mike provides invaluable advice on the interview process. He promotes learning from mistakes to help you grow both personally and professionally.`,
  },
  {
    name: "Isabella",
    imageUrl: `${isabella}`,
    description: "(Motivator)",
    bio: `Isabella, a psychology background holder and a performance coach, is your cheerleader. She boosts self-confidence, identifies your unique values, and helps articulate them effectively. Her mantra is: "Believe you can, and you're halfway there!"`,
  },
  {
    name: "Sir-Joe",
    imageUrl: `${joe}`,
    description: "(Strategist)",
    bio: `Sir Joe, a seasoned corporate tactician, is your strategy expert. He helps decode complex interview questions and showcases your skills ideally. With his planning tools and creative advice, stay two steps ahead in your interview preparation.`,
  },
  {
    name: "Sofia",
    imageUrl: `${sofia}`,
    description: "(Analyst)",
    bio: `Sofia is your practical analyst, turning data into action plans. With her market trend analysis background, she keeps you updated on the latest trends. Sofia makes complex concepts understandable, helping you impress at your next interview.`,
  },
];

const jobLevels = [
  { label: "Internship", value: "internship" },
  { label: "Entry Level", value: "entry-level" },
  { label: "Mid Level", value: "mid-level" },
  { label: "Senior Level", value: "senior-level" },
  { label: "Executive Level", value: "executive-level" },
  { label: "Specialist", value: "specialist" },
  { label: "Consultant", value: "consultant" },
];

const JobForm = () => {
  useEffect(() => {
    document.title = "JobPrepAI - Get interview-ready with AI";
  }, []);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [selectedInterviewer, setSelectedInterviewer] = useState(
    interviewers[0].name
  );
  const [selectedJobLevel, setSelectedJobLevel] = useState("internship");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [firstRender, setFirstRender] = useState(true);
  const [jobTitle, setJobTitle] = useState("");
  const location = useLocation();
  const errorMessage = location.state?.error;
  const { errMsgTransformed, setErrorMsg, errorMsg } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg) {
      onOpen();
    }
  }, [errorMsg]);

  const handleClose = () => {
    setErrorMsg(null);
    onOpenChange(false);
  };

  // Function to handle the selection of an interviewer
  const handleSelect = (interviewer) => {
    setSelectedInterviewer(interviewer);
  };
  const handleSelectLevel = (level) => {
    setSelectedJobLevel(level);
  };
  const handleTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    navigate(`/interview/${data.level}/${data.title}`, {
      state: { fromForm: data },
    });
  };

  return (
    <Card>
      <MobileSidebar />
      <p className=" font-extrabold text-center text-2xl text-purple-400  mt-12">
        Choose your interview coach
      </p>

      <Form
        method="post"
        className="flex flex-col items-center justify-center gap-4 my-auto "
        onSubmit={onSubmit}
      >
        <div className="flex flex-row sm:gap-10 gap-3">
          <Input
            type="hidden"
            name="interviewer"
            value={selectedInterviewer.toLowerCase()}
            className="hidden"
          />
          {interviewers.map((interviewer, index) => (
            <div
              key={index}
              className={`${
                selectedInterviewer === interviewer.name
                  ? "border-1 border-purple-400  sm:p-3 p-1 rounded-xl"
                  : ""
              } text-center `}
            >
              <Tooltip
                key={index}
                color="secondary"
                value={selectedInterviewer.toLowerCase()}
                showArrow
                content={interviewer.bio}
                size="lg"
                className="bg-purple-400 w-[30rem] text-sm text-gray-100"
              >
                <div onClick={() => handleSelect(interviewer.name)}>
                  <Image src={interviewer.imageUrl} height={100} width={100} />

                  <p className="sm:text-sm text-xs font-semibold my-1 text-black">
                    {" "}
                    {interviewer.name.replace("-", " ")}
                  </p>

                  <p className="text-xs text-gray-400">
                    {" "}
                    {interviewer.description}
                  </p>
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className=" mt-4  flex  sm:w-1/2 w-[80%]">
          <div className="sm:flex-row flex-col flex gap-4 w-full ">
            <Input
              type="text"
              name="title"
              placeholder="Job Title"
              labelPlacement="inside"
              variant="flat"
              color="secondary"
              size="xs"
              onChange={handleTitleChange}
            />

            <Select
              size="xs"
              placeholder="Level"
              color="secondary"
              variant="flat"
              name="level"
              value={selectedJobLevel}
              defaultSelectedKeys={["internship"]}
            >
              {jobLevels.map((level, index) => (
                <SelectItem
                  key={level.value}
                  onClick={() => handleSelectLevel(level.value)}
                >
                  {level.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <button
          disabled={!jobTitle.trim()}
          className="bg-purple-400 p-2 text-sm px-6 rounded-xl shadow-medium text-white hover:bg-gray-700"
        >
          {isSubmitting ? "Submitting..." : "Start Session"}
        </button>
      </Form>

      <>
        <MyModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleClose={handleClose}
          errMsgTransformed={errMsgTransformed}
        />
      </>
    </Card>
  );
};

export default JobForm;
