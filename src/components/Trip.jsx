import React, { forwardRef, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { DatePicker } from "@material-ui/pickers";
import tripContext from "../contexts/tripContext";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Trip() {
  const {
    setDepartureCity,
    departureCity,
    setArrivalCity,
    arrivalCity,
    setDepartureCityCoordinates,
    setArrivalCityCoordinates,
    selectedDate,
    handleDateChange,
  } = useContext(tripContext);
  const classes = useStyles();

  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);

  const handleClickOpenDeparture = () => {
    setOpenDeparture(true);
  };
  const handleCloseDeparture = () => {
    setOpenDeparture(false);
  };
  const handleClickOpenArrival = () => {
    setOpenArrival(true);
  };
  const handleCloseArrival = () => {
    setOpenArrival(false);
  };

  const cities = [
    { name: "Bordeaux", coordinates: "44.8333, -0.5667" },
    { name: "Lille", coordinates: "50.6333, 3.0667" },
    { name: "Lyon", coordinates: "45.75, 4.85" },
    { name: "Marseille", coordinates: "43.296482,  5.36978" },
    { name: "Paris", coordinates: "48.8534, 2.3488" },
    { name: "Rennes", coordinates: "48.0833, -1.6833" },
    { name: "Toulouse", coordinates: "43.604652, 1.444209" },
  ];

  const [ableToValidate, setAbleToValidate] = useState(false);
  useEffect(() => {
    if (
      departureCity !== "Select your departure city" &&
      arrivalCity !== "Select your arrival city" &&
      selectedDate !== "1920-11-20"
    ) {
      setAbleToValidate(true);
    }
  }, [departureCity, arrivalCity, selectedDate]);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      {/* Departure Button */}
      <Grid style={{ margin: 50 }} xs={9}>
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenDeparture}
          >
            {departureCity}
          </Button>
        </Grid>
        <Dialog
          fullScreen
          open={openDeparture}
          onClose={handleCloseDeparture}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDeparture}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                DEPART
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {cities.map((city) => {
              return (
                <>
                  <ListItem
                    button
                    key={city.name}
                    onClick={() => {
                      handleCloseDeparture();
                      setDepartureCity(city.name);
                      setDepartureCityCoordinates(city.coordinates);
                    }}
                  >
                    <ListItemText primary={city.name} />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Dialog>
      </Grid>

      {/* Arrival Button */}
      <Grid style={{ margin: 25 }} xs={9}>
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenArrival}
          >
            {arrivalCity}
          </Button>
        </Grid>
        <Dialog
          fullScreen
          open={openArrival}
          onClose={handleCloseArrival}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseArrival}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                ARRIVÉE
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {cities.map((city) => {
              return (
                <>
                  <ListItem
                    key={city.name}
                    button
                    onClick={() => {
                      handleCloseArrival();
                      setArrivalCity(city.name);
                      setArrivalCityCoordinates(city.coordinates);
                    }}
                  >
                    <ListItemText primary={city.name} />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Dialog>
      </Grid>

      {/* Date selection */}
      <Grid style={{ margin: 25 }} xs={9}>
        <DatePicker
          label="Departure date"
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling
        />
      </Grid>

      {/* Validation button */}
      <Grid style={{ margin: 25 }} xs={9}>
        <Button
          disabled={!ableToValidate}
          component={Link}
          to={"/trip-search-results"}
          variant="contained"
          color="primary"
        >
          Validate
        </Button>
      </Grid>
    </Grid>
  );
}

export default Trip;
