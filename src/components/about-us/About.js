import React from 'react';
import logo from "../../logo.png";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Abouts.css";

const About = () => {
    return (
    <div>
        <Grid container spacing={2} className="main" id="about">
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1 id="brand">React Messengar App</h1>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="main__img--container">
                    <img
                    src={logo}
                    alt="Nature"
                    className="responsive jewel"
                    />
            </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="main__content">
                    <h2>
                    This is a <span>Messenger App</span>, made with <span>React</span>, styled with the help of <span>Material-UI</span> and deployed with the help of <span>Firebase.</span>
                    
                    </h2>
            </div>
            </Grid>
        </Grid>
    </div>
    );
};

export default About;

/*

        <div>
            <div className="main" id="about">
                <div className="main__container">
                <div className="main__content">
                    <h1 id="brand">React Messengar App</h1>
                    <h2>
                    Exclusive and Charming collection of
                    <span>Jewellery</span>
                    </h2>
                </div>
                <div className="main__img--container">
                    <img
                    src={logo}
                    alt="Nature"
                    className="responsive jewel"
                    />
                </div>
                </div>
           </div>
        </div>


        */