import {Avatar, Container, Paper, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import React from "react";
import CardInfo from "./CardInfo";
import "./stylesheet.scss";
import ModalDetailInfo from "./ModalDetailInfo";

const Profile = (props) => {
    const {data} = props;
    const [detail, setDetail] = React.useState()
    return (
        <div className="home">
            <div className="tab-container d-flex-center d-flex-column p-24">
                <Typography variant={"subtitle1"}>{data.name}</Typography>
                <Typography variant={"subtitle1"}>{data.birthday}</Typography>
                <Typography variant={"subtitle1"}>{data.school}</Typography>
            </div>
            <Container>
                <div className="body-container d-flex justify-content-center   d-flex-wrap p-24">
                    {data.profile.map((v, index) => (
                        <CardInfo key={index} data={v} onClick={() => {
                            setDetail(v)
                        }}/>
                    ))}
                </div>
            </Container>
            {detail && <ModalDetailInfo data={detail} onClose={() => {
                setDetail(undefined)
            }}/>}
        </div>
    );
};

export default Profile;
