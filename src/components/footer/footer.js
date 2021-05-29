import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./footer.css";

function footer(props) {
  var date = new Date();
  var year = date.getFullYear();
  return (
    <div>
      <div
        className={`${
          props.apptheme2 ? "footer__container" : "footerContainer_light"
        }`}
      >
        <div class="footer__links">
          <div>
            <div class="footer-open-source">
              <h2 style={{ marginBottom: "-10px" }}>
                <a href="https://github.com/DhairyaBahl/React-Messenger-App">
                  <GitHubIcon id="footer__logo--link"style={{ fontSize: "26px" }} />
                </a>
                pen Source Contribution
              </h2>
            </div>
          </div>
        </div>
        <section class="social__media">
          <div class="social__media--wrap">
            <div class="footer__logo">
              <a href="/" id="footer__logo">
                MESSENGER
              </a>
            </div>
            <p
              class={`website__rights ${
                props.apptheme2 ? "website__rights" : "website__rights_light"
              }`}
            >
              © MESSENGER {year}. All rights reserved.
            </p>
            <div class="social__icons">
              <a
                href="https://github.com/DhairyaBahl/React-Messenger-App"
                class="social__icon--link"
              >
                <GitHubIcon style={{ fontSize: "25px" }} />
              </a>
              <a
                href="mailto:dhairyabahl5@gmail.com"
                class="social__icon--link"
              >
                <MailIcon style={{ fontSize: "25px" }} />
              </a>
              <a href="" class="social__icon--link">
                <InstagramIcon style={{ fontSize: "25px" }} />
              </a>
              <a
                href="https://twitter.com/bahldhairya"
                class="social__icon--link"
              >
                <TwitterIcon style={{ fontSize: "25px" }} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default footer;
