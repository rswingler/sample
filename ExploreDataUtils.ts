import moment from "moment";
import { getDecimalValueFormatter } from "~/layout/components/charts/ChartUtils";
import { FieldFormat, FieldType } from "../../../../../types";

/**
 * Unified field formatting for explore data
 * @param {string} value
 * @param {FieldType} fieldType
 * @param {FieldFormat} format
 * @param {number} precision
 * @param dateFormat
 * @returns {string}
 */
export function formatFieldValue(
  value: string,
  fieldType: FieldType,
  format: FieldFormat,
  precision: number
): string {
  if ([null, undefined, ""].includes(value)) {
    return "";
  }
  switch (fieldType) {
    case FieldType.Decimal:
      const divisor = getDecimalFormatDivisor(format);
      const decimalValue = Number.parseFloat(value);
      return isNaN(decimalValue)
        ? ""
        : getDecimalValueFormatter(format, precision)(decimalValue / divisor);
    case FieldType.Date:
    case FieldType.Datetime:
    case FieldType.Time:
      return formatDateTimeValue(value, format);
    default:
      return value;
  }
}

const BE_DATE_FORMAT = "YYYY-MM-DD";

function parseUnknownDatetimeFormat(
  value: string,
  displayFormat: string
): string {
  const parseResult = moment.utc(value, momentDateTimeParseFormatsList, true);
  return parseResult.isValid() ? parseResult.format(displayFormat) : value;
}

/**
 * Datetime formatting for explore data
 * @param {string} value
 * @param {FieldFormat} format
 * @returns {string}
 */
function formatDateTimeValue(value: string, format: FieldFormat): string {
  switch (format) {
    case FieldFormat.DdMmm:
      return moment(value, BE_DATE_FORMAT).format("D MMM");
    case FieldFormat.DdMmmYyyy:
      return moment(value, BE_DATE_FORMAT).format("D MMM YYYY");
    case FieldFormat.MmmDd:
      return moment(value, BE_DATE_FORMAT).format("MMM D");
    case FieldFormat.MmmDdYyyy:
      return moment(value, BE_DATE_FORMAT).format("MMM D YYYY");
    case FieldFormat.MmmYyyy:
      return moment(value, BE_DATE_FORMAT).format("MMM YYYY");
    case FieldFormat.MmDd:
      return moment(value, BE_DATE_FORMAT).format("MM/DD");
    case FieldFormat.MmDdYy:
      return moment(value, BE_DATE_FORMAT).format("MM/DD/YY");
    case FieldFormat.YyyyMmDdHhMmSs:
      return parseUnknownDatetimeFormat(value, "YYYY-MM-DD hh:mm:ss");
    case FieldFormat.MmDdYyyyHhMmSs:
      return parseUnknownDatetimeFormat(value, "MM/DD/YYYY hh:mm:ss");
    case FieldFormat.HhMm:
      return parseUnknownDatetimeFormat(value, "hh:mm");
    case FieldFormat.HhMm_24:
      return parseUnknownDatetimeFormat(value, "HH:mm");
    case FieldFormat.HhMmSs:
      return parseUnknownDatetimeFormat(value, "hh:mm:ss");
    case FieldFormat.HhMmSs_24:
      return parseUnknownDatetimeFormat(value, "HH:mm:ss");
    default:
      return value;
  }
}

/**
 * Large number format divisors
 * @param {FieldFormat} format
 * @returns {number}
 */
function getDecimalFormatDivisor(format: FieldFormat): number {
  switch (format) {
    case FieldFormat.Thousands:
    case FieldFormat.CurrencyThousands:
      return 1000;
    case FieldFormat.Millions:
    case FieldFormat.CurrencyMillions:
      return 1000000;
    case FieldFormat.Billions:
    case FieldFormat.CurrencyBillions:
      return 1000000000;
    default:
      return 1;
  }
}

