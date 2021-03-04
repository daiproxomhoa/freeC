import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

class LoadingButton extends React.PureComponent {
  render() {
    const {
      children,
      loading,
      loadingColor,
      onClick,
      disableRipple,
      ...rest
    } = this.props;
    return (
      <Button
        {...rest}
        disabled={rest.disabled || loading}
        onClick={!loading ? onClick : undefined}
        disableRipple={loading ? true : disableRipple}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ opacity: loading ? 0.5 : 1 }}>{children}</div>
          {loading && (
            <CircularProgress
              size={24}
              color={
                loadingColor || rest.color === "default"
                  ? "primary"
                  : rest.color
              }
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </div>
      </Button>
    );
  }
}
export default LoadingButton;
