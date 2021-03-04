import { FormControl, FormHelperText, InputLabel } from "@material-ui/core";
import React from "react";
import { BootstrapInput, redMark } from "./element";

const FormControlTextField = (props) => {
  const {
    id,
    label,
    formControlStyle,
    labelStyle,
    errorMessage,
    optional,
    focused,
    fullWidth,
    disabledHelper,
    ...rest
  } = props;

  return (
    <FormControl
      focused={focused}
      style={formControlStyle}
      error={focused ? false : !!errorMessage}
      fullWidth
    >
      {label && (
        <InputLabel shrink htmlFor={id} style={labelStyle}>
          {label}
          {!optional && <span> &nbsp;{redMark}</span>}
        </InputLabel>
      )}
      <BootstrapInput
        id={id}
        {...rest}
        error={focused ? false : !!errorMessage}
      />
      {!disabledHelper && (
        <FormHelperText id={id} style={{ minHeight: 20 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormControlTextField;
