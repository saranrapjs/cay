import * as fs from 'fs';
import _ from 'lodash';
import {sync as globSync} from 'glob';
import {sync as mkdirpSync} from 'mkdirp';

const DEFAULT_MESSAGES_PATTERN = './build/messages/**/*.json';
const LANG_DIR = './build/lang/';

// A file that contains all the addLocaleData calls
//require('../../src/supportedLocales.js');

// Collect default messages from components
let defaultMessages = globSync(DEFAULT_MESSAGES_PATTERN)
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
        descriptors.forEach(({id, defaultMessage}) => {
            if (collection.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }

            collection[id] = defaultMessage;
        });

        return collection;
    }, {});

// Collect existing messages (if any)
/*let existingMessages = globSync(LANG_DIR + '*.json')
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
        descriptors.forEach(({id, existingMessage}) => {
            collection[id] = existingMessage;
        });

        return collection;
    }, {});*/


// Property shorthand, see: https://lodash.com/docs
//_.intersectionBy(defaultMessages, existingMessages, 'id');

mkdirpSync(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'en-US.json', JSON.stringify(defaultMessages, null, 2));
fs.writeFileSync(LANG_DIR + 'es-AR.json', JSON.stringify(defaultMessages, null, 2));
