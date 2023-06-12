import type { PluginFunc } from 'dayjs';
import timezones from 'timezones.json';
import type timezone from 'dayjs/plugin/timezone';

export const abbrTimezone: PluginFunc = (_, dayjsClass) => {
  const originalFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function (template?: string | undefined) {
    const result = template?.replace(/\[([^\]]+)]|tz/g, (match) => {
      switch (match) {
        case 'tz':
          const unabbrZoneName = this.offsetName('long');
          const timezone = timezones.find(
            (timezone) => timezone.value == unabbrZoneName,
          );

          return timezone?.abbr ?? match;
        default:
          return match;
      }
    });

    return originalFormat.bind(this)(result);
  };
};

export default abbrTimezone;
