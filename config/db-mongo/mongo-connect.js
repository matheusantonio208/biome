/* eslint-disable no-console */
import mongoose from 'mongoose';

class MongoConnect {
  start() {
    mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.tkz0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    );

    mongoose.connection.on('error', () =>
      console.error('Mongo connection error:'),
    );
    mongoose.connection.once('open', () =>
      console.log('Mongo database connected!'),
    );
  }
}

export default new MongoConnect();
