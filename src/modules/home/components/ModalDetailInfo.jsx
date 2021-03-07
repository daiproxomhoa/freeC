import {Dialog, IconButton, Typography} from "@material-ui/core";
import React from "react";
import "./stylesheet.scss";
import CloseIcon from '@material-ui/icons/Close';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {GREY_500} from "../../../configs/colors";

const ModalDetailInfo = (props) => {
    const {data, onClose} = props;
    console.log('data', data)
    const {activity = []} = data
    return (
        <Dialog
            open={!!data}
            PaperProps={{
                style: {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    minHeight: '95vh',
                    display: 'flex',
                    borderRadius: '0px',
                    flexDirection: 'column',
                    position: 'relative',
                },
            }}
            onBackdropClick={onClose}
        >

            <div className={'d-flex p-12 position-stick'}>
                <Typography variant="subtitle1" style={{marginRight: 50}}>{data.title}</Typography>{' '}
                <IconButton
                    style={{
                        background: 'white',
                        position: 'absolute',
                        right: 0,
                        top: 0
                    }}
                    color="default"
                    size="medium"
                    onClick={() => onClose()}
                >
                    <CloseIcon style={{color: GREY_500, fontSize: 24}}/>
                </IconButton>
            </div>
            <div className={'p-12 flex-1'}>
                {activity.map((value, index) => {
                    const {images = [], content, title} = value
                    return <div key={index}>
                        <div>
                            {title && <Typography style={{marginBottom: 8}} variant={'subtitle1'}>{title}</Typography>}
                            {images.length > 1 && (<div>
                                <ImageGallery
                                    items={
                                        images.map((v) => {
                                            return {
                                                original: v,
                                                thumbnail: v,
                                            };
                                        })
                                    }
                                    renderItem={item => (
                                        <img
                                            src={item.original}
                                            style={{
                                                width: '536px',
                                                height: '302px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                    infinite
                                    thumbnailPosition="bottom"
                                    showThumbnails
                                    showIndex
                                    slideDuration={400}
                                    startIndex={0}
                                    autoPlay
                                />
                            </div>)}
                            <ul>
                                {content.map((v, i) => <li key={i}>
                                    <Typography variant={"body2"}>{v}</Typography>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                })}
            </div>
        </Dialog>

    );
};

export default ModalDetailInfo;
