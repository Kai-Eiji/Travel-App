// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hotel from './Hotel';

const useStyle = makeStyles((theme) => ({
  root: {
      minWidth: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }
}));

var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: 'eua8lrUooQFG8MJfRB5OAbll6qvFAi1H',
    clientSecret: 'vvXjJKIGj5JyJrtY'
});

export default function Asynchronous({listId}) {
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [select_city, setSelectedCity] = React.useState("");
  const [hotel_list, setHotels] = React.useState([]);
  const [no_result, setNoResult] = React.useState(false)
  const loading = open && options.length === 0;
  const searching = select_city != "" && hotel_list.length == 0
  let prev_search_input = "";

  const searchCity = (city_input) => {
    return amadeus.referenceData.locations.get({
        keyword : city_input,
        subType : Amadeus.location.city
    });
   };

   const getHotels = (city_code) =>{
     return amadeus.shopping.hotelOffers.get({cityCode : city_code});
   }

   const citySelected = (option, value) => {
     console.log("selcting city");
     if(option.name === value.name ){
        console.log("value", value.name)
        console.log("option", option.name)
        let city_code = option.address.cityCode;
        setSelectedCity(city_code);
        return true;
     }
     else{
         console.log("value", value.name)
         console.log("option", option.name)
         return false;
     }
   };

   const getCityName = (option) =>{
    if(option.address.countryCode === "US"){
          return option.address.cityName + "  " + option.address.stateCode;
    }
    else{
      return option.name;
    }
   };

   const changeOptions = (event, val, reason) => {
    if(open  && reason ==="input" && val.length >= prev_search_input){
        prev_search_input = val;
        (async () => {
            const response = await searchCity(val);
            const cities = await response.data;
            Object.keys(cities).map((key) => console.log("city-key",cities[key]));
            setOptions(Object.keys(cities).map((key) => cities[key]));
          })();
       }
    }
    
  React.useEffect(() => {
    if(select_city != ""){
      
        (async () => {
            setHotels([])
            if(no_result){
              setNoResult(false)
            }
            console.log("get hotels on", select_city);
            try{
              let hotel_data = await getHotels(select_city);
              let status = hotel_data.status
              console.log("hotel data", hotel_data);
              console.log("hotels", hotel_data.data);
              if(hotel_data.data.length == 0){
                setNoResult(true)
              }
              else{
                setHotels(hotel_data.data);
              }
            }catch(err){
              console.log("error on searching hotels")
              setNoResult(true)
            }
            })();
    }
  }, [select_city])

  React.useEffect(() => {
    if (!open) {
        setOptions([]);
    }
  }, [open]);

  return (
    <div>
        <Autocomplete
          className={classes.root}
          id="asynchronous-demo"
          open={open}
          onOpen={() => {
              setOpen(true);
          }}
          onClose={() => {
              setOpen(false);
          }}
          onInputChange={(event, value, reason) => changeOptions(event, value, reason)}
          getOptionSelected={(option, value) => citySelected(option, value)}
          getOptionLabel={(option) => getCityName(option)}
          options={options}
          loading={loading}
          renderInput={(params) => (
              <TextField
              {...params}
              label="Enter City Name"
              variant="outlined"
              InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                  <React.Fragment>
                      {loading ? <CircularProgress id="loader" color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                  </React.Fragment>
                  ),
              }}
              />
          )}
        />
        {searching && !no_result ? <div style={{display: "flex"}}><p>Searching Hotels...</p> <CircularProgress id="loader" color="inherit" size={20} style={{marginTop:"10px", marginLeft:"10px"}} /></div> : null}
        {no_result ? <p>No Results Found</p> :hotel_list.map((hotel) => (
            <Hotel key={hotel.hotel.hotelId} hotel={hotel.hotel} offers={hotel.offers} listId={listId} add_btn={true}/>
        ))}
    </div>
  );
}
