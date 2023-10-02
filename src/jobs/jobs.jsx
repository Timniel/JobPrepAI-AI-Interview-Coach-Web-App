import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Card from "../sharedcomponents/Card";
import axios from "axios";
import MobileSidebar from "../sidebar/MobileSidebar";
import { Progress } from "@nextui-org/react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Jobs = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const formData = location?.state?.fromForm;

  useEffect(() => {
    document.title = `${formData.level
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} ${
      formData.title.charAt(0).toUpperCase() + formData.title.slice(1)
    } Jobs `;
  }, []);

  useEffect(() => {
    // Get user's country
    axios
      .get("http://ip-api.com/json")
      .then((res) => {
        const country = res.data.country;
        const query = `available ${formData.title} jobs in ${country}`;

        // Fetch data from Google Custom Search
        fetch(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=56262d5761ff54d2a&q=${query}`
        )
          .then((response) => response.json())
          .then((res) => {
            //   const filteredItems = res.items.filter(item => item.title.includes(''));
            setData(res.items);
            console.log(res.items);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card>
      {" "}
      <MobileSidebar />
      {data ? (
        <div className="overflow-scroll overflow-y-auto">
          {data.map((item, index) => (
            <div key={index} className="py-2">
              <h2 className="cursor-pointer text-sm">
                <a href={item.formattedUrl}>{item.title}</a>
              </h2>
              {/* <a href={item.link} target="_blank" rel="noopener noreferrer">View More</a> */}
              <p className="text-xs">{item.snippet}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center my-auto">
          {" "}
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
            color="secondary"
          />
        </div>
      )}
    </Card>
  );
};

export default Jobs;
