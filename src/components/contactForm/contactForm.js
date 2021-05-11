import emailjs from "emailjs-com";
import React from "react";
import { TextField } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import SubjectIcon from "@material-ui/icons/Subject";
import PersonIcon from "@material-ui/icons/Person";
import { TextareaAutosize } from "@material-ui/core";
import { Paper, Grid } from "@material-ui/core";
import "./contactForm.css";

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    // NOTE: make sure the below required API KEYS are configured in email js website!

    emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", e.target, "USER_ID").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    e.target.reset();
  }

  return (
    <div style={{ color: "#131313" }} lg="12">
      <div style={{ backgroundColor: "#131313", paddingTop: "100px" }}>
        <Paper
          className="container"
          style={{ alignItems: "center", background: "#3e2559" }}
        >
          <Card style={{ backgroundColor: "#3e2559", color: "white" }}>
            <CardHeader title="Contact Us" />
          </Card>
          <CardContent>
            <form onSubmit={sendEmail}>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <TextField
                  margin="dense"
                  variant="filled"
                  name="name"
                  label="Name"
                  color="primary"
                  autoComplete="off"
                  style={{ width: "100%", background: "#ebe1f5" }}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                style={{ alignItems: "center" }}
                item
                md={12}
                sm={12}
                xs={12}
                lg={12}
              >
                <TextField
                  margin="dense"
                  label="Email"
                  variant="filled"
                  color="primary"
                  type="email"
                  name="email"
                  autoComplete="off"
                  required
                  style={{ width: "100%", background: "#ebe1f5" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <TextField
                  margin="dense"
                  variant="filled"
                  name="subject"
                  label="subject"
                  color="primary"
                  autoComplete="off"
                  style={{ width: "100%", background: "#ebe1f5" }}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SubjectIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                className="contactForm"
                style={{ alignItems: "center" }}
                item
                md={12}
                sm={12}
                xs={12}
                lg={12}
              >
                <TextareaAutosize
                  rowsMax={4}
                  aria-label="maximum height"
                  variant="filled"
                  name="message"
                  placeholder="Message"
                  style={{
                    background: "#dbd3e3",
                    minHeight: "90px",
                    maxHeight: "90px",
                    fontSize: "15px",
                    outline: "none",
                    padding: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    float: "left",
                    marginRight: "10px",
                    width: "100%",
                    resize: "none"
                  }}
                />
              </Grid>
              <div>
                <input
                  type="submit"
                  value="Send Message"
                  style={{
                    background: "black",
                    color: "white",
                    padding: "7px",
                    border: "2px black solid",
                    borderRadius: "10px",
                    marginTop: "15px",
                    width: "120px"
                  }}
                ></input>
              </div>
            </form>
          </CardContent>
        </Paper>
      </div>
    </div>
  );
}
