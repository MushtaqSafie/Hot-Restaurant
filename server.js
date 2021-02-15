const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const mydata =[{
  customerName: 'myName',
  phoneNumber: 231321, 
  customerEmail: 'example@examp.com',
  customerID: '56Dsd',
}];

console.log(mydata);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));


app.post('/api/tables', (req, res) => {
  let newData = req.body;
  mydata.push(newData);
  console.log(mydata);
})


app.get('/api/tables', (req, res) => {
  let reservations = [];
  for (i = 0; i < 4; i++) {
    if (mydata[i]) {
      reservations.push( mydata[i]);
    }
  };
  res.json(reservations);
})

app.get('/api/waitlist', (req, res) => {
  let reservations = [];
  for (i = 4; i < mydata.length; i++) {
    if (mydata[i]) {
      reservations.push( mydata[i]);
    }
  };
  res.json(reservations);
})

app.listen(PORT, () => console.log(`APP  is running on PORT ${PORT}`));