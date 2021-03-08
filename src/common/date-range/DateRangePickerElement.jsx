import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  RootRef,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { DayPickerRangeController } from "react-dates";
import { CSSTransition } from "react-transition-group";
import { PRIMARY } from "../../configs/colors";
import { DATE_FORMAT } from "../../models/moment";
import { ReactComponent as IconCalender } from "../../img/ic_calendar.svg";
import FormControlTextField from "../FormControlTextField";
import { Col, DateMaskCustomRange, DateMaskCustomSingle } from "../element";
import styles from "./styles.module.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const renderMonthText = (month) => month.format("MMMM - YYYY");

export function isDayHighlighted(day, start, end) {
  return moment().startOf("day").isSame(day.startOf("day")) ? (
    <span
      className="text-bold"
      style={{
        color:
          (start && moment().startOf("day").isSame(start.startOf("day"))) ||
          (end && moment().startOf("day").isSame(end.startOf("day")))
            ? undefined
            : PRIMARY,
      }}
    >
      {day.format("D")}
    </span>
  ) : (
    day.format("D")
  );
}

const DateRangeFormControl = (props) => {
  const {
    onChange,
    startDate,
    endDate,
    optional,
    errorMessage,
    inputStyle,
    labelStyle,
    style,
    label,
    minimizedWidth,
    singleValue,
    numberOfMonths,
    placeholder,
    startAdornment,
    disableAdornment,
    disabledHelper,
    isOutsideRange,
    onClickBtn,
    renderString,
    iRef,
    idFocus,
    direction,
  } = props;

  const customString = React.useCallback(
    (start, end, single) => {
      return renderString
        ? renderString(start, end, single)
        : single
        ? `${start ? start.format(DATE_FORMAT) : "notChosen"}`
        : `${start ? start.format(DATE_FORMAT) : "notChosen"} - ${
            end ? end.format(DATE_FORMAT) : "notChosen"
          }`;
    },
    [renderString]
  );

  const [focusedInput, setFocusedInput] = React.useState("startDate");
  const [dateFormatStr, setDateFormatStr] = React.useState(
    customString(startDate, endDate, singleValue)
  );
  const [start, setStartDate] = React.useState();
  const [end, setEndDate] = React.useState();
  const [isFocused, setFocus] = React.useState(false);
  const [height, setHeight] = React.useState(0);

  const parent = iRef || React.createRef();
  const inputRef = React.useRef();
  const innerRef = React.useRef();

  const defaultOutsideRange = React.useCallback((e) => {
    return (
      moment().endOf("day").isSameOrBefore(e) ||
      moment().subtract(6, "month").startOf("day").isAfter(e)
    );
  }, []);

  const onBlur = React.useCallback(
    (e) => {
      if (e.relatedTarget instanceof Element) {
        if (e.currentTarget.contains(e.relatedTarget)) {
          if (
            inputRef.current &&
            (e.relatedTarget.id !== "selectDateRange" ||
              e.relatedTarget.tagName !== "INPUT")
          ) {
            inputRef.current?.focus();
            return;
          }

          if (parent.current) {
            parent.current.focus();
            return;
          }
        }
      }
      if (isFocused) {
        setFocus(false);
        onChange(start, end);
        setDateFormatStr(customString(start, end, singleValue));
      }
    },
    [isFocused, parent, onChange, start, end, customString, singleValue]
  );

  const textChange = React.useCallback(
    (text) => {
      const newDateValues = text.split(" - ");
      const newStartDate = moment(newDateValues[0], DATE_FORMAT, true);
      const newEndDate = newDateValues[1]
        ? moment(newDateValues[1], DATE_FORMAT, true)
        : undefined;
      if (
        newStartDate &&
        newStartDate.isValid() &&
        (isOutsideRange
          ? !isOutsideRange(newStartDate)
          : !defaultOutsideRange(newStartDate))
      ) {
        setStartDate(newStartDate);
      } else {
        setStartDate(undefined);
      }
      if (
        newEndDate?.isValid() &&
        newEndDate.isAfter(newStartDate) &&
        (isOutsideRange
          ? !isOutsideRange(newEndDate)
          : !defaultOutsideRange(newEndDate))
      ) {
        setEndDate(newEndDate);
      } else {
        setEndDate(undefined);
      }
    },
    [defaultOutsideRange, isOutsideRange]
  );

  React.useEffect(() => {
    singleValue && setFocusedInput("startDate");
    setStartDate(startDate);
    setEndDate(singleValue ? undefined : endDate);
    setDateFormatStr(customString(startDate, endDate, singleValue));
  }, [startDate, endDate, singleValue, customString]);

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [inputRef, isFocused, singleValue]);

  React.useEffect(() => {
    setHeight(innerRef.current?.offsetHeight);
  }, []);

  return (
    <FormControl
      style={{
        position: "relative",
        outline: "none",
        minHeight: height,
        color: isFocused ? "black" : undefined,
        ...style,
      }}
      role="group"
      tabIndex={-1}
      ref={parent}
      onBlur={onBlur}
      onFocus={(e) => {
        let focus = true;
        idFocus?.forEach((v) => {
          if (e.target.id === v) {
            focus = false;
          }
        });
        if (focus) {
          if (e.target !== parent.current && inputRef.current) {
            inputRef.current.focus();
          }
          setFocus(true);
        }
      }}
    >
      <div
        className="wrap-paper"
        style={{
          boxShadow: isFocused ? "0px 4px 8px rgba(0, 0, 0, 0.25)" : undefined,
          zIndex: isFocused ? 100 : 0,
          backgroundColor: isFocused
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0)",
          margin: isFocused
            ? direction === "center"
              ? "-12px 0px"
              : "-12px"
            : undefined,
          transition: "none",
          right: direction === "left" ? 0 : undefined,
          left:
            direction === "left"
              ? "unset"
              : direction === "center"
              ? "50%"
              : undefined,
          transform: direction === "center" ? "translateX(-50%)" : undefined,
        }}
      >
        <div style={{ padding: isFocused ? "12px 12px 0px 12px" : undefined }}>
          <RootRef rootRef={innerRef}>
            <FormControlTextField
              id="selectDateRange"
              inputRef={inputRef}
              label={label}
              labelStyle={labelStyle}
              formControlStyle={{
                margin: 0,
                width: "100%",
                minWidth: minimizedWidth,
              }}
              style={{
                background: "white",
                ...inputStyle,
              }}
              placeholder={
                placeholder ||
                (singleValue
                  ? `${DATE_FORMAT.toLocaleLowerCase()}`
                  : `${DATE_FORMAT.toLocaleLowerCase()} - ${DATE_FORMAT.toLocaleLowerCase()}`)
              }
              fullWidth
              value={dateFormatStr}
              optional={optional}
              inputProps={{ style: { width: "100%" } }}
              onChange={(e) => {
                setDateFormatStr(e.target.value);
                textChange(e.target.value);
              }}
              errorMessage={errorMessage}
              inputComponent={
                isFocused
                  ? singleValue
                    ? DateMaskCustomSingle
                    : DateMaskCustomRange
                  : undefined
              }
              endAdornment={
                !startAdornment &&
                !disableAdornment && (
                  <InputAdornment position="end" style={{ marginRight: 8 }}>
                    <IconButton size="small" edge="start" tabIndex={-1}>
                      <IconCalender />
                    </IconButton>
                  </InputAdornment>
                )
              }
              startAdornment={
                startAdornment &&
                !disableAdornment && (
                  <InputAdornment position="start" style={{ marginLeft: 8 }}>
                    <IconButton size="small" edge="start" tabIndex={-1}>
                      <IconCalender />
                    </IconButton>
                  </InputAdornment>
                )
              }
              disabledHelper={disabledHelper}
            />
          </RootRef>
        </div>
        <CSSTransition
          timeout={200}
          in={isFocused}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.leave,
            exitActive: styles.leaveActive,
          }}
          unmountOnExit
        >
          <Col
            key={1}
            style={{
              transition: "all 300ms ease",
              backgroundColor: "white",
              width: isFocused ? undefined : 0,
              alignItems: "center",
            }}
          >
            <DayPickerRangeController
              hideKeyboardShortcutsPanel
              noBorder
              daySize={40}
              numberOfMonths={numberOfMonths || 1}
              startDate={start || null}
              endDate={end || null}
              focusedInput={focusedInput}
              onDatesChange={(value) => {
                onChange(
                  value.startDate || undefined,
                  value.endDate || undefined
                );
              }}
              onFocusChange={(text) =>
                setFocusedInput(singleValue ? "startDate" : text || "startDate")
              }
              isOutsideRange={(e) =>
                isOutsideRange ? isOutsideRange(e) : defaultOutsideRange(e)
              }
              minimumNights={0}
              renderMonthText={renderMonthText}
              renderDayContents={(day) => isDayHighlighted(day, start, end)}
            />
            <div
              style={{ alignSelf: "flex-end", padding: "0px 12px 12px 0px" }}
            >
              <Button
                id="Search_flight.Flight_Departure"
                disableElevation
                style={{ minWidth: "140px" }}
                size="large"
                color="secondary"
                variant="contained"
                onClick={() => {
                  parent.current?.blur();
                  inputRef.current?.blur();
                  onClickBtn && onClickBtn();
                }}
              >
                Accept
              </Button>
            </div>
          </Col>
        </CSSTransition>
      </div>
    </FormControl>
  );
};

export default DateRangeFormControl;
