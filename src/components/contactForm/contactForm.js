import emailjs from "emailjs-com";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { TextField } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import SubjectIcon from "@material-ui/icons/Subject";
import PersonIcon from "@material-ui/icons/Person";
import { TextareaAutosize } from "@material-ui/core";
import { Paper, Grid } from "@material-ui/core";
import "./contactForm.css";

export default function ContactUs(props) {
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
    <div className={`${props.apptheme ? "contactus_dark" : "contactus_light"}`}>
      <div
        className={`form_wrapper ${
          props.apptheme ? "form_wrapper_dark" : "form_wrapper_light"
        }`}
      >
        <div className="form_container">
          <div className="title_container">
            <h2
              className={`form_h2 ${
                props.apptheme ? "form_h2_dark" : "form_h2_light"
              }`}
            >
              Let's get in <span id="touch">touch</span>
            </h2>
            <h3
              className={`form_h3 ${
                props.apptheme ? "form_h3_dark" : "form_h3_light"
              }`}
            >
              Contact us
            </h3>
          </div>
          {/* Contact-form */}
          <form onSubmit={sendEmail}>
            <div className="row clearfix">
              <div className="col_half">
                {/* First Name Attribute */}
                <label
                  className={`label_all ${
                    props.apptheme ? "label_all_dark" : "label_all_light"
                  }`}
                >
                  First name
                </label>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div className="col_half">
                {/* Last Name Attribute */}
                <label
                  className={`label_all ${
                    props.apptheme ? "label_all_dark" : "label_all_light"
                  }`}
                >
                  Last name
                </label>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col_half">
                {/* Email Attribute */}
                <label
                  className={`label_all ${
                    props.apptheme ? "label_all_dark" : "label_all_light"
                  }`}
                >
                  Email
                </label>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="col_half">
                {/*Phone number Attribute */}
                <label
                  className={`label_all ${
                    props.apptheme ? "label_all_dark" : "label_all_light"
                  }`}
                >
                  Phone
                </label>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-phone"></i>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone no"
                    pattern="[0-9]{10}"
                  />
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div>
                {/* Comments Attribute */}
                <label
                  className={`label_all ${
                    props.apptheme ? "label_all_dark" : "label_all_light"
                  }`}
                >
                  Comments
                </label>
                <div className="textarea_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-comment"></i>
                  </span>
                  <textarea
                    style={{ resize: "none" }}
                    cols="46"
                    rows="3"
                    name="comments"
                  ></textarea>
                </div>
              </div>
            </div>
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
