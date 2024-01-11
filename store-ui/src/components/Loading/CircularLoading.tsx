// @flow
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type Props = {};
export const CircularLoading = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
      }}
    >
      <CircularProgress sx={{ color: "#AAFF38" }} size={100} thickness={10} />
      <Typography variant="h4" sx={{ pl: 2 }}>
        로딩중..🌱
      </Typography>
    </div>
  );
};
