import React , { useState, useContext } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import storeApi from '../../utils/storeApi'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  btnSearch: {
    background: '#3f51b5',
    color: '#fff',
    '&:hover': {
      background: fade('#3f51b5', 0.75),
    },
  },
  card: {
    maxWidth: 500,
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    border: 1,
  },
}));

export default function Activity({point, listId, add_btn}) {
  const classes = useStyles();
  const {addActivityCard} = useContext(storeApi);
  const addBtn = (add_btn) =>{
    if(add_btn){
      return(
        <Button className={classes.btnSearch} onClick={() => addActivityCard(point.name, listId, point)}>
          Add
        </Button>
      );
    }
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
      <CardMedia
          className={classes.media}
          image={point.images[0].sizes.medium.url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {point.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {point.snippet}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {addBtn(add_btn)}
      </CardActions>
    </Card>
  );
}
