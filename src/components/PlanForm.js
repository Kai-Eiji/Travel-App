import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Popover } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import storeApi from '../utils/storeApi'

const useStyle = makeStyles((theme) => ({
    btnAdd: {
      background: '#3f51b5',
      color: '#fff',
      '&:hover': {
        background: fade('#3f51b5', 0.75),
      },
    },
  }));

export default function PlanForm({listId}) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    const {addPlanCard} = useContext(storeApi);

    const addPlan = (planText) =>{
        addPlanCard("list-1", planText)
    }

    const toggleOpen = () =>{
        setOpen(!open)
    }

    const handleKeypress = e => {
      if (e.which === 13) {
          if(e.target.value.length > 0){
              addPlan(e.target.value)
          }
        setOpen(false)
      }
    };
    return(
        <React.Fragment >
            <div style={{display: "flex", flexDirection: "column-reverse"}}>
                <Button onClick={toggleOpen} 
                        className={classes.btnAdd} 
                        style={{maxWidth: "64px", maxHeight: "36px"}}>
                    {
                        open ? "CANCEL" : "ADD"
                    }
                </Button>
                {
                    open ? 
                    <TextField
                        onKeyPress={handleKeypress}
                        label="Write down your plans"
                        variant="outlined"
                        style={{margin: "5px"}}
                    />
                    :
                    <div></div>
                }
            </div>
           
        </React.Fragment>
        
    )
}