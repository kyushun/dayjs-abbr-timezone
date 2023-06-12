import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// eslint-disable-next-line import/no-unresolved
import { abbrTimezone } from '.';

dayjs.extend(utc);

dayjs.extend(timezone);
dayjs.extend(abbrTimezone);

describe('abbrTimezone', () => {
  describe('When the format text does not contain the target pattern', () => {
    it('Outputs the original output unchanged', () => {
      expect(dayjs('2023-01-01T00:00:00+00:00').format('YYYY-MM-DD')).toBe(
        '2023-01-01',
      );
    });
  });

  describe('When a timezone is set', () => {
    it('Outputs appropriate timezone abbreviation', () => {
      expect(
        dayjs('2023-01-01T00:00:00+00:00').tz('Asia/Tokyo').format('tz'),
      ).toBe('JST');

      expect(
        dayjs('2023-01-01T00:00:00+00:00')
          .tz('America/Los_Angeles')
          .format('tz'),
      ).toBe('PST');
    });
  });

  describe('when format text is escaped', () => {
    it('Preserves text as is', () => {
      expect(
        dayjs('2023-01-01T00:00:00+00:00').tz('Asia/Tokyo').format('[tz]'),
      ).toBe('tz');
    });
  });
});
