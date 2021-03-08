import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import DateRangePickerElement from "../../../common/date-range/DateRangePickerElement";
import { goToReplace } from "../../../common/reducer";
import CardInfo from "./CardInfo";
import ModalDetailInfo from "./ModalDetailInfo";
import "./stylesheet.scss";

const Profile = (props) => {
  const { data } = props;
  const [detail, setDetail] = React.useState();
  const [filters, setFilters] = React.useState({});
  const dispatch = useDispatch();
  const location = useLocation();

  const updateQueryParams = React.useCallback(() => {
    if (location.search) {
      const filterParams = new URLSearchParams(location.search);
      console.log("filterParams", filterParams, filterParams.get("start"));
      const tmp = {
        start: filterParams.get("start")
          ? parseInt(`${filterParams.get("start")}`, 10)
          : undefined,
        end: filterParams.get("end")
          ? parseInt(`${filterParams.get("end")}`, 10)
          : undefined,
      };
      setFilters(tmp);
    }
  }, [location.search]);

  React.useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  return (
    <div className="home">
      <div className="tab-container d-flex-center d-flex-column p-24">
        <Typography variant={"subtitle1"}>{data.name}</Typography>
        <Typography variant={"subtitle1"}>{data.birthday}</Typography>
        <Typography variant={"subtitle1"}>{data.school}</Typography>
      </div>
      <div className="d-flex justify-content-end m-t-16 m-r-24">
        <DateRangePickerElement
          style={{ width: 270 }}
          direction="left"
          startDate={filters?.start ? moment(filters?.start) : undefined}
          endDate={filters?.end ? moment(filters?.end) : undefined}
          onChange={(start, end) => {
            dispatch(
              goToReplace({
                search: `start=${encodeURIComponent(
                  start?.valueOf()
                )}&end=${encodeURIComponent(end?.valueOf())}`,
              })
            );
          }}
        />
      </div>
      <Container>
        <div className="body-container d-flex justify-content-center   d-flex-wrap p-24">
          {data.profile.map((v, index) => (
            <CardInfo
              key={index}
              data={v}
              onClick={() => {
                setDetail(v);
              }}
            />
          ))}
        </div>
      </Container>
      {detail && (
        <ModalDetailInfo
          data={detail}
          onClose={() => {
            setDetail(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
