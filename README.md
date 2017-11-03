# Serina
Natural Language Parser for date and time in Javascript.

## STILL UNDER DEVELOPMENT, NOT YET READY!

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