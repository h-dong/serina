# Serina
 [![Build Status](https://travis-ci.org/hdong92/Serina.svg?branch=master)](https://travis-ci.org/hdong92/Serina)

[![GitHub Release](https://img.shields.io/github/release/hdong92/serina.svg)]()

[![GitHub Issues Open](https://img.shields.io/github/issues-raw/hdong92/serina.svg)]()

[![GitHub Last Commit](https://img.shields.io/github/last-commit/hdong92/serina.svg)]()

[![GitHub License](https://img.shields.io/github/license/hdong92/serina.svg)]()

Natural Language Parser for date and time in Javascript.

## STILL UNDER DEVELOPMENT, NOT READY FOR ALPHA!

## Introduction
Serina can parse English phrases and return an object that is easier to work. This project is inspired by [Sherlock](!https://github.com/neilgupta/Sherlock) project. The name comes from the Xbox Game "Halo wars", where she was the Artificial Intelligence of the UNSC navy ship  - Spirit of Fire.

## Installation

Simply run `npm install serina`

## Usage

If using ES5

```
var Serina = require('serina');

var parsed = Serina('Remind me to buy milk tomorrow 3pm'); // assuming it is currently 29th Oct 2017

var original = parsed.original; // 'Remind me to buy milk tomorrow 3pm'
var text = parsed.text; // 'Remind me to buy milk'
var validDateTime = parsed.isValid; // True (Boolean type)
var date = parsed.date; // '30/10/2017'
var time = parsed.time; // '3:00pm'
var dateTime = parsed.dateObject; // Date object for '30/10/2017 3:00pm'
```

Or use import if using ES6

```
import Serina from 'serina';
```

## Progress

This project is currently developed by just me, so can't say when the library will be ready. But just to give a high level breakdown, here is everything I'm planning to include:

### Milestone 1

- [x] Parse weekdays e.g. 'tue', 'tuesday'
- [ ] Parse relative days e.g. 'today', 'tomorrow', 'a week from now'
- [ ] Parse day e.g. '11th', '2nd'
- [ ] Parse month e.g. 'july', 'jan'
- [ ] Parse year e.g. '2018', '2k18'
- [ ] Parse long and short dates e.g. '11th June', '11/09/2018'
- [ ] Parse relative dates e.g. 'next year', '2 weeks from now'
- [ ] Parse time e.g. '5pm',
- [ ] Parse relative time e.g. 'in half an hour', '4 hours from now'
- [ ] Parse date range e.g. 'tue - thu', '4th july to 8th aug'
- [ ] Parse time range e.g. 'beteen 5pm and 8pm'

### Milestone 2

- [ ] Parse filler words (clean up)
- [ ] Parse more UK keywords e.g. 'oxt', 'fortnight'
- [ ] Parse more advanced time e.g. 'seconds', 'millisecond'
- [ ] Parse international date formats e.g. '2018/06/21'









