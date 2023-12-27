import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A6CF5B",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#A6CF5B",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#222222",
    },
    "&:hover fieldset": {
      borderColor: "#A6CF5B",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#A6CF5B",
    },
  },
});
