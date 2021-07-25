import React, { useState } from 'react';
import { Paper, Typography, Collapse, Button } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import PlanForm from '../PlanForm';
import SearchModal from '../Search/SearchModal';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    marginTop: theme.spacing(1),
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: '#EBECF0',
    '&:hover': {
      backgroundColor: fade('#000', 0.25),
    },
  },
  btnSearch: {
    background: '#3f51b5',
    color: '#fff',
    '&:hover': {
      background: fade('#3f51b5', 0.75),
    },
  },
}));



export default function InputContainer({ listId, listType, type }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const btnName = (listType) => {
    if(listType === "Accomodation" || listType === "Activity"){
      return "SEARCH"
    }
    else{
      return "ADD ANOTHER LIST" 
    }
  }

  if(listType == "Plan"){
    return(
      <PlanForm listId={listId}/>
    )
  }
  else{
    return (
      <div className={classes.root}>
        <Collapse in={open}>
          <SearchModal open={open} setOpen={setOpen} listId={listId} listType={listType}/>
        </Collapse>
        
        <Paper
          className={classes.addCard}
          elevation={0}
          onClick={() => setOpen(!open)}
        >
          <Button className={classes.btnSearch}>
            {btnName(listType)}
          </Button>
        </Paper>
        
      </div>
    );
  }
}
