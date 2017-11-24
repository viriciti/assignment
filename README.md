# ViriCiti Example App
This repository holds the ViriCiti Example App starter kit.

We've set up the full project for you with Webpack, Node.js, Express, Socket.io, React.js and Less. This should provide you with the tools to build a cool web app!

## Getting Started
To get started open up your terminal and clone this repository

`git clone https://git.viriciti.com/davebitter/viri-example-app.git`

Enter the directory

`cd viri-example-app`

Create your branch

<sup>Replace [YOURNAME] with your name</sup>

`git checkout -b feature/[YOURNAME]`

Install all the dependencies

`npm i`

Run the project

`npm start`

Finally, open up your browser at
<a href='http://localhost:1337'>http://localhost:1337</a>


## The Assignment
We have provided you with a starter kit that receives vehicle data over a socket connection in the front-end. This is all setup for you. The assignment is to use this live data stream to create a single page, data driven, real-time dashboard. We've provided you with a few parameters:


### The data

```JSON
{
  time: 1511512585495,
  energy: 85.14600000000002,
  gps: ["52.08940124511719","5.105764865875244"],
  odo: 5.381999999997788,
  speed: 12,
  soc: 88.00000000000007
}
```

* time - Unix timestamp of the moment the datapoint was recorder
* energy - Energy used in kWh
* gps - Latitude and longitude where the datapoint was recorded
* odo - The distance driven in km
* speed - The speed the vehicle was going in km/h
* soc - The state of charge (battery) of the vehicle in %

We would like to see how you can visualize this data for the user. What does the user want to see and how are you going to display this. Give the user real-time insights into his/her vehicle.

We highly encourage you to use your creativity in this assingment. We do however have some requirements it needs to meet.

### The requirements
Your app needs to at least
* provide the user with useful insights in data through data visualizations (e.g. D3.js)
* be modular (in React.js components)
* be coded re-usable and DRY (Don't Repeat Yourself)
* be fully responsive and mobile friendly
* use Less in a structured way for styles

#### Up for more?
Cool! You could extend the app's functionality by:
* Enrich dataset with diffrent data sources (e.g. weather API)
* Optimize page loading (perfomance)
* Global state management
* Service workers
* Progressive Web App
* Support from IE10

### The project structure
The project structure is pretty straight forward. Below you can find some of the things you might be looking for.

#### Node.js and Express server

This project runs on a node server with Express. You can find the server's entry file here:

`src/server/index.js`

#### React.js front-end

This project uses React.js in the front-end. You can find the mounting of the app here:

`src/client/main.js`

#### Less for styles

This project uses Less for styling. You can find the main Less file here:

`src/client/less/app.less`

## Read up material
Looking to level up your knowledge and skills? These are some good articles/courses that you can check out.

* [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/)
* [BEM](http://getbem.com/)
* [LearnYouReact](https://github.com/workshopper/learnyoureact)
* [LearnYouNode](https://github.com/workshopper/learnyounode)
* [GitIt](https://github.com/jlord/git-it-electron)
* [ExpressWorks](https://github.com/azat-co/expressworks)

## Questions
If you have any questions about he assignment or project setup feel free to contact me at <a href='mailto:d.bitter@viriciti.com'>d.bitter@viriciti.com</a> or come by the office. We're always ready to help.

Good luck with the assignment!
