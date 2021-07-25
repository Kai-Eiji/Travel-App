// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Activity from './Activity';

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

const TRIPOSO_ID = "8JDTJD8X";
const TRIPOSO_KEY = "wfekt99x5s63762snq80d1l21hl94bpn";

export default function ActivitySearch({listId}) {
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [point_list, setPoints] = React.useState([]);
  const [select_city, setSelectedCity] = React.useState("");
  const [isSelected, setIsSelected] = React.useState(false)
  const [no_result, setNoResult] = React.useState(false)
  const loading = open && options.length === 0;
  const searching = select_city != "" && point_list.length == 0

  const searchCity = (city_input) => {
    return amadeus.referenceData.locations.get({
        keyword : city_input,
        subType : Amadeus.location.city
    });
   };

   const getLocationId = (cityName, stateCode) =>{
       if(stateCode == null){
        axios.get(`https://www.triposo.com/api/20180206/location.json?tag_labels=city&annotate=trigram:${cityName}&trigram=>=0.3&count=1&fields=id,name&order_by=-trigram&account=${TRIPOSO_ID}&token=${TRIPOSO_KEY}`)
        .then(res => {
            return res.data.results[0].id;
          })
        .then(loc_id =>{
            //console.log("loc_id", loc_id);
            return axios.get(`https://www.triposo.com/api/20180206/poi.json?location_id=${loc_id}&tag_labels=sightseeing&count=20&fields=id,name,score,snippet,booking_info,images,tag_labels&order_by=-score&account=${TRIPOSO_ID}&token=${TRIPOSO_KEY}`)
        })
        .then(res => {
            //console.log("point data", res.data);
            setPoints(res.data.results);
            return res.data.results;
        })
        .catch(error => {
            //console.log("error", error);
            setNoResult(true)
        });
       }
       else{
        axios.get(`https://www.triposo.com/api/20180206/location.json?tag_labels=city&annotate=trigram:${cityName}&us_statecode=${stateCode}&trigram=>=0.3&count=1&fields=id,name&order_by=-trigram&account=${TRIPOSO_ID}&token=${TRIPOSO_KEY}`)
        .then(res => {
            return res.data.results[0].id;
          })
        .then(loc_id =>{
            //console.log("loc_id", loc_id);
            return axios.get(`https://www.triposo.com/api/20180206/poi.json?location_id=${loc_id}&tag_labels=sightseeing&count=20&fields=id,name,score,snippet,booking_info,images,tag_labels&order_by=-score&account=${TRIPOSO_ID}&token=${TRIPOSO_KEY}`)
        })
        .then(res => {
            console.log("point data", res.data);
            setPoints(res.data.results);
            return res.data.results;
        })
        .catch(error => {
            console.log("error", error);
            setNoResult(true)
        });
       }
   }

   const citySelected = (option, value) => {
     if(option.name === value.name && isSelected){
        let city_name = option.address.cityName;
        let state_code = null;
        let city_code = option.address.cityCode;
        if(option.address.countryCode === "US"){
            state_code = option.address.stateCode;
        }
        setNoResult(false)
        setPoints([])
        getLocationId(city_name, state_code);
        setSelectedCity(city_code);
        setIsSelected(false)
        return true;
     }
     else{
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

   const changeOptions = (event, value, reason) => {
    // console.log(value);
    // console.log(reason)
    if(open  && reason ==="input"){
        (async () => {
            const response = await searchCity(value);
            //console.log("search city result", response.data);
            const cities = await response.data;
            //Object.keys(cities).map((key) => console.log("city-key",cities[key]));
            setOptions(Object.keys(cities).map((key) => cities[key]));
          })();
       }
    }

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
        getOptionSelected={(option, value) => {citySelected(option, value); console.log("getOptionSelected")}}
        getOptionLabel={(option) => getCityName(option)}
        onChange={(event, value) => {console.log("onChange"); setIsSelected(true)}}
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
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                </React.Fragment>
                ),
            }}
            />
        )}
        />
        {/* {console.log("search", searching)}
        {console.log("no result", no_result)} */}
        {searching && !no_result? <div style={{display: "flex"}}><p>Searching Hotels...</p> <CircularProgress id="loader" color="inherit" size={20} style={{marginTop:"10px", marginLeft:"10px"}} /></div> : null}
        {no_result ? <p>No Results Found</p> :
            point_list.map((point) => (
                <Activity key={point.id} point={point} listId={listId} add_btn={true} />
            ))
        }
    </div>
  );
}
