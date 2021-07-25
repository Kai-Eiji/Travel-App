import React , { useState, useContext } from 'react';
import { Paper, Button, IconButton, Popover, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { lightBlue, lightGreen } from '@material-ui/core/colors';
import Hotel from './Search/Hotel';
import Activity from './Search/Activity';
import storeApi from '../utils/storeApi'

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },

  hotel:{
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    backgroundColor: 'lightBlue',
  },

  activity:{
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    backgroundColor: 'lightGreen',
  },

  btnDetail: {
    float: "right",
    background: '#5AAC44',
    marginLeft: 3,
    marginTop: 5,
    marginRight: -17,
    minWidth: 25,
    height: 15,
    fontSize: 10,
    color: '#fff',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    },
  },

  deleteBtn: {
    float: "right",
    background: 'red',
    marginTop: -8,
    marginRight: -5,
    minWidth: 10,
    height: 10,
    fontSize: 10,
    color: '#fff',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    },
  },

}));

export default function Card({ card, index }) {
  const classes = useStyle();
  const {deleteHotelCard, deleteActivityCard, deletePlanCard} = useContext(storeApi);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let cardStyle = classes.card;

  if(card.type === "hotel"){
    cardStyle = classes.hotel;
  }
  else if(card.type === "activity"){
    cardStyle = classes.activity;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(card);
  };

  const deleteHotel = (hotelId) => {
    deleteHotelCard('list-2', hotelId)
  }

  const deleteActivity = (activityId) => {
    deleteActivityCard('list-3', activityId)
  }

  const deletePlan = (planId) => {
    deletePlanCard('list-1', planId)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if(card.type === "hotel"){
  return (
    <Draggable id={card.id} draggableId={card.id} index={index}>
      
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={cardStyle}>{card.title}
          <Button onClick={() => deleteHotel(card.id)} size="small" className={classes.deleteBtn}>
            X
          </Button>
          <Button size="small" className={classes.btnDetail} 
            aria-describedby={id} 
            variant="contained"  
            onClick={handleClick}
            >
            Detail
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Hotel key={card.hotel_data.hotelId} hotel={card.hotel_data} offers={card.offers} listId="" add_btn={false}/> 
          </Popover>
          </Paper>
        </div>
      )}
    </Draggable>
  );
  }
  else if(card.type === "activity"){
    return (
      <Draggable draggableId={card.id} index={index}>
        
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Paper className={cardStyle}>{card.title}
            <Button onClick={() => deleteActivity(card.id)} size="small" className={classes.deleteBtn}>
              X
            </Button>
            <Button size="small" className={classes.btnDetail} 
              aria-describedby={id} 
              variant="contained"  
              onClick={handleClick}>
              Detail
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typography}>
                <Activity key={card.activity_data.id} point={card.activity_data} listId="" add_btn={false} />
              </Typography>
            </Popover>
            </Paper>
          </div>
        )}
      </Draggable>
    );
  }
  else{
    return (
      <Draggable draggableId={card.id} index={index}>
        
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Paper className={cardStyle}>{card.title}
            <Button  onClick={() => deletePlan(card.id)} size="small" className={classes.deleteBtn}>
              X
            </Button>
            </Paper>
          </div>
        )}
      </Draggable>
    );
  }
}
