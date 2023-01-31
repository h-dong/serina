import RELATIVE_DATES from './relativeDates.constants';

describe('RELATIVE_DATES', () => {
    describe('RELATIVE_ADVERB', () => {
        describe('TODAY', () => {
            it('should match "today"', () => {
                const regex = new RegExp(RELATIVE_DATES.RELATIVE_ADVERB.TODAY, 'ig');
                expect('today').toMatch(regex);
            });
        });

        describe('TOMORROW', () => {
            it('should match "tomorrow"', () => {
                const regex = new RegExp(RELATIVE_DATES.RELATIVE_ADVERB.TOMORROW, 'ig');
                expect('tomorrow').toMatch(regex);
            });
        });

        describe('ANY', () => {
            test.each([['today'], ['tomorrow']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.RELATIVE_ADVERB.ANY, 'ig');
                expect(input).toMatch(regex);
            });
        });
    });

    describe('RELATIVE_EXPRESSION', () => {
        const argumentAfterTestCases = [
            ['in 1 day'],
            ['after 1 day'],
            ['next 1 day'],
            ['following 1 day'],
            ['in a day'],
            ['after a day'],
            ['next day'],
            ['following day'],
            ['in a day'],
        ];
        const argumentFirstTestCases = [
            ['1 day from now'],
            ['1 day from today'],
            ['1 day later'],
            ['1 day after'],
            ['a day from now'],
            ['a day from today'],
            ['a day later'],
            ['a day after'],
        ];

        describe('ARGUMENT_AFTER', () => {
            test.each(argumentAfterTestCases)('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.RELATIVE_EXPRESSION.ARGUMENT_AFTER, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('ARGUMENT_FIRST', () => {
            test.each(argumentFirstTestCases)('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.RELATIVE_EXPRESSION.ARGUMENT_FIRST, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('ANY', () => {
            const combinedTestCases = [...argumentAfterTestCases, ...argumentFirstTestCases];
            test.each(combinedTestCases)('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.RELATIVE_EXPRESSION.ANY, 'ig');
                expect(input).toMatch(regex);
            });
        });
    });

    describe('FILLER_WORDS', () => {
        test.each([['in'], ['after'], ['next'], ['following']])('should match "%s"', input => {
            const regex = new RegExp(RELATIVE_DATES.FILLER_WORDS, 'ig');
            expect(input).toMatch(regex);
        });
    });

    describe('TIME_UNITS', () => {
        describe('DAYS', () => {
            test.each([['day'], ['days']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.TIME_UNITS.DAYS, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('WEEKS', () => {
            test.each([['week'], ['weeks']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.TIME_UNITS.WEEKS, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('MONTHS', () => {
            test.each([['month'], ['months']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.TIME_UNITS.MONTHS, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('YEARS', () => {
            test.each([['year'], ['years']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.TIME_UNITS.YEARS, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('ANY', () => {
            test.each([['day'], ['days'], ['week'], ['weeks'], ['month'], ['months'], ['year'], ['years']])(
                'should match "%s"',
                input => {
                    const regex = new RegExp(RELATIVE_DATES.TIME_UNITS.ANY, 'ig');
                    expect(input).toMatch(regex);
                }
            );
        });
    });

    describe('VERBAL_QUANTIFIERS', () => {
        describe('ONE', () => {
            test.each([['a']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.VERBAL_QUANTIFIERS.ONE, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('NEXT', () => {
            test.each([['next'], ['following']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.VERBAL_QUANTIFIERS.NEXT, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('ANY', () => {
            test.each([['a'], ['next'], ['following']])('should match "%s"', input => {
                const regex = new RegExp(RELATIVE_DATES.VERBAL_QUANTIFIERS.ANY, 'ig');
                expect(input).toMatch(regex);
            });
        });
    });

    describe('ANY', () => {
        test.each([['today'], ['after 1 day'], ['1 day from now']])('should match "%s"', input => {
            const regex = new RegExp(RELATIVE_DATES.ANY, 'ig');
            expect(input).toMatch(regex);
        });
    });

    describe('WITH_FILLER_WORDS', () => {
        test.each([['on following day'], ['on the following day'], ['by next day'], ['by the next day']])(
            'should match "%s"',
            input => {
                const regex = new RegExp(RELATIVE_DATES.WITH_FILLER_WORDS, 'ig');
                expect(input).toMatch(regex);
            }
        );
    });
});
