import moment from "moment-timezone";
import { formatFieldValue } from "~/layout/app-main/blocks/explore-block-view/ExploreDataUtils";
import { FieldFormat, FieldType } from "../../../../../types";

// Various datetime strings all representing July 31, 2023 1:30 PM
const dateTimeExamples = [
  // ISO 8601 format
  "2023-07-31T13:30:00",

  // Coordinated Universal Time (UTC)
  "Mon, 31 Jul 2023 13:30:00 GMT",

  // Locale String (en-US)
  "7/31/2023, 1:30:00 PM",

  // ISO 8601 format without seconds
  "2023-07-31T13:30",

  // Date and time with
  "2023-07-31T13:30:00",

  // Date and time in "basic" ISO 8601 format
  "20230731T133000",

  // Date string with custom format: Year-Month-Day Hour:Minute
  "2023-07-31 13:30",

  // Unix Timestamp (number of seconds since 1970-01-01 00:00:00 UTC)
  "1690810200",

  // Date and time with milliseconds
  "2023-07-31T13:30:00.123",

  // ISO 8601 extended format without timezone
  "2023-07-31T13:30:00",

  // Date string with custom format: Year-Day-Month Hour:Minute:Second
  "2023-31-07 13:30:00",

  // Date and time with seconds
  "2023-07-31 13:30:00",

  // Date and time in ISO 8601 format without colon between hours and minutes
  "2023-07-31T13:30:00",

  // Unix Timestamp in milliseconds (number of milliseconds since 1970-01-01 00:00:00 UTC)
  "1690810200",

  // Short date and time format
  "7/31/23, 1:30 PM",

  // Date and time in "basic" ISO 8601 format without seconds
  "20230731T1330",

  // Month/Day/Year Hour:Minute (12-hour clock)
  "07/31/2023 1:30 PM",

  // Month Day, Year Hour:Minute (12-hour clock)
  "July 31, 2023 1:30 PM",

  // Month Day, Year Hour:Minute AM/PM format
  "July 31, 2023 1:30 PM",

  // Short format with time (Month/Day/Year Hour:Minute:Second)
  "07/31/2023, 1:30:00 PM",

  // Day of week, Month Day, Year Hour:Minute:Second
  "Monday, July 31, 2023 1:30:00 PM",

  // Month name, Day of Month, Year at Hour:Minute AM/PM Timezone
  "July 31, 2023 at 1:30 PM PDT",

  // Date and time with AM/PM and seconds
  "07/31/2023 1:30:00 PM",

  // Full date and time with day of week and timezone
  "Monday, July 31, 2023, 1:30:00 PM PDT",

  // Month/Day/Year Hour:Minute
  "07/31/2023 13:30",

  // Month Day, Year Hour:Minute
  "July 31, 2023 13:30",

  // Month Day, Year Hour:Minute (24-hour format)
  "July 31, 2023 13:30",

  // Short format (Month/Day/Year) with 24-hour time
  "07/31/2023, 13:30",

  // Short format with time (Month/Day/Year Hour:Minute:Second)
  "07/31/2023, 13:30:00",

  // Day of week, Month Day, Year Hour:Minute:Second
  "Monday, July 31, 2023 13:30:00",

  // Month name, Day of Month, Year at Hour:Minute Timezone
  "July 31, 2023 at 13:30 PDT",

  // Date and time with seconds
  "07/31/2023 13:30:00",

  // Full date and time with day of week and timezone
  "Monday, July 31, 2023, 13:30:00 PDT",

  //Redshift datetime
  "2023-07-31 13:30:00.0",
];

const timeExamples = [
  "13:30:00.0",
  "13:30:00.000",
  "13:30:00",
  "13:30",
  "1:30 PM",
];

