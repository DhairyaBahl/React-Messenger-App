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

    return(
        // <div style={{color:"#131313"}} lg="12">
        // <div style={{backgroundColor:"#131313", paddingTop:"100px"}}>
        //     <Paper className="container" style={{alignItems:"center", background:"#3e2559"}}>
        // <Card className="header">
        //   <CardHeader className="titlep" title="Contact Us"/>
        // </Card>
        // <CardContent>
        //     <form onSubmit={sendEmail}>
        //                 <Grid item md={12} sm={12} xs={12} lg={12}>
        //                     <TextField
        //                     margin="dense"
        //                     variant="filled"
        //                     name="name"
        //                     label="Name"
        //                     color="primary"
        //                     autoComplete="off"
        //                     style={{width:"100%", background:"#ebe1f5"}}
        //                     required
        //                     InputProps={{
        //                         endAdornment: (
        //                         <InputAdornment position="end">
        //                             <PersonIcon />
        //                         </InputAdornment>
        //                         ),
        //                     }}
        //                     />
        //                 </Grid>
        //                 <Grid style={{alignItems:"center"}} item md={12} sm={12} xs={12} lg={12}>
        //                     <TextField
        //                     margin="dense"
        //                     label="Email"
        //                     variant="filled"
        //                     color="primary"
        //                     name="email"
        //                     autoComplete="off"
        //                     required
        //                     style={{width: '100%', background:"#ebe1f5"}}
        //                     InputProps={{
        //                         endAdornment: (
        //                         <InputAdornment position="end">
        //                             <EmailIcon />
        //                         </InputAdornment>
        //                         ),
        //                     }}
        //                     />
        //                 </Grid>
        //                 <Grid item md={12} sm={12} xs={12} lg={12}>
        //                     <TextField
        //                     margin="dense"
        //                     variant="filled"
        //                     name="subject"
        //                     label="subject"
        //                     color="primary"
        //                     autoComplete="off"
        //                     style={{width:"100%", background:"#ebe1f5"}}
        //                     required
        //                     InputProps={{
        //                         endAdornment: (
        //                         <InputAdornment position="end">
        //                             <SubjectIcon />
        //                         </InputAdornment>
        //                         ),
        //                     }}
        //                     />
        //                 </Grid>
        //                 <Grid className="contactForm" style={{alignItems:"center"}} item md={12} sm={12} xs={12} lg={12}>
        //                     <TextareaAutosize
        //                         rowsMax={4}
        //                         aria-label="maximum height"
        //                         variant="filled"
        //                         name="message"
        //                         placeholder="Message"
        //                         style={{ 
        //                                 background:"#dbd3e3",  
        //                                 minHeight:"90px",
        //                                 maxHeight:"90px", 
        //                                 fontSize:"15px",
        //                                 outline: "none",
        //                                 padding:"10px",
        //                                 marginTop:"10px",
        //                                 marginRight:"10px",
        //                                 float: "left",
        //                                 marginRight:"10px",
        //                                 width: "100%",
        //                                 resize: "none",
        //                             }}
        //                     />
        //                 </Grid>
        //                 <div>
        //                     <input type="submit" value="Send Message" 
        //                     style={{background:"black", color:"white", padding:"7px", border:"2px black solid", borderRadius:"10px", marginTop:"15px",width:"120px" }}>
        //                     </input>
        //                 </div>
        //         </form>
        //         </CardContent>
        //         </Paper>
        // </div>
        // </div>
        <div className="contactus_body">
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Let's get in <span id="touch">touch</span></h2>
                    <h3>Contact us</h3>
                </div>
                <form onSubmit={sendEmail}>
                    <div className="row clearfix">
                        <div className="col_half">
                            <label>First name</label>
                            <div className="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                                <input type="text" name="first_name" placeholder="John" required />
                            </div>
                        </div>
                        <div className="col_half">
                            <label>Last name</label>
                            <div className="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                                <input type="text" name="last_name" placeholder="Doe" required/>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col_half">
                            <label>Email</label>
                            <div className="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
                                <input type="email" name="email" placeholder="johndoe@gmail.com" required />
                            </div>
                        </div>
                        <div className="col_half">
                            <label>Phone</label>
                            <div className="input_field"> <span><i aria-hidden="true" class="fa fa-phone"></i></span>
                                <input type="tel" name="phone" placeholder="Phone no" pattern="[0-9]{10}" />
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div>
                            <label>Comments</label>
                            <div className="textarea_field"> <span><i aria-hidden="true" class="fa fa-comment"></i></span>
                                <textarea style={{resize:"none"}} cols="46" rows="3" name="comments"></textarea>
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
