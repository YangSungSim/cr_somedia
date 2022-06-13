import Agenda from "agenda";
import {JOB_NAME,JOB_INTERVAL} from "./env/jobNames";
import {ObjectId} from 'bson';
import {DB} from './db/db';
import {} from './crawling'

const crawling = require('./crawling')

const Agenda = require('agenda');
const mongoConnectionString = 'mongodb://localhost:27017/config';
const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobs'}});

agenda.define(JOB_NAME.FIRST, async job => {
    crawling
});


(async () => { // IIFE to give access to async/await
    await agenda.start();
    await agenda.every(JOB_INTERVAL.FIRST, JOB_NAME.FIRST);
})();