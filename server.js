const express = require('express');
const mongoose = require('mongoose');
const router = require('./src/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.listen(3000, (error) => {
  if (error) {
    console.error(error);
    process.exit(0);
  }

  mongoose.connect('mongodb://127.0.0.1:27017/chat_app', (error) => {
    if (error) {
      console.log('Error when try to connect to DB');
      console.error(error);
    } else {
      console.log('DB connected!');
    }
  });

  console.log(`App is running on 3000 PORT`);
});
