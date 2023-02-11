const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//Simple log function that creates a log file for each day
const logEvent = async (event) => {
    let date = new Date();
    let logPath = path.join(__dirname, '..', 'logs', `${format(date, 'yyyy-MM-dd')}.log`);
    let log = `${format(new Date(), 'HH:mm:ss')}\t${event}`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) { //Check if logs folder exists, if not create it
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        const unixtime = Math.round(new Date().getTime() / 1000);
        await fsPromises.appendFile(logPath, `${date.getTime()}\t${log} \n`); //Append event to log file
    } catch (error) {
        console.log(error);
    }
}

const eventLogger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}`);
    next();
}

module.exports = { logEvent, eventLogger };
