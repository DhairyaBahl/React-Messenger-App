import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuidv4 } from "uuid"
export default function WelcomeDialogBox(props) {
  const [name, setName] = React.useState("");  
  const [err, setErr] = React.useState(false);
  const [txt, setTxt] = React.useState("");

  const enterName = () => {
    if (name.trim() === "") {
      setErr(true);
      setTxt("Please enter a proper name");
    } else {
      setErr(false);
      setTxt("");
      props.setUsername(name);
      props.setUid(uuidv4());
      props.close();
    }
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Kindly Enter your name</DialogTitle>
        <DialogContent>
          <TextField
            error={err}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            inputProps={{
              style: { borderRadius: "0px" }
            }}
            helperText={txt}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={enterName} color="primary">
            Enter
          </Button>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
