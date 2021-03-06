import { createStyles, InputBase, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { GREY_100, GREY_400, GREY_500, RED } from "../configs/colors";
import { HEADER_HEIGHT } from "../layout/constants";

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;


export const PageWrapper = styled.div`
  min-height: ${window.innerHeight - HEADER_HEIGHT}px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      minHeight: 40,
      padding: 0,
      border: `1px solid ${GREY_400}`,
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      overflow: 'hidden',
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      fontSize: theme.typography.body2.fontSize,
      padding: '8px',
    },
    focused: {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    error: {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.error.main,
    },
    disabled: {
      backgroundColor: GREY_100,
      color: GREY_500,
    },
  }),
)(InputBase);

export const redMark = <span style={{ color: RED }}>*</span>;