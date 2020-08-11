import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//import Collapse from '@material-ui/core/Collapse';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
//import LockIcon from '@material-ui/icons/Lock'
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
//import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
//import { Helmet } from 'react-helmet'
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Logo from "../logo.svg";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import DepartureBoardIcon from "@material-ui/icons/DepartureBoard";
import VpnLockIcon from "@material-ui/icons/VpnLock";

import "../App.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
  }
];
const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column"
  },
  root: {
    flexGrow: 1,
    flex: "1 0 100%"
    // height: '100%',
    // overflow: 'hidden'
  },
  hero: {
    height: "100%",
    // minHeight: '80vh',
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    color:
      theme.palette.type === "light"
        ? theme.palette.primary.dark
        : theme.palette.primary.main
  },
  text: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    letterSpacing: ".7rem",
    textIndent: ".7rem",
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.only("xs")]: {
      fontSize: 24,
      letterSpacing: ".1em",
      textIndent: ".1rem"
    },
    whiteSpace: "nowrap"
  },
  h5: {
    paddingLeft: theme.spacing(1) * 4,
    paddingRight: theme.spacing(1) * 4,
    marginTop: theme.spacing(1),
    maxWidth: 600,
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      fontSize: 18
    }
  },
  content: {
    height: "100%",
    // paddingTop: theme.spacing(1) * 8,
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(1)
    }
  },
  button: {
    marginTop: theme.spacing(1) * 3
  },
  logo: {
    color: "red",
    margin: `${theme.spacing(1) * 3}px 0 ${theme.spacing(1) * 4}px`,
    width: "100%",
    height: "40vw",
    maxHeight: 250
  },
  steps: {
    maxWidth: theme.spacing(1) * 130,
    margin: "auto"
  },
  step: {
    padding: `${theme.spacing(1) * 3}px ${theme.spacing(1) * 2}px`
  },
  stepIcon: {
    marginBottom: theme.spacing(1)
  },
  markdownElement: {},
  cardsContent: {
    padding: 15,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      padding: 0,
      paddingTop: 15
    }
  },
  card: {
    minWidth: 275,
    maxWidth: 350,
    margin: 15,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      margin: 0,
      marginTop: 7
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  cardTitle: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  header: {
    display: "block",
    alignItems: "center",

    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    display: "block",

    overflow: "hidden",
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },

  servis: {
    backgroundImage: "url(/map-image.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    background: "#7ff0ce"
  },
  paper: {
    padding: "6px 16px"
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      activeStep: 0,
      expanded: false
    };
  }

  render() {
    const { classes } = this.props;
    const { theme } = this.props;

    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
      const newstep = this.state.activeStep + 1;
      this.setState({ ...this.state, activeStep: newstep });
    };

    const handleBack = () => {
      const newstep = this.state.activeStep - 1;
      this.setState({ ...this.state, activeStep: newstep });
    };

    const handleStepChange = step => {
      this.setState({ ...this.state, activeStep: step });
    };

    return (
      <div className={classes.main}>
        <header class="header">
          <div class="header__logo-box">
            <img
              src="https://lh3.googleusercontent.com/proxy/B6u2MCiYc3X9ABciFm_JZuOm7qmQMoJc-cjiCPxpFy65bnXhwbwHDDuJFsC5USLkU0HStvcMP6UqgueddNGaH_RZbIoreGeF-G1cCcUD3mXGM9S12WH9ji4"
              alt="Logo"
              class="header__logo"
            />
          </div>

          <div class="header__text-box">
            <h1 class="heading-primary">
              <span class="heading-primary--main">Kleanary</span>
              <span class="heading-primary--sub">where life happens</span>
            </h1>

            <a href="#section-tours" class="btn btn--green btn--animated">
              Order Now
            </a>
          </div>
        </header>

        <main>
          <section class="section-about">
            <div class="u-center-text u-margin-bottom-big">
              <h2 class="heading-secondary">About Us</h2>
            </div>

            <div class="row">
              <div class="col-1-of-2">
                <h3 class="heading-tertiary u-margin-bottom-small">
                  You're going to fall in love with our Service
                </h3>
                <p class="paragraph">
                  We’re the first-ever on-demand laundry App in Nigeria. We take
                  care of your laundry and dry cleaning with a push of a button
                  from your phone or through our website. We strive to make
                  cleaning your clothes a seamless experience and we will cater
                  to your schedule, come straight to your door to pick up and
                  deliver your laundry at affordable prices. With exclusive
                  partnership with Shine Laundry, we guaranteed to provide the
                  most professional service that you can experience in Nigeria..
                </p>

                <h3 class="heading-tertiary u-margin-bottom-small">
                  Live adventures like you never have before
                </h3>
                <p class="paragraph">
                  We provide you with fast & efficient delivery regardless of
                  the laundry size. Your order will always be delivered on time!
                </p>

                <a href="#" class="btn-text">
                  Learn more &rarr;
                </a>
              </div>
              <div class="col-1-of-2">
                <div class="composition">
                  <img
                    srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w"
                    sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                    alt="Photo 1"
                    class="composition__photo composition__photo--p1"
                    src="img/nat-1-large.jpg"
                  />

                  <img
                    srcset="img/nat-2.jpg 300w, img/nat-2-large.jpg 1000w"
                    sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                    alt="Photo 2"
                    class="composition__photo composition__photo--p2"
                    src="img/nat-2-large.jpg"
                  />

                  <img
                    srcset="img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w"
                    sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                    alt="Photo 3"
                    class="composition__photo composition__photo--p3"
                    src="img/nat-3-large.jpg"
                  />
                </div>
              </div>
            </div>
          </section>

          <section class="section-features">
            <div class="u-center-text u-margin-bottom-big">
              <h2 class="heading-primary">How we Work</h2>
            </div>
            <Timeline align="alternate">
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="h6" component="h1"></Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      E-Laundry
                    </Typography>
                    <Typography>
                      {" "}
                      Request for laundry on our web or Mobile platform or call
                      our customer line.
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <DepartureBoardIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      We Pickup
                    </Typography>
                    <Typography>
                      {" "}
                      Tell us where you are and when you'd like us to come get
                      your laundry and we will be there! We promise to take good
                      care of your laundry!
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined">
                    <VpnLockIcon />
                  </TimelineDot>
                  <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      We Secure/Clean
                    </Typography>
                    <Typography>
                      Asuring a reliable and secure laundry service, We take
                      absolute care of your laundry and dry cleaning with love.
                      For that reason, your laundry is treated to the highest
                      quality service.
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary">
                    <RepeatIcon />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      We Deliver
                    </Typography>
                    <Typography>
                      Your laundry will certainly be delivered to you on time.
                      Our valets will be at your doorstep to hand over your
                      laundry cleaned and sparkling... with a SMILE!!
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </section>

          <section class="section-tours">
            <div class="u-center-text u-margin-bottom-big">
              <h2 class="heading-secondary">Download Kleanary App</h2>
            </div>
          </section>

          <section class="section-stories">
            <div class="bg-video">
              <video class="bg-video__content" autoplay muted loop>
                <source src="img/video.mp4" type="video/mp4" />
                <source src="img/video.webm" type="video/webm" />
                Your browser is not supported!
              </video>
            </div>

            <div class="u-center-text u-margin-bottom-big">
              <h2 class="heading-secondary">We make people genuinely happy</h2>
            </div>

            <div class="row">
              <div class="story">
                <figure class="story__shape">
                  <img
                    src="img/nat-8.jpg"
                    alt="Person on a tour"
                    class="story__img"
                  />
                  <figcaption class="story__caption">Mary Smith</figcaption>
                </figure>
                <div class="story__text">
                  <h3 class="heading-tertiary u-margin-bottom-small">
                    I had the best week ever with my family
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam, ipsum sapiente aspernatur libero repellat quis
                    consequatur ducimus quam nisi exercitationem omnis earum
                    qui. Aperiam, ipsum sapiente aspernatur libero repellat quis
                    consequatur ducimus quam nisi exercitationem omnis earum
                    qui.
                  </p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="story">
                <figure class="story__shape">
                  <img
                    src="img/nat-9.jpg"
                    alt="Person on a tour"
                    class="story__img"
                  />
                  <figcaption class="story__caption">Jack Wilson</figcaption>
                </figure>
                <div class="story__text">
                  <h3 class="heading-tertiary u-margin-bottom-small">
                    WOW! My life is completely different now
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam, ipsum sapiente aspernatur libero repellat quis
                    consequatur ducimus quam nisi exercitationem omnis earum
                    qui. Aperiam, ipsum sapiente aspernatur libero repellat quis
                    consequatur ducimus quam nisi exercitationem omnis earum
                    qui.
                  </p>
                </div>
              </div>
            </div>

            <div class="u-center-text u-margin-top-huge">
              <a href="#" class="btn-text">
                Read all stories &rarr;
              </a>
            </div>
          </section>

          <section class="section-book">
            <div class="row">
              <div class="book">
                <div class="book__form">
                  <form action="#" class="form">
                    <div class="u-margin-bottom-medium">
                      <h2 class="heading-secondary">Let's Get In Touch!</h2>
                    </div>

                    <div class="form__group">
                      <input
                        type="text"
                        class="form__input"
                        placeholder="Full name"
                        id="name"
                        required
                      />
                      <label for="name" class="form__label">
                        Full name
                      </label>
                    </div>

                    <div class="form__group">
                      <input
                        type="email"
                        class="form__input"
                        placeholder="Email address"
                        id="email"
                        required
                      />
                      <label for="email" class="form__label">
                        Email address
                      </label>
                    </div>

                    <div class="form__group u-margin-bottom-medium">
                      <div class="form__radio-group">
                        <input
                          type="checkbox"
                          class="form__radio-input"
                          id="small"
                          name="size"
                        />
                        <label for="small" class="form__radio-label">
                          <span class="form__radio-button"></span>
                          Send me News Update
                        </label>
                      </div>
                    </div>

                    <div class="form__group">
                      <button class="btn btn--green">Next step &rarr;</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer class="footer">
          <div class="footer__logo-box">
            <picture class="footer__logo">
              <source
                srcset="https://lh3.googleusercontent.com/proxy/B6u2MCiYc3X9ABciFm_JZuOm7qmQMoJc-cjiCPxpFy65bnXhwbwHDDuJFsC5USLkU0HStvcMP6UqgueddNGaH_RZbIoreGeF-G1cCcUD3mXGM9S12WH9ji4 1x, https://lh3.googleusercontent.com/proxy/B6u2MCiYc3X9ABciFm_JZuOm7qmQMoJc-cjiCPxpFy65bnXhwbwHDDuJFsC5USLkU0HStvcMP6UqgueddNGaH_RZbIoreGeF-G1cCcUD3mXGM9S12WH9ji4 2x"
                media="(max-width: 37.5em)"
              />
              <img
                srcset="https://lh3.googleusercontent.com/proxy/B6u2MCiYc3X9ABciFm_JZuOm7qmQMoJc-cjiCPxpFy65bnXhwbwHDDuJFsC5USLkU0HStvcMP6UqgueddNGaH_RZbIoreGeF-G1cCcUD3mXGM9S12WH9ji4 1x, https://lh3.googleusercontent.com/proxy/B6u2MCiYc3X9ABciFm_JZuOm7qmQMoJc-cjiCPxpFy65bnXhwbwHDDuJFsC5USLkU0HStvcMP6UqgueddNGaH_RZbIoreGeF-G1cCcUD3mXGM9S12WH9ji4 2x"
                alt="Full logo"
                src="https://lh3.googleusercontent.com/proxy/B6u2MCiYc3X9ABciFm_JZuOm7qmQMoJc-cjiCPxpFy65bnXhwbwHDDuJFsC5USLkU0HStvcMP6UqgueddNGaH_RZbIoreGeF-G1cCcUD3mXGM9S12WH9ji4"
              />
            </picture>
          </div>
          <div class="row">
            <div class="col-1-of-2">
              <div class="footer__navigation">
                <ul class="footer__list">
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Company
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Contact us
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Carrers
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Privacy policy
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-1-of-2">
              <p class="footer__copyright">
                Copyright &copy; Kleanary Laundry. We’re the first-ever
                on-demand laundry App in Nigeria. We take care of your laundry
                and dry cleaning with a push of a button from your phone or
                through our website. We strive to make cleaning your clothes a
                seamless experience and we will cater to your schedule, come
                straight to your door to pick up and deliver your laundry at
                affordable prices. With exclusive partnership with Shine
                Laundry, we guaranteed to provide the most professional service
                that you can experience in Nigeria.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
