const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true,
    limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024 * 1024,
    },
    
}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://db:27017/recordings", 
    {
        authSource: "admin",
        user: "admin",
        pass: "abc123",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Database connected!"))
.catch(err => console.log(err));;


app.get('/health', (req, res) => {
    res.send({
        status: 200,
        message: 'Success',
    });
});

const mainRoutes = require('./routes/recordings.routes');
app.use('/recordings', mainRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App listening to port: ${port}`);
});