import React from "react";
import logo from "../../logo.png";
import Grid from "@material-ui/core/Grid";
import "./Abouts.css";


const About = (props) => {
    return (
        <div>
            <Grid container spacing={2} className={`${props.apptheme5 ? "main" : "main_light"}`} id="about">
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "-20px" }}>
                    <h1 id="brand">React Messenger App</h1>
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
                <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: "7rem" }}>
                    <div className="main__content motive-top" style={{ display: "flex", justifyContent: "center" }} >
                        <h2>
                            OF OUR WEBSITE
                    </h2>
                    </div>
                    <div className="main__content motive" style={{ display: "flex", justifyContent: "center" }} >
                        <h2>
                            <span>MOTIVE</span>
                        </h2>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <div className="main__content" >
                        <h2>
                            This Repository is created with a motive to <span>guide beginners</span> with the <span>open-source</span> and with big <span>react projects</span> .
                    </h2>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default About;
