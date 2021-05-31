import React from "react";
import Grid from "@material-ui/core/Grid";
import "./Abouts.css";
import { ReactComponent as Logo } from "../../about-1.svg";
import { ReactComponent as Logo2 } from "../../about-2.svg";
import { Fade } from 'react-reveal';

const About = (props) => {
    return (
        <div>
            <Grid container className={`${props.apptheme5 ? "about_main" : "about_main_light"}`} id="about">
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "-20px" }}>
                    <h1 id="brand">React Messenger App</h1>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="main__img--container">
                        <Fade left duration={1500}>
                            <Logo
                                className="responsive jewel"
                            />
                        </Fade>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="main__content">
                        <Fade top duration={1500}>
                            <h2>
                            <span>Messenger</span> is a <span>React</span> based app, styled with <span>Material-UI</span>, and deployed using <span>Firebase.</span>
                            </h2>
                        </Fade>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "-20px" }}>
                    <h1 id="brand">Motive of our website</h1>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="main__img--container">
                        <Fade left duration={1500} delay={500}>
                            <Logo2
                                className="responsive jewel"
                            />
                        </Fade>
                    </div>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <div className="main__content" >
                        <Fade top duration={1500}>
                            <h2>
                            This Repository is created with the motive to <span>guide beginners</span> through <span>open-source</span> &amp; familiarize them with professional <span>React projects</span> .
                    </h2>
                        </Fade>
                    </div>
                </Grid>

            </Grid>
        </div>
    );
};

export default About;
