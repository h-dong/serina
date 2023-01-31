# Serina

> Serina v2 is under active development (currently in alpha), so please continue to use v1.x.x until v2 becomes table.

---

![GitHub Release](https://img.shields.io/github/release/h-dong/serina.svg)
![GitHub Issues Open](https://img.shields.io/github/issues-raw/h-dong/serina.svg)
![GitHub Last Commit](https://img.shields.io/github/last-commit/h-dong/serina.svg)
[![GitHub License](https://img.shields.io/github/license/h-dong/serina.svg)](./LICENSE)

[![Netlify Build Status](https://api.netlify.com/api/v1/badges/debe4f89-718a-43de-b3b7-0b791ae709fe/deploy-status)](https://app.netlify.com/sites/serina/deploys)

Natural Language Parser (NLP) for date and time in Javascript.

Serina Demo: [serina.netlify.com](https://serina.netlify.com)

## Introduction

Serina can parse English phrases and return an object that is easier to work. This project is inspired by [Sherlock](!<https://github.com/neilgupta/Sherlock)> project. The name comes from the Xbox Game "Halo wars", where she was the Artificial Intelligence of the UNSC navy ship - Spirit of Fire.

## Installation

Simply run `npm install serina`

### Basic browser setup

Just include Serina in a script tag. You can access its various classes through the serina global.

```html
<script src="serina.umd.js"></script>
```

```js
var parsed = serina('Remind me to buy milk tomorrow 3pm');
```

### Node

Install via NPM:

```bash
npm i --save serina
```

```js
const serina = require('serina');

var parsed = serina('Remind me to buy milk tomorrow 3pm');
```

### ES6

```js
import serina from 'serina';

const parsed = serina('Remind me to buy milk tomorrow 3pm');
```

## Usage of Library

```js
var parsed = serina('Remind me to buy milk tomorrow 3pm'); // assuming it is currently 29th Oct 2017

// assuming current time is 2019/09/10 1pm
console.log(parsed);
```

```js
// console output
{
    "original": "Remind me to buy milk tomorrow 3pm",
    "isValid": true,
    "matches": [
        {
            "text": "Remind me to buy milk tomorrow",
            "dateTime": "2019-09-10T15:00:00.000Z",
            "matched": "3pm"
        },
        {
            "text": "Remind me to buy milk 3pm",
            "dateTime": "2019-09-11T00:00:00.000Z",
            "matched": "tomorrow"
        },
        {
            "text": "Remind me to buy milk",
            "dateTime": "2019-09-11T15:00:00.000Z",
            "matched": "tomorrow 3pm"
        }
    ]
}
```

## Publish

The recommended way is to publish using Github Actions, by

1. Changing version in package.json to x.y.z
2. Push a commit with message "Release x.y.z", this will then generate tag as well as publish to npm.

Here's an example:

> Now, when someone changes the version in package.json to 1.2.3 and pushes a commit with the message Release 1.2.3, the npm-publish action will create a new tag v1.2.3 and publish the package to the npm registry.

Or publish locally if all else fails.

```bash
npm run publish
```

## Progress

This project is currently developed by just me, so can't say when the library will be ready. But just to give a high level breakdown, here is everything I'm planning to include:

### Version 1 ✅

- [x] Parse weekdays e.g. `tue`, `tuesday`
- [x] Parse day e.g. `11th`, `2nd`
- [x] Parse month e.g. `july`, `jan`
- [x] Parse year e.g. `2018`, `9999`
- [x] Parse time e.g. `5pm`, `5:00am`, `15:00`
- [x] Parse combined day, month and year e.g. `11th June 2019`, `11/09/2018`
- [x] Parse incomplete date formats e.g. `20/08` or `Jan 2020`
- [x] Parse combined date and time e.g. `20/10/2019 8pm`, `11th 14:00`
- [x] Parse day of week with time e.g. `4pm Mon`, `Tuesday 5:30pm`
- [x] Parse relative time e.g. `in half an hour`, `4 hours from now`
- [x] Parse relative days e.g. `today`, `tomorrow`, `a week from now`
- [x] Parse relative dates e.g. `next year`, `2 weeks from now`
- [x] Parse combined relative date and time e.g. `a week from now 2pm`
- [x] Parse keywords such as `noon`, `midnight`, `mid day`

### Version 2

- [x] Rewrite Serina to stop using [Luxon](https://moment.github.io/luxon) as peer dependency
- [x] Improve Regex logic to make it easier to maintain
- [x] Review unit tests
- [x] Bug fixes

### Todo

- [ ] Parse seconds e.g. `15:30:22`
- [ ] Parse date range e.g. `tue - thu`, `4th july to 8th aug`
- [ ] Parse time range e.g. `between 5pm and 8pm`
- [ ] Parse international date formats better e.g. `2018/06/21`
- [ ] Parse more UK keywords e.g. `oxt`, `fortnight`
- [ ] Parse more advanced time e.g. `seconds`, `millisecond`
- [ ] Timezone support <https://github.com/h-dong/serina/issues/59>

## Why remove Luxon and reinvent the wheel?

There are two main considerations for removing [Luxon](https://moment.github.io/luxon):

- This project now has zero dependencies (exclude dev-dependencies of course).
- Took inspirations from [Day.js](https://day.js.org/) and implement a DayLite class to handle previous Luxon date operations. Now, with full control over the date-time logic, it's possible to move more complex date operations into the DayLite class. Hopefully this will translate to simpler Serina utility files and have them more focused on NLP.

The idea is to release DayLite as a separate library at some point, for now it is easier to keep it within this project.

## Edge cases / Limitations

People could express dates & time in many different ways, and sometimes there's no one clear logical choice. In these situations, I'll try to list them here so everyone's aware about these edge cases and what the expected outcome should be. If people have any suggestions for these decisions feel free to raise an issue about it where we can discuss it in more detail. I'm happy for any of these to be challenged!

### Resolve "Next 31st" when the current/next month doesn't have 31 days

Given current date is 20th February, the logical month for "next" in this case should be February itself since 31st is greater than 20th. However, February only has 28 or 29 days depending on if it is a leap year. The current logic is to skip Feb and look for "next month which has 31 days". So in this case Serina will resolve "next 31st" to be 31st March.

### Week day v.s. day of the week

Week day normally refers to Mon - Fri and excludes weekends, but for the sake of simplicity (and looking at other libs) I decided it is much easier to just refer to "day of the week" as "week day" in the code.

### Only match year 1000 - 9999

Currently the library only find matched YEAR between (1000 - 9999). This could be a limitation for some people, so we may need to come back and address this. Please raise an issue if this is an problem for you.

### Multiple identical matches in the same string

It was decided to always prioritize the first match in these situations e.g. "catch the 2:20pm bus at 2:20pm". This decision was made due to the primary function of the library being time and date conversion. By utilizing the first match, the resulting date object will always be consistent. Allowing for multiple matches would result in duplicate suggestions, potentially leading to a poor user experience.
