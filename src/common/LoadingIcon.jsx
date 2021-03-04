import { CircularProgress } from "@material-ui/core";
import React from "react";

const LoadingIcon = (props) => {
  const { children, loadingColor, style, ...rest } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        minHeight: 320,
        flex: 1,
        ...style,
      }}
    >
      <CircularProgress
        size={48}
        color={
          loadingColor || loadingColor === "default" ? "primary" : rest.color
        }
        {...rest}
      />
    </div>
  );
};
export default LoadingIcon;
