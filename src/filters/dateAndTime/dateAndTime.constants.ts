import DATES from 'filters/dates/dates.constants';
import PARTIAL_DATES from 'filters/partialDates/partialDates.constants';
import RELATIVE_DATES from 'filters/relativeDates/relativeDates.constants';
import TIME from 'filters/time/time.constants';

const DATE_PART = `(${DATES.FILLER_WORDS})?(${[DATES.ANY, PARTIAL_DATES.ANY, RELATIVE_DATES.ANY].join('|')})`;
const TIME_PART = `(${TIME.FILLER_WORDS}( ))?${TIME.ANY}`;
const DATE_FIRST = [DATE_PART, TIME_PART].join(' ');
const TIME_FIRST = [TIME_PART, DATE_PART].join(' ');

const DATE_AND_TIME = {
    ANY: [DATE_FIRST, TIME_FIRST].join('|'),
};

export default DATE_AND_TIME;
