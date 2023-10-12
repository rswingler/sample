import { MockedProvider } from "@apollo/client/testing";
import { getByTestId, render } from "@testing-library/react";
import React from "react";
import LineChart from "~/layout/components/charts/line-chart/LineChart";
import {
  MOCK_DREAMSPACE,
  MOCK_TOP_PUBLIC_PAGE,
} from "~/layout/test/apollo-mocks/constants";
import { CARTESIAN_CHART_MOCK } from "~/layout/test/chart-mocks/chart-mocks";
import ConversationContextMock from "~/layout/test/context-mocks/ConversationContextMock";
import { AxisScale, ChartType } from "../../../../../types";
import { buildChartLayerClipId, composeTooltipLabel } from "../ChartUtils";
import { initVerticalChartCommon } from "../vertical-cartesian-chart/VerticalCartesianChart";

jest.mock("use-resize-observer", () => {
  return () => ({ width: 800, height: 500 });
});

jest.mock("react-router", () => ({
  // @ts-ignore
  ...jest.requireActual("react-router"),
  useParams: () => ({
    dreamspaceId: MOCK_DREAMSPACE.id,
    pageId: MOCK_TOP_PUBLIC_PAGE.id,
  }),
}));

const wrapper = (props: { children: React.ReactNode }): JSX.Element => (
  <MockedProvider>
    <ConversationContextMock>{props.children}</ConversationContextMock>
  </MockedProvider>
);

describe("LineChart", () => {
  it("Should render the domain value without field name", () => {
    const svg = React.createRef<SVGSVGElement>();
    const containerHeight = 300;
    const containerWidth = 300;
    const dataMinValue = -20;
    const dataMaxValue = 20;
    const domainLabels = ["a", "b", "c"];
    const lines = [];
    const chartProps = {
      exploreBlockId: "abc",
      chartType: ChartType.BarGroupedVertical,
      lines,
      minValue: dataMinValue,
      maxValue: dataMaxValue,
      domainLabels,
      domainAxisScale: AxisScale.Linear,
      leftRangeAxisScale: AxisScale.Linear,
      rightRangeAxisScale: AxisScale.Linear,
      formatMap: {},
    };
    const common = initVerticalChartCommon(
      chartProps,
      svg,
      containerWidth,
      containerHeight
    );
    expect(composeTooltipLabel(common, 0)).toEqual(
      '<div class="chart-tooltip-date">a</div>'
    );
  });
  it("Should render with custom props", () => {
    const renderResult = render(<LineChart {...CARTESIAN_CHART_MOCK} />, {
      wrapper,
    });

    const element: HTMLAnchorElement = getByTestId(
      renderResult.container,
      "vertical-cartesian-chart"
    );

    expect(element).toBeTruthy();
    expect(element.children.length).toBe(1);
    expect(element.innerHTML).toContain("svg");
  });

  it("Should render with the left-axis line layer", () => {
    const renderResult = render(<LineChart {...CARTESIAN_CHART_MOCK} />, {
      wrapper,
    });

    const chartContainer = getByTestId(
      renderResult.container,
      "vertical-cartesian-chart"
    );

    // Detect the left axis line layer
    const lineLayerLeft = chartContainer
      .querySelector("svg")
      .querySelector(".rootGroup")
      .querySelector(".lineLayer-LEFT");
    expect(lineLayerLeft).toBeInTheDocument();
  });

  it("Should render with line (svg path)", () => {
    const renderResult = render(<LineChart {...CARTESIAN_CHART_MOCK} />, {
      wrapper,
    });
    const chartContainer = getByTestId(
      renderResult.container,
      "vertical-cartesian-chart"
    );

    // Detect the rendered line (svg path)
    const linePath = chartContainer
      .querySelector("svg")
      .querySelector(".rootGroup")
      .querySelector(".lineLayer-LEFT")
      .querySelector("path");
    expect(linePath).toBeInTheDocument();

    // Verify svg path properties
    // @ts-ignore
    expect(linePath.__data__.fieldId).toBe(
      CARTESIAN_CHART_MOCK.lines[0].fieldId
    );
    // @ts-ignore
    expect(linePath.__data__.label).toBe(CARTESIAN_CHART_MOCK.lines[0].label);
    // @ts-ignore
    expect(linePath.__data__.axisPosition).toBe(
      CARTESIAN_CHART_MOCK.lines[0].axisPosition
    );

    // Verify rendered svg path data (broken into contain checks for OS/environment pixel variance)
    const pathData = linePath.getAttribute("d");
    expect(pathData).toContain("M177.");
    expect(pathData).toContain("365.5L");
    expect(pathData).toContain("326");
  });

  it("Should render with chart layer cropping to prevent out-of-bounds rendering", () => {
    const renderResult = render(<LineChart {...CARTESIAN_CHART_MOCK} />, {
      wrapper,
    });

    const chartContainer = getByTestId(
      renderResult.container,
      "vertical-cartesian-chart"
    );

    // Detect the rendered bar (svg rect)
    const chartClip = chartContainer
      .querySelector("svg")
      .querySelector(".rootGroup")
      .querySelector(".lineLayer-LEFT")
      .querySelector(
        `#${buildChartLayerClipId(CARTESIAN_CHART_MOCK.exploreBlockId)}`
      );
    expect(chartClip).toBeInTheDocument();
  });
});
