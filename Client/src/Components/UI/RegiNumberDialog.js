import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { preventOverflow } from "@popperjs/core";

export default function DialogSelect(props) {
  const [open, setOpen] = React.useState(false);
  const [isError, setIsError] = React.useState({
    yearError: false,
    rollNoError: false,
  });
  let errorsInitState = {
    yearError: "",
    rollNoError: "",
  };
  const [errors, setErrors] = React.useState({
    yearError: "",
    rollNoError: "",
  });

  let data = {
    session: "",
    year: "",
    discipline: "",
    rollNo: "",
  };

  const handleChange = (event) => {
    /* props.onRegNum({ data[event.target.name]: event.target.value }); */
    data[event.target.name] = event.target.value;
    console.log(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    /* const data = new FormData(event.currentTarget);
    const a = data.get("age"); */
    // props.onProgram(data.program);

    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  // const handleSubmit = (event, reason) => {
  //   event.preventDefault();
  //   setErrors({ yearError: "", rollNoError: "" });
  //   setIsError({ yearError: false, rollNoError: false });

  //   if (!data.year.match(/[2-3][2-9]/)) {
  //     setIsError({ yearError: true, rollNoError: true });
  //     setErrors({
  //       ...errors,
  //       yearError: "The year should be between 22-39",
  //     });
  //   }

  //   if (!data.rollNo.match(/[0-9][0-9][0-9]/)) {
  //     setIsError({ yearError: true, rollNoError: true });
  //     setErrors({
  //       rollNoError: "Roll Number cannot exceed three digits",
  //     });
  // }

  // if (!errors.yearError && !errors.rollNoError)
  //   setErrors({ yearError: "", rollNoError: "" });

  // if (!errors.yearError && !errors.rollNoError) {
  //   props.onRegNum(data);
  // if (reason !== "backdropClick") {
  //   setOpen(false);
  // }
  // }

  return (
    <div>
      <Button fullWidth variant="outlined" onClick={handleClickOpen}>
        Enter Registration Number Here
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Enter registration Number</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Session</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="session"
                name="session"
                variant="standard"
                defaultValue=""
                /* value="" */
                label="session"
                onChange={handleChange}
              >
                {/* <MenuItem value="">
                  <em>-</em>
                </MenuItem> */}
                <MenuItem value={"SP"}>SP</MenuItem>
                <MenuItem value={"FA"}>FA</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                type="number"
                sx={{ m: 1, maxWidth: 120 }}
                error={isError.yearError}
                helperText={errors.yearError}
                required
                autoComplete="given-name"
                name="year"
                variant="standard"
                placeholder="00"
                id="year"
                label="Year"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: 120 }}>
              <InputLabel id="demo-simple-select-label">Discipline</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="discipline"
                name="discipline"
                variant="standard"
                /* value="" */
                label="Discipline"
                onChange={handleChange}
              >
                <MenuItem value={"CS"}>CS</MenuItem>
                <MenuItem value={"SE"}>SE</MenuItem>
                <MenuItem value={"IS"}>IS</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                type="number"
                error={isError.rollNoError}
                helperText={errors.rollNoError}
                required
                sx={{ m: 1, width: 120 }}
                autoComplete="given-name"
                name="rollNo"
                variant="standard"
                placeholder="000"
                id="rollNo"
                label="Roll No."
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" /* onClick={handleSubmit} */>Ok</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
