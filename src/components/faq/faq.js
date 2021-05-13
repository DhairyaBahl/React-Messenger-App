import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Faq = () => {

    const data = [
        {
            id: "panel1",
            question: "I am a beginner with open source or with react can I contribute in this repository ?",
            details: "Anybody can contribute to this project. Just take an issue, give your ideas, work on the issue and I am always here to guide you throughout the process ❤"
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
            details: "It is better to wait until you are assigned to the issue. Although if you are sure that no-one is working on the issue then you can start working on the issue."
        },
    ];

    return (
        <Box style={{ marginBottom: "50px" }}>
        <Box
            style={{
            display: "flex",
            justifyContent: "space-evenly",
            fontWeight: 900,
            marginBottom: "40px",
            }}
        >
            <Typography
            style={{ fontSize: '70px', borderBottom: '3px solid #3e2559', color: "#3e2559" }}
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
            }}
        >
            {data.map((data) => {
            const { id, question, details } = data;
            return (
                <Accordion
                key={id}
                style={{ color: 'black', width: '85%', padding: '5px', backgroundColor: "" }}
                >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#17b078" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography style={{ fontWeight: "bold" }}>
                    {question}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ marginBottom: "0px" }}>
                    <Typography style={{ fontWeight: 580, color: "#3e2559" }}>{details}</Typography>
                </AccordionDetails>
                </Accordion>
            );
            })}
        </div>
        </Box>
  );
};

export default Faq;