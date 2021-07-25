import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HotelSearch from './HotelSearch';
import ActivitySearch from './ActivitySearch';
import PlanForm from '../PlanForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow:'scroll',
  },
  paper: {
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({open, setOpen, listId, listType}) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const searchBox = (listId, listType) =>{
    if(listType == "Accomodation"){
      return <HotelSearch listId={listId}/>;
    }
    else if(listType == "Activity"){
      return <ActivitySearch listId={listId}/>;
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {searchBox(listId, listType)}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
