const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const xmlbuilder = require('xmlbuilder');

/**
 * Logs a message of a given type in the terminal
 * @param {String} type
 * @param {String} msg
 * @return {Object}
 */
const logMessage = ({ type, msg, ignoreConsole }) => {
	const logTypes = {
		default: '\x1b[37m%s\x1b[0m',
		success: '\x1b[32m%s\x1b[0m',
		error: '\x1b[31m%s\x1b[0m',
	};
	const logColor = (!logTypes[type]) ? logTypes.default : logTypes[type];
	const logMsg = `jest-html-reporter >> ${msg}`;
	if (!ignoreConsole) {
		console.log(logColor, logMsg); // eslint-disable-line
	}
	return { logColor, logMsg }; // Return for testing purposes
};

/**
 * Creates a file at the given destination
 * @param  {String} filePath
 * @param  {Any} 	content
 */
const writeFile = ({ filePath, content }) => new Promise((resolve, reject) => {
	mkdirp(path.dirname(filePath), (err) => {
		if (err) {
			return reject(new Error(`Something went wrong when creating the file: ${err}`));
		}
		return resolve(fs.writeFile(filePath, content));
	});
});

/**
 * Sets up a basic HTML page to apply the content to
 * @return {xmlbuilder}
 */
const createHtmlBase = ({ pageTitle, stylesheet }) => xmlbuilder.create({
	html: {
		head: {
			meta: { '@charset': 'utf-8' },
			title: { '#text': pageTitle },
			style: { '@type': 'text/css', '#text': stylesheet },
		},
		body: {
			h1: { '@id': 'title', '#text': pageTitle },
		},
	},
});

module.exports = {
	logMessage,
	writeFile,
	createHtmlBase,
};
