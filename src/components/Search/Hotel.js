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
    height: 140,
  },
  btnSearch: {
    background: '#3f51b5',
    color: '#fff',
    '&:hover': {
      background: fade('#3f51b5', 0.75),
    },
  },
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    border: 1,
  },
}));

export default function Hotel({hotel, offers, listId, add_btn}) {
  const classes = useStyles();
  const {addHotelCard} = useContext(storeApi);
  const addBtn = (add_btn) =>{
    if(add_btn){
      return(
        <Button className={classes.btnSearch} onClick={() => addHotelCard(hotel.name, listId, hotel, offers)}>
          Add
        </Button>
      );
    }
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend"></Typography>
            <Rating name="read-only" value={hotel.rating} readOnly />
          </Box>
          <Typography gutterBottom variant="h5" component="h2">
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {hotel.address.cityName} {hotel.address.lines[0]} {hotel.address.postalCode}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          From {offers[0].price.base} {offers[0].price.currency} 
        </Button>
        {addBtn(add_btn)}

      </CardActions>
    </Card>
  );
}
