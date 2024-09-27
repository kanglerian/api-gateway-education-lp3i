require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

/* Service Psikotest */
const psikotestUsersRouter = require('./routes/psikotest/users');
const psikotestTypesRouter = require('./routes/psikotest/types');
const psikotestQuestionsRouter = require('./routes/psikotest/questions');
const psikotestTestsRouter = require('./routes/psikotest/tests');
const psikotestHasilsRouter = require('./routes/psikotest/hasils');

/* Service Brain */
const brainHasilsRouter = require('./routes/brain/hasils');
const brainAnswersRouter = require('./routes/brain/answers');

/* Service Test Gaya Belajar */
const gayabelajarDetailsRouter = require('./routes/gayabelajar/details');
const gayabelajarQuestionsRouter = require('./routes/gayabelajar/questions');
const gayabelajarHasilsRouter = require('./routes/gayabelajar/hasils');
const gayabelajarTestsRouter = require('./routes/gayabelajar/tests');
const gayabelajarUsersRouter = require('./routes/gayabelajar/users');

const app = express();

const allowedOrigins = [
  'https://test-gaya-belajar.politekniklp3i-tasikmalaya.ac.id',
  'https://psikotest.politekniklp3i-tasikmalaya.ac.id',
  'https://test-otak.politekniklp3i-tasikmalaya.ac.id',
  'https://beasiswa.politekniklp3i-tasikmalaya.ac.id',
  'https://helpdesk.politekniklp3i-tasikmalaya.ac.id',
  'https://database.politekniklp3i-tasikmalaya.ac.id',
  'https://presence.politekniklp3i-tasikmalaya.ac.id',
  'https://siruang.politekniklp3i-tasikmalaya.ac.id',
  'https://sbpmb.politekniklp3i-tasikmalaya.ac.id',
  'https://ict.politekniklp3i-tasikmalaya.ac.id',
  'https://pmb.politekniklp3i-tasikmalaya.ac.id',
  'https://politekniklp3i-tasikmalaya.ac.id',
  'https://pmb.amisbudi.cloud',
  'http://127.0.0.1:8000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5500',
  'http://localhost:8000',
  'http://localhost:5173',
  'http://localhost:5500',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'gateway',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use('/', indexRouter);

/* Service Psikotest */
app.use('/kecerdasan/users', psikotestUsersRouter);
app.use('/kecerdasan/types', psikotestTypesRouter);
app.use('/kecerdasan/questions', psikotestQuestionsRouter);
app.use('/kecerdasan/tests', psikotestTestsRouter);
app.use('/kecerdasan/hasils', psikotestHasilsRouter);

/* Service Brain */
app.use('/brain/hasils', brainHasilsRouter);
app.use('/brain/answers', brainAnswersRouter);

/* Service Test Gaya Belajar */
app.use('/gayabelajar/details', gayabelajarDetailsRouter);
app.use('/gayabelajar/questions', gayabelajarQuestionsRouter);
app.use('/gayabelajar/hasils', gayabelajarHasilsRouter);
app.use('/gayabelajar/tests', gayabelajarTestsRouter);
app.use('/gayabelajar/users', gayabelajarUsersRouter);

module.exports = app;