describe("Explore Data Unified Formatting", () => {
  it("Should provision unified formatting: date -> DdMmm with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.DdMmm;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("5 Jan");
  });

  it("Should provision unified formatting: date -> DdMmm with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.DdMmm;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("15 Jun");
  });

  it("Should provision unified formatting: date -> DdMmm with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.DdMmm;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("25 Dec");
  });

  it("Should provision unified formatting: date -> DdMmmYyyy with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.DdMmmYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("5 Jan 2023");
  });

  it("Should provision unified formatting: date -> DdMmmYyyy with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.DdMmmYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("15 Jun 2023");
  });

  it("Should provision unified formatting: date -> DdMmmYyyy with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.DdMmmYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("25 Dec 2023");
  });

  it("Should provision unified formatting: date -> MmmDd with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmDd;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Jan 5");
  });

  it("Should provision unified formatting: date -> MmmDd with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmDd;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Jun 15");
  });

  it("Should provision unified formatting: date -> MmmDd with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmDd;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Dec 25");
  });

  it("Should provision unified formatting: date -> MmmDdYyyy with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmDdYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Jan 5 2023");
  });

  it("Should provision unified formatting: date -> MmmDdYyyy with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmDdYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Jun 15 2023");
  });

  it("Should provision unified formatting: date -> MmmDdYyyy with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmDdYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Dec 25 2023");
  });

  it("Should provision unified formatting: date -> MmmYyyy with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Jan 2023");
  });

  it("Should provision unified formatting: date -> MmmYyyy with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Jun 2023");
  });

  it("Should provision unified formatting: date -> MmmYyyy with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmmYyyy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("Dec 2023");
  });

  it("Should provision unified formatting: date -> MmDd with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmDd;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("01/05");
  });

  it("Should provision unified formatting: date -> MmDd with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmDd;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("06/15");
  });

  it("Should provision unified formatting: date -> MmDd with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmDd;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("12/25");
  });

  it("Should provision unified formatting: date -> MmDdYy with January date", () => {
    const value = "2023-01-05";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmDdYy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("01/05/23");
  });

  it("Should provision unified formatting: date -> MmDdYy with June date", () => {
    const value = "2023-06-15";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmDdYy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("06/15/23");
  });

  it("Should provision unified formatting: date -> MmDdYy with December date", () => {
    const value = "2023-12-25";
    const fieldType = FieldType.Date;
    const format = FieldFormat.MmDdYy;
    const precision = 0; // Not applicable for dates, but included as per request.
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("12/25/23");
  });

  it("Should provision unified formatting: decimal -> auto with multiple decimal places on zero value", () => {
    const value = "1234";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("1234.000");
  });

  it("Should provision unified formatting: decimal -> auto with no decimal", () => {
    const value = "1234";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 0;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("1234");
  });

  it("Should provision unified formatting: decimal -> auto with two decimal places", () => {
    const value = "1234.56";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("1234.56");
  });

  it("Should provision unified formatting: decimal -> auto with three decimal places", () => {
    const value = "1234.789";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("1234.789");
  });

  it("Should provision unified formatting: decimal -> auto with positive value", () => {
    const value = "1000.123";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("1000.12");
  });

  it("Should provision unified formatting: decimal -> auto with negative value", () => {
    const value = "-1000.123";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−1000.12");
  });

  it("Should provision unified formatting: decimal -> auto with zero value", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Auto;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("0.00");
  });

  it("Should provision unified formatting: decimal -> billions with positive value", () => {
    const value = "3000000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Billions;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("3.00B"); // Assuming billions format divides by 1e9 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> billions with negative value", () => {
    const value = "-3000000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Billions;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−3.00B"); // Assuming billions format divides by 1e9 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> billions with zero value", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Billions;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("0.00B"); // Assuming billions format divides by 1e9 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency with positive value", () => {
    const value = "1000.123";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Currency;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$1,000.12");
  });

  it("Should provision unified formatting: decimal -> currency with negative value", () => {
    const value = "-1000.123";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Currency;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−$1,000.12");
  });

  it("Should provision unified formatting: decimal -> currency with zero value", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Currency;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$0.00");
  });

  it("Should provision unified formatting: decimal -> currency billions with positive value, precision 1", () => {
    const value = "3000000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyBillions;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$3.0B"); // Assuming billions format divides by 1e9 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency billions with negative value, precision 2", () => {
    const value = "-3000000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyBillions;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−$3.00B"); // Assuming billions format divides by 1e9 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency billions with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyBillions;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$0.000B"); // Assuming billions format divides by 1e9 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency millions with positive value, precision 1", () => {
    const value = "3000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyMillions;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$3.0M"); // Assuming millions format divides by 1e6 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency millions with negative value, precision 2", () => {
    const value = "-3000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyMillions;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−$3.00M"); // Assuming millions format divides by 1e6 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency millions with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyMillions;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$0.000M"); // Assuming millions format divides by 1e6 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency thousands with positive value, precision 1", () => {
    const value = "3000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyThousands;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$3.0K"); // Assuming thousands format divides by 1e3 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency thousands with negative value, precision 2", () => {
    const value = "-3000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyThousands;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−$3.00K"); // Assuming thousands format divides by 1e3 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> currency thousands with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.CurrencyThousands;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("$0.000K"); // Assuming thousands format divides by 1e3 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> millions with positive value, precision 1", () => {
    const value = "3000000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Millions;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("3.0M"); // Assuming millions format divides by 1e6 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> millions with negative value, precision 2", () => {
    const value = "-3000000"; // using unary minus character to denote a negative value
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Millions;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−3.00M"); // Assuming millions format divides by 1e6 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> millions with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Millions;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("0.000M"); // Assuming millions format divides by 1e6 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> number with positive value, precision 1", () => {
    const value = "100";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Number;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("100.0"); // Assuming Number format adds precision.
  });

  it("Should provision unified formatting: decimal -> NaN should produce empty string", () => {
    const value = "bacon";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Number;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("");
  });

  it("Should provision unified formatting: decimal -> large number with commas and precision 1", () => {
    const value = "100000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Number;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("100,000.0"); // Assuming Number format adds precision.
  });

  it("Should provision unified formatting: decimal -> number with negative value, precision 2", () => {
    const value = "-100"; // using unary minus character to denote a negative value
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Number;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−100.00"); // Assuming Number format adds precision.
  });

  it("Should provision unified formatting: decimal -> number with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Number;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("0.000"); // Assuming Number format adds precision.
  });

  it("Should provision unified formatting: decimal -> percent with positive value, precision 1", () => {
    const value = "0.25";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Percent;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("25.0%"); // Assuming Percent format multiplies by 100 and adds precision.
  });

  it("Should provision unified formatting: decimal -> percent with negative value, precision 2", () => {
    const value = "-0.25"; // using unary minus character to denote a negative value
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Percent;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−25.00%"); // Assuming Percent format multiplies by 100 and adds precision.
  });

  it("Should provision unified formatting: decimal -> percent with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Percent;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("0.000%"); // Assuming Percent format multiplies by 100 and adds precision.
  });

  it("Should provision unified formatting: decimal -> thousands with positive value, precision 1", () => {
    const value = "3000";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Thousands;
    const precision = 1;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("3.0K"); // Assuming Thousands format divides by 1e3 and formats with precision.
  });

  it("Should provision unified formatting: decimal -> thousands with negative value, precision 2", () => {
    const value = "-3000"; // using unary minus character to denote a negative value
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Thousands;
    const precision = 2;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("−3.00K"); // Using unary minus in the expectation
  });

  it("Should provision unified formatting: decimal -> thousands with zero value, precision 3", () => {
    const value = "0";
    const fieldType = FieldType.Decimal;
    const format = FieldFormat.Thousands;
    const precision = 3;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("0.000K"); // Assuming Thousands format divides by 1e3 and formats with precision.
  });

  it("Should provision unified formatting: Time -> HhMm", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMm;
    const precision = 0;

    dateTimeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("01:30");
    });
  });

  it("Should provision unified formatting: Time -> HhMm_24", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMm_24;
    const precision = 0;

    dateTimeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("13:30");
    });
  });

  it("Should provision unified formatting: Time -> HhMmSs", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMmSs;
    const precision = 0;

    dateTimeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("01:30:00");
    });
  });

  it("Should provision unified formatting: Time -> HhMmSs_24", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMmSs_24;
    const precision = 0;

    dateTimeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("13:30:00");
    });
  });

  it("Should provision unified formatting: Datetime -> MmDdYyyyHhMmSs", () => {
    const fieldType = FieldType.Datetime;
    const format = FieldFormat.MmDdYyyyHhMmSs;
    const precision = 0;

    dateTimeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("07/31/2023 01:30:00");
    });
  });

  it("Should provision unified formatting: Datetime -> YyyyMmDdHhMmSs", () => {
    const fieldType = FieldType.Datetime;
    const format = FieldFormat.YyyyMmDdHhMmSs;
    const precision = 0;

    dateTimeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("2023-07-31 01:30:00");
    });
  });

  it("Should provision unified formatting: Time -> HhMm", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMm;
    const precision = 0;

    timeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("01:30");
    });
  });

  it("Should provision unified formatting: Time -> HhMm_24", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMm_24;
    const precision = 0;

    timeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("13:30");
    });
  });

  it("Should provision unified formatting: Time -> HhMmSs", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMmSs;
    const precision = 0;

    timeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("01:30:00");
    });
  });

  it("Should provision unified formatting: Time -> HhMmSs_24", () => {
    const fieldType = FieldType.Time;
    const format = FieldFormat.HhMmSs_24;
    const precision = 0;

    timeExamples.forEach((dateTimeValue) => {
      const formattedValue = formatFieldValue(
        dateTimeValue,
        fieldType,
        format,
        precision
      );
      expect(formattedValue).toBe("13:30:00");
    });
  });

  it("Should provide original value on datetime parse failure", () => {
    const value = "bacon";
    const fieldType = FieldType.Datetime;
    const format = FieldFormat.YyyyMmDdHhMmSs;
    const precision = 0;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe(value); // Assuming Thousands format divides by 1e3 and formats with precision.
  });

  it("Should provide empty string on empty string input", () => {
    const value = "";
    const fieldType = FieldType.Datetime;
    const format = FieldFormat.YyyyMmDdHhMmSs;
    const precision = 0;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe(""); // Assuming Thousands format divides by 1e3 and formats with precision.
  });

  it("Should provide empty string on null input", () => {
    const value = null;
    const fieldType = FieldType.Datetime;
    const format = FieldFormat.YyyyMmDdHhMmSs;
    const precision = 0;
    const formattedValue = formatFieldValue(
      value,
      fieldType,
      format,
      precision
    );
    expect(formattedValue).toBe("");
  });

  it("Should predictably parse arbitrary datetime while user is located in any timezone", () => {
    const fieldType = FieldType.Datetime;
    const format = FieldFormat.YyyyMmDdHhMmSs;
    const precision = 0;

    const allTimeZones = moment.tz.names();
    allTimeZones.forEach((timeZone) => {
      moment.tz.setDefault(timeZone);
      dateTimeExamples.forEach((dateTimeValue) => {
        const formattedValue = formatFieldValue(
          dateTimeValue,
          fieldType,
          format,
          precision
        );
        expect(formattedValue).toBe("2023-07-31 01:30:00");
      });
    });
    moment.tz.setDefault(); // Timezone reset
  });
});
