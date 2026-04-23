# Serina

> Serina is being actively modernized and maintained again. Current stable usage remains `v1` while the modernization work for new version is in progress.

---

![GitHub Release](https://img.shields.io/github/release/h-dong/serina.svg)
![GitHub Issues Open](https://img.shields.io/github/issues-raw/h-dong/serina.svg)
![GitHub Last Commit](https://img.shields.io/github/last-commit/h-dong/serina.svg)
[![GitHub License](https://img.shields.io/github/license/h-dong/serina.svg)](./LICENSE)

[![Netlify Build Status](https://api.netlify.com/api/v1/badges/debe4f89-718a-43de-b3b7-0b791ae709fe/deploy-status)](https://app.netlify.com/sites/serina/deploys)

Natural Language Parser (NLP) for date and time in Javascript.

Serina Demo: [serina.netlify.com](https://serina.netlify.com)

## Introduction

Serina can parse English phrases and return an object that is easier to work. The name comes from the Xbox Game "Halo wars", where she was the Artificial Intelligence of the UNSC navy ship - Spirit of Fire.

## Why Serina

I started this project wanting to experiment with this idea of writing a NLP for data and time. This project was inspired by [Sherlock](!<https://github.com/neilgupta/Sherlock>) project at the time. After v1 was stable, I wasn't sure which direction to take this project further. For most people, [crono](https://github.com/wanasit/chrono) is a much better solution. The main advantages for Serina are the small bundle size over `crono` and first-class TS support compared to `Sherlock`, which arguably are weak reasons to pick Serina over.

With the upcoming [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) release, maybe there are more reasons to move this project forward. The current goal is to build a TypeScript first, Temporal API native, and extensible parser-based NLP library. Which just happens to do Date and Time parsing.

## Modernisation Roadmap

Updated on 2026/04/23.

Serina has gone through a long inactive period, so this roadmap focuses first on reliability and maintainability before adding major new capabilities.

### Goals

- Refresh and update dev depencencies and configs to prepare for the upcoming changes.
- Reposition library to take advantage of the upcoming [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal).
- Regex-only path is a dead-end, will be shifting to parser-based approach.
- Make the parser extensible so users can add custom grammar safely.

### Phase 1: Tooling Modernisation

Before adding new features, ensure the current codebase runs cleanly in a modern environment.

- [x] Modernize tooling by migrating build pipeline to `tsup` and move to ESM-only bundle output.
- [ ] Bump dev-dependencies to the latest versions.
- [x] Move to OXC for linting and formatting.

### Phase 2: Core Modernisation

This phase is focused on technical debt reduction, not feature expansion.

- [ ] Abandon current v2 rewrite, and start from scratch.
- [ ] Remove DayLite logic and move to Temporal APIs to handle dates. This will provide timezone support out of the box.
- [ ] Move from monolithic regex parsing toward a custom parser combinator architecture like `Parsimmon` (which is unmaintained now) for modularity and testability.
- [ ] Bump library version to v2.0.0

### Phase 3: Extensibility and Registry

Differentiate Serina by making parser customization a first-class feature.

- [ ] Define a stable TypeScript parser interface for built-in and user-provided parsers.
- [ ] Build a `SerinaEngine` registry model so users can register parser plugins (e.g. `engine.registerParser(myCustomParser)`).
- [ ] Export and document parser primitives (`digit`, `word`, `whitespace`, etc.) to simplify custom parser development.

## Installation

Simply run `npm install serina`

### Basic browser setup

Serina is now distributed as ESM. Import it from your bundler entry, or directly in a module script.

```html
<script type="module">
  import serina from 'https://unpkg.com/serina/dist/serina.module.js';
  const parsed = serina('Remind me to buy milk tomorrow 3pm');
</script>
```

### Node

Install via NPM:

```bash
npm i --save serina
```

```js
import serina from 'serina';

const parsed = serina('Remind me to buy milk tomorrow 3pm');
```

`require('serina')` is not supported in this ESM-only output.

## Usage of Library

```ts
const parsed = serina('Remind me to buy milk tomorrow 3pm'); // assuming it is currently 29th Oct 2017

// assuming current time is 2019/09/10 1pm
console.log(parsed);
```

```json
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
