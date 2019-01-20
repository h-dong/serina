# Serina

[![Build Status](https://travis-ci.org/h-dong/Serina.svg?branch=master)]()
[![GitHub Release](https://img.shields.io/github/release/h-dong/serina.svg)]()
[![GitHub Issues Open](https://img.shields.io/github/issues-raw/h-dong/serina.svg)]()
[![GitHub Last Commit](https://img.shields.io/github/last-commit/h-dong/serina.svg)]()
[![GitHub License](https://img.shields.io/github/license/h-dong/serina.svg)]()

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

- [x] ~~Parse weekdays e.g. 'tue', 'tuesday'~~
- [x] ~~Parse day e.g. '11th', '2nd'~~
- [ ] Parse month e.g. 'july', 'jan'
- [ ] Parse year e.g. '2018', '2k18'
- [ ] Parse relative days e.g. 'today', 'tomorrow', 'a week from now'
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

## Edge cases

People could express dates & time in many different ways, and sometimes there's no one clear logical choice. In these situations, I'll try to list them here so everyone's aware about these edge cases and what the expected outcome should be. If people have any suggestions for these decisions feel free to raise an issue about it where we can discuss it in more detail. I'm happy for any of these to be challenged!

### Resolve "Next 31st" when the current/next month doesn't have 31 days

Given the user is on 20th February, the logical month for "next" in this case should be February itself since 31st is greater than 20th. However, February only has 28 or 29 days depending on if it is currently a leap year. The current logic is to skip Feb and look for "next month which has 31 days". So in this case Shiva will resolve "next 31st" to be 31st March.

### Week day v.s. day of the week

Week day normally refers to Mon - Fri and excludes weekends, but for the sake of simplicity (and looking at other libs) I decided it is much easier to just refer to "day of the week" as "week day" in the code.
