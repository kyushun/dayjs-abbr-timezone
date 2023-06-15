# dayjs-abbr-timezone

This package is a plugin for day.js that enhances the format function to correctly output abbreviated time zones. This is especially beneficial when the standard `z` format does not meet your requirements.

For instance, when the timezone is set to Asia/Tokyo, the `z` format would usually output GMT+9. However, with this plugin, you can use the `t` format to output JST correctly.

## Installation

```
npm install dayjs-abbr-timezone
```

## Usage

This plugin depends on the `utc` and `timezone` plugins of Day.js. Please ensure you've imported and extended them as follows:

```typescript
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import abbrTimezone from 'dayjs-abbr-timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(abbrTimezone);
```

Then you can use the format function with the `t` option:

```typescript
const date = dayjs('2023-01-01T12:00:00Z').tz('Asia/Tokyo');
console.log(date.format('YYYY-MM-DD HH:mm:ss t')); // 2023-01-01 21:00:00 JST
```

This will correctly display the abbreviated timezone rather than the standard GMT display.

## Issues and Contributions

If you encounter any issues or would like to contribute to the development of this plugin, please refer to [this day.js issue](https://github.com/iamkun/dayjs/issues/1154) or open an issue in this repository.
