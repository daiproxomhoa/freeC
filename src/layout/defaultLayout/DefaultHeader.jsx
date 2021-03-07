import {AppBar, Avatar, Button, Chip, Container} from "@material-ui/core";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {GREY_300} from "../../configs/colors";
import Link from "../../common/Link";
import {clearStoreAfterLogout} from "../../redux/reducers";

const DefaultHeader = (props) => {
    const {noSticky, listRoutes} = props;
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData);
    console.log("listRoutes", listRoutes.filter(v => !v.hidden));

    return (
        <AppBar
            position={noSticky ? "relative" : "sticky"}
            style={{
                backgroundColor: "white",
                boxShadow: "none",
                borderRadius: 0,
                borderBottom: `1px solid ${GREY_300}`,
            }}
        >
            <Container>
                <div className="header d-flex-center d-flex-column p-24">
                    <Avatar
                        variant="circular"
                        src={userData?.avatar}
                        style={{width: 80, height: 80}}
                    />
                    <div className="d-flex m-t-8">
                        {listRoutes.filter(v => !v.hidden).map((v, index) => (
                            <Link key={index} to={{pathname: v.path}}>
                                <Button size="small">
                                    {v.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                    <Button onClick={() => {
                        dispatch(clearStoreAfterLogout())
                    }}>Logout</Button>
                </div>
            </Container>
        </AppBar>
    );
};

export default DefaultHeader;
