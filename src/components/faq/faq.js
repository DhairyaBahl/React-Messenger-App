import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./faq.css";

function Faq(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const data = [
    {
      id: "panel1",
      question:
        "I am a beginner with open source or with react can I contribute in this repository ?",
      details:
        "Anybody can contribute to this project. Just take an issue, give your ideas, work on the issue and I am always here to guide you throughout the process ❤"
    },
    {
      id: "panel2",
      question: "What are the steps to make my first contribution ?",
      details:
        "Kindly refer to the contributing.md file. All the contributing guidelines are written over there."
    },
    {
      id: "panel3",
      question:
        "Is there any need to assign myself to the issue before starting to work on the issue ?",
      details:
        "It is better to wait until you are assigned to the issue. Although if you are sure that no-one is working on the issue then you can start working on the issue."
    }
  ];

  return (
    <Box
      id={props.apptheme4 ? "dark" : "light"}
      style={{ paddingBottom: "100px", marginBottom: "-300px" }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          fontWeight: 900,
          marginBottom: "40px"
        }}
      >
        <Typography
          style={{
            fontSize: "70px",
            borderBottom: "3px solid #3e2559",
            color: "purple"
          }}
        >
          FAQs
        </Typography>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: "medium"
        }}
        className="faq"
      >
        {data.map((data) => {
          const { id, question, details } = data;
          return (
            <Accordion
              expanded={expanded === id}
              key={id}
              onChange={handleChange(id)}
              style={{ width: "85%", padding: "5px" }}
              id={props.apptheme4 ? "faq_dark" : "faq_light"}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "purple" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "bold", fontSize: "15px" }}>
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ marginBottom: "0px" }}>
                <Typography
                  style={{ fontWeight: 580, color: "purple", fontSize: "15px" }}
                >
                  {details}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Box>
  );
}

export default Faq;
