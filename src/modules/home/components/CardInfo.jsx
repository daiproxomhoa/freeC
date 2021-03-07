import {Paper, Typography} from "@material-ui/core";
import React from "react";
import "./stylesheet.scss";
import moment from "moment";

const CardInfo = (props) => {
    const {data, onClick} = props;

    return (
        <div className={"card p-8"} onClick={onClick}>
            <Paper>
                <div className="card__content">
                    <a href={data.url} target="__blank">
                        {data.image ? (
                            <img src={data?.image} alt="" className="card__image"/>
                        ) : (
                            <div className="card__image"/>
                        )}
                    </a>
                    <div className="p-8">
                        <Typography variant="subtitle2">{data.title}</Typography>
                        <Typography
                            variant="subtitle2">{moment(data.start).format("MM/YYYY")}&nbsp;-&nbsp;{moment(data.end).format("MM/YYYY")}</Typography>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default CardInfo;
