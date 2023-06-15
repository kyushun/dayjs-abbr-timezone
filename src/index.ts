import type { Dayjs } from 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type timezoneDefinition from 'dayjs/plugin/timezone';
import timezones from 'timezones.json';

export const abbrTimezone = (_: unknown, dayjsClass: typeof Dayjs) => {
  const originalFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function (template?: string | undefined) {
    const result = template?.replace(/\[([^\]]+)]|tz/g, (match) => {
      switch (match) {
        case 'tz': {
          const unabbrZoneName = this.offsetName('long');
          const timezone = timezones.find((tz) => tz.value === unabbrZoneName);

          if (timezone) return `[${timezone.abbr}]`;

          return `[${this.offsetName() ?? match}]`;
        }
        default: {
          return match;
        }
      }
    });

    return originalFormat.bind(this)(result);
  };
};

export default abbrTimezone;
