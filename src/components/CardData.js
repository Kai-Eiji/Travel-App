import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { lightBlue, lightGreen } from '@material-ui/core/colors';

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },

  hotel:{
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    backgroundColor: lightBlue,
  },

  activity:{
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    backgroundColor: lightGreen,
  }

}));
export default function CardData({card}) {
  const classes = useStyle();

  function returnCard(data_type){
    if(data_type === "hotel"){
      return <Paper className={classes.hotel}>{card.title}</Paper>
    }
    else{
      return <Paper className={classes.card}>{card.title}</Paper>
    }
  }

  return (
        <Paper className={classes.card}>{card.title}</Paper> 
  );
}