const momentDateTimeParseFormats = {
  timeWithTripleMicrosecond: "HH:mm:ss.SSS",
  timeWithSingleMicrosecond: "HH:mm:ss.S",
  timeWithSeconds: "HH:mm:ss",
  timeWithMinutes: "HH:mm",
  timeWithAmPm: "h:mm A",
  leadingDigitTimeWithAmPm: "hh:mm A",
  redshiftDatetime: "YYYY-MM-DD HH:mm:ss.S",
  dateTimeWithSpaceAndSeconds: "YYYY-MM-DD hh:mm:ss",
  dateTimeWithMilliseconds: "YYYY-MM-DDTHH:mm:ss.SSS",
  iso8601Format: "YYYY-MM-DDTHH:mm:ss",
  iso8601FormatWithoutSeconds: "YYYY-MM-DDTHH:mm",
  coordinatedUniversalTime: "ddd, DD MMM YYYY HH:mm:ss [GMT]",
  localeStringEnUs: "M/D/YYYY, h:mm:ss A",
  dateStringCustomFormat: "MM-DD-YYYYTHH:mm:ss",
  dateTimeWithTimeZoneOffset: "YYYY-MM-DDTHH:mm:ssZ",
  dateTimeWithDifferentTimezoneOffset: "YYYY-MM-DDTHH:mm:ssZ",
  iso8601ExtendedFormatWithoutTimezone: "YYYY-MM-DDTHH:mm:ss",
  dateStringCustomFormatYDMHMS: "YYYY-DD-MM HH:mm:ss",
  dateTimeWithSeconds: "YYYY-MM-DD HH:mm:ss",
  dateTimeIso8601WithoutColon: "YYYY-MM-DDTHH:mm:ssZZ",
  localeStringFrFr: "DD/MM/YYYY, HH:mm:ss",
  shortFormatWithTimeHMS: "MM/DD/YYYY, h:mm:ss A",
  fullDateWithDayOfWeek: "dddd, MMMM DD, YYYY h:mm:ss A",
  fullDateAndTimeWithDayOfWeekTimezone: "dddd, MMMM DD, YYYY, h:mm:ss A [PDT]",
  dateAndTimeAmPmWithSeconds: "MM/DD/YYYY h:mm:ss A",
  fullDateAndTimeWithDayOfWeekTimezone24: "dddd, MMMM DD, YYYY, HH:mm:ss [PDT]",
  shortFormatWithTime24HMS: "MM/DD/YYYY, HH:mm:ss",
  fullDateWithDayOfWeek24HMS: "dddd, MMMM DD, YYYY HH:mm:ss",
  dateAndTimeWithSeconds24: "MM/DD/YYYY HH:mm:ss",
  dateTimeBasicIso8601Format: "YYYYMMDDTHHmmss",
  dateStringCustomFormatYMDHM: "YYYY-MM-DD HH:mm",
  dateStringMDYHMAmPm: "MM-DD-YYYY h:mm A",
  dateStringMdyHmAmPm: "MM/DD/YYYY h:mm A",
  dateStringMDYHM: "MM-DD-YYYY HH:mm",
  dateStringMdyHm: "MM/DD/YYYY HH:mm",
  dateStringMDYHmMonthName: "MMMM DD, YYYY HH:mm",
  shortFormatWith24HourTime: "MM/DD/YYYY, HH:mm",
  fullDateWithTimezone24: "MMMM DD, YYYY [at] HH:mm [PDT]",
  dateStringMDYHmAmPmMonthName: "MMMM DD, YYYY h:mm A",
  shortDateAndTimeFormat: "M/D/YY, h:mm A",
  fullDateWithTimezone: "MMMM DD, YYYY [at] h:mm A [PDT]",
  dateTimeBasicIso8601FormatWithoutSeconds: "YYYYMMDDTHHmm",
  unixTimestamp: "X",
  unixTimestampInMilliseconds: "x",
  localeDateStringFrFr: "DD/MM/YYYY",
  dateStringCustomFormatDMY: "DD-MM-YYYY",
};

const momentDateTimeParseFormatsList = Object.values(
  momentDateTimeParseFormats
);
