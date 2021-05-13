import React from 'react';
import { Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Faq = () => {
    return (
        <Box style={{ marginBottom: "50px" }}>
            <Box style={{ display: 'flex', justifyContent: 'space-evenly', fontWeight: 900, marginBottom: '40px' }}>
                <Typography style={{ fontSize: '70px', borderBottom: '3px solid #3e2559', color: "#3e2559" }}>
                    FAQ
                </Typography>
            </Box>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-evenly', alignItems: "center" }}>
                        <Accordion key={1} style={{ color: 'black', width: '85%', padding: '5px', backgroundColor: "" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: "#17b078" }}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography style={{ fontWeight: 'bold' }}>I am a beginner with open source or with react can I contribute in this repository ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ }}>
                                <Typography style={{ fontWeight: 580, color: "#3e2559" }}>
                                Anybody can contribute to this project. Just take an issue, give your ideas, work on the issue and I am always here to guide you throughout the process ❤ .
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
            </div>
        </Box>
    );
};


export default Faq;