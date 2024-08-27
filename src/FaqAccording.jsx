import React, { useEffect, useState } from "react";

const FaqItem = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className={`faq-item ${show ? "active" : ""}`}>
      <div className="faq-item-header" onClick={toggleShow}>
        {question}
      </div>
      {show && (
        <div className="faq-item-body">
          <div className="faq-item-body-content">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export const FaqAccording = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://election2020-smartable.p.rapidapi.com/news/page/1/";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d073483ademshd00933345f4ba15p1d278ejsn84c8b04f3de5",
        "x-rapidapi-host": "election2020-smartable.p.rapidapi.com",
      },
    };
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("API Response:", result); // Debug: Log the full API response
        
        if (result && Array.isArray(result.value)) {
          setData(result.value);
        } else {
          console.error("Unexpected API response structure:", result);
          setData([]); // Set data to empty array if structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div className="load">Loading...</div>;
  }

  return (
    <div className="faq-accordion">
      <h2>FAQs</h2>
      {data.map((item, index) => (
        <FaqItem key={index} question={item.title || "No title"} answer={item.excerpt || "No excerpt"} />
      ))}
    </div>
  );
};
