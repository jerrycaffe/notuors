const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// ........ENV SETUP...........
dotenv.config({ path: './config.env' });

// .......... CONNECT DATABASE ..................
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection successful');
  });




// .......CONNECT TO SERVER ........
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
