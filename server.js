const express = require('express');
const session = require('express-session');
const exhpbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require('./controllers');
const paths = require("path");
require('dotenv').config();



const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    // this tells the sessions to use cookies

cookie: {},
resave: false,
saveUninitialized: true,
store: new SequelizeStore({
    db: sequelize,
}),
};

app.use(session(sess));

const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// add comments 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);


// add comments
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    });
});