import * as d3 from "d3";
import { Line } from "d3";
import { ScaleContinuousNumeric } from "d3-scale";
import React from "react";
import { ENV_UP_TO_QA, getCurrentEnv } from "~/layout/AppConfiguration";
import {
  AnimationConstants,
  buildChartLayerClipIdUrl,
  buildD3LineGenerator,
  ChartCommon,
  DataLabelCoordinate,
  draw,
  drawClippedChartLayer,
  hasLabelOverlap,
  LineData,
  oneOffDummyData,
  Point,
} from "~/layout/components/charts/ChartUtils";
import VerticalCartesianChart, {
  CartesianChartProps,
} from "~/layout/components/charts/vertical-cartesian-chart/VerticalCartesianChart";
import { ChartAxis } from "../../../../../types";
import "../Chart.css";

/**
 * Daydream line chart
 * @par,
  Transitionsam {CartesianChartProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const LINE_STROKE_WIDTH = 3;
export default React.memo((props: CartesianChartProps): JSX.Element => {
  return (
    <VerticalCartesianChart
      exploreBlockId={props.exploreBlockId}
      chartType={props.chartType}
      lines={props.lines}
      minValue={props.minValue}
      maxValue={props.maxValue}
      domainAxisName={props.domainAxisName}
      leftRangeAxisName={props.leftRangeAxisName}
      rightRangeAxisName={props.rightRangeAxisName}
      domainLabels={props.domainLabels}
      domainAxisScale={props.domainAxisScale}
      leftRangeAxisScale={props.leftRangeAxisScale}
      rightRangeAxisScale={props.rightRangeAxisScale}
      userLeftMin={props.userLeftMin}
      userLeftMax={props.userLeftMax}
      userRightMin={props.userRightMin}
      userRightMax={props.userRightMax}
      userBottomMin={props.userBottomMin}
      userBottomMax={props.userBottomMax}
      drawChart={drawLines}
      drawDataLabels={drawLineDataLabels}
      formatMap={props.formatMap}
    />
  );
});

export const drawLines = (
  common: ChartCommon
): d3.Selection<any, any, any, any> => {
  const leftAxisLines = common.lines.filter(
    (line: LineData) => line.axisPosition === ChartAxis.Left
  );
  const rightAxisLines = common.lines.filter(
    (line: LineData) => line.axisPosition === ChartAxis.Right
  );

  myDrawLines(common, leftAxisLines, common.scales.leftRange, ChartAxis.Left);
  return myDrawLines(
    common,
    rightAxisLines,
    common.scales.rightRange,
    ChartAxis.Right
  );
};

const myDrawLines = (
  common: ChartCommon,
  axisedLines: LineData[],
  axisRange: ScaleContinuousNumeric<any, any>,
  axisPosition: ChartAxis
): d3.Selection<any, any, any, any> => {
  /**
   * - D3 provides 2D SVG rendering, manipulation, and interaction within the dom
   * - https://d3js.org/
   * - D3 has its own state management, referred to as data binding
   * - Syntax is based on dot notation and call chains
   * - Upon first render or additional new data, the "enter" method is used to draw new elements
   * - Updates to existing elements are handled by the "update" method
   * - Elements are removed by the "exit" method (currently just using default behavior)
   * - Layers are drawn from the bottom up, like photoshop or the dom itself
   */

  // Draw chart layer
  const chartLayerClass = `lineLayer-${axisPosition}`;
  const chartLayer = drawClippedChartLayer(chartLayerClass, common);

  // Define a clipping path for the right-to-left curtain animation
  const clipId: string = `curtain-clip-${common.exploreBlockId}`;
  const clipClass = `curtainClip-${axisPosition}`;
  const curtainClip: d3.Selection<any, any, any, any> = draw(
    chartLayer,
    clipClass,
    oneOffDummyData,
    (enter) =>
      enter.append("clipPath").attr("class", clipClass).attr("id", clipId)
  );

  // Draw the animated right-to-left curtain using the clipping path
  const curtainClass = `curtain-rect-${axisPosition}`;
  draw(
    curtainClip,
    curtainClass,
    oneOffDummyData,
    (enter) =>
      enter
        .append("rect")
        .attr("class", curtainClass)
        .attr("width", 0)
        .attr("height", common.height)
        .transition()
        .delay(AnimationConstants.curtainDelay)
        .duration(AnimationConstants.curtainDuration)
        .ease(d3.easeLinear)
        .attr("width", common.width),
    (update) => update.attr("width", common.width).attr("height", common.height)
  );

  // Draw lines
  const d3LineGenerator: Line<any> = buildD3LineGenerator(
    common.scales.domain,
    axisRange
  );
  const getDashedLineConfig = (line: LineData) => (line.isDashed ? [5, 6] : 0);
  const getLineColor = (line: LineData) => line.color;

  const applyPropertiesForCypressAutomationTesting = function (line: LineData) {
    if (ENV_UP_TO_QA.includes(getCurrentEnv())) {
      // Only apply these properties in QA and below
      const svgPathElement = d3.select(this);
      svgPathElement.attr("data-line-label", line.label);
      for (let i = 0; i < line.points.length; i++) {
        const point = line.points[i];
        const formattedValue = common.fieldMap[point.fieldId].displayFormatter(
          point.value
        );
        svgPathElement.attr(
          `exp-block-${common.exploreBlockId}-data-point-${i}`,
          formattedValue
        ); // Apply datapoint values as multiple DOM properties eg data-point-0="123"
      }
    }
  };

  // New line rendering behavior and animation
  const lineClass = `chartline-${axisPosition}`;
  const onLineEnter = (enter) =>
    enter
      .append("path")
      .attr("class", lineClass)
      .attr("clip-path", `url(#${clipId})`) // Apply the animation clipping path on enter
      .each(applyPropertiesForCypressAutomationTesting)
      .attr("d", (line: LineData) => d3LineGenerator(line.points))
      .attr("fill", "none")
      .attr("stroke", getLineColor)
      .attr("stroke-width", LINE_STROKE_WIDTH)
      .attr("stroke-dasharray", getDashedLineConfig)
      .attr("opacity", 0)
      .transition()
      .duration(AnimationConstants.duration)
      .ease(AnimationConstants.easing)
      .attr("opacity", 1);

  // Existing line update rendering and animation
  const chartLayerClipIdUrl = buildChartLayerClipIdUrl(common.exploreBlockId);
  const onLineUpdate = (update) =>
    update
      .attr("clip-path", chartLayerClipIdUrl) // Apply the chart layer crop on update
      .each(applyPropertiesForCypressAutomationTesting)
      .transition()
      .delay(80)
      .duration(AnimationConstants.duration)
      .ease(d3.easePoly)
      .attr("opacity", 1)
      .attr("d", (line: LineData) => d3LineGenerator(line.points))
      .attr("stroke", getLineColor)
      .attr("stroke-width", LINE_STROKE_WIDTH)
      .attr("stroke-dasharray", getDashedLineConfig);

  // D3 data binding: join the line data to the dom svg paths
  // This way, we can update the data and the dom will be updated accordingly by the d3 engine
  chartLayer
    .selectAll(`.${lineClass}`)
    .data(axisedLines)
    .join(onLineEnter, onLineUpdate);

  const pointLayerClass = `pointLayer-${axisPosition}`;
  const pointLayer = draw(
    chartLayer,
    pointLayerClass,
    axisedLines,
    (enter) => enter.append("g").attr("class", pointLayerClass),
    (update) => update
  );

  // Draw orphaned points
  const pointClass: string = "point";
  const calcPointX = (_: Point, index: number) =>
    common.scales.domain(index.toString()) +
    common.scales.domain.bandwidth() / 2;
  const calcPointY = (point: Point) => axisRange(point.value);
  const onPointEnter = (enter) =>
    enter
      .append("circle")
      .attr("class", pointClass)
      .attr("clip-path", `url(#${clipId})`)
      .attr("cx", calcPointX)
      .attr("cy", calcPointY)
      .attr("r", 3)
      .attr("fill", (d) => d.color);

  const onPointUpdate = (update) =>
    update
      .transition()
      .delay(80)
      .duration(AnimationConstants.duration)
      .ease(d3.easePoly)
      .attr("cx", calcPointX)
      .attr("cy", calcPointY)
      .attr("fill", (d) => d.color);

  // Draw points
  pointLayer
    .selectAll(`.${pointClass}`)
    .data((line: LineData) =>
      line.points.filter((point: Point) => point.isOrphan)
    )
    .join(onPointEnter, onPointUpdate);

  return chartLayer;
};

/**
 * Draw data labels for line charts
 * @param {Selection<any, any, any, any>} layer
 * @param {ChartCommon} common
 * @param dataLabelHistory
 * @param axisRelativeLines
 * @param myRange
 */
export function drawLineDataLabels(
  layer: d3.Selection<any, any, any, any>,
  common: ChartCommon,
  dataLabelHistory: DataLabelCoordinate[]
): void {
  const leftAxisLines = common.lines.filter(
    (line) => line.axisPosition === ChartAxis.Left
  );
  const rightAxisLines = common.lines.filter(
    (line) => line.axisPosition === ChartAxis.Right
  );
  myDrawLineDataLabels(
    layer,
    common,
    dataLabelHistory,
    leftAxisLines,
    common.scales.leftRange,
    ChartAxis.Left
  );
  myDrawLineDataLabels(
    layer,
    common,
    dataLabelHistory,
    rightAxisLines,
    common.scales.rightRange,
    ChartAxis.Right
  );
}

export function myDrawLineDataLabels(
  chartLayer: d3.Selection<any, any, any, any>,
  common: ChartCommon,
  dataLabelHistory: DataLabelCoordinate[],
  axisRelativeLines: LineData[],
  myRange: ScaleContinuousNumeric<any, any>,
  axisPosition: ChartAxis
): void {
  const dataLabelLayerClass = `lineDataLabelLayer-${axisPosition}`;
  const dataLabelLayer = draw(
    chartLayer,
    dataLabelLayerClass,
    axisRelativeLines.filter((line) => line.displayLabels),
    (enter) => enter.append("g").attr("class", dataLabelLayerClass),
    (update) => update
  );
  const labelClass = `dataLabel`;
  const delayScalar =
    AnimationConstants.curtainDuration /
    common.labels.indexedDomainLabels.length;
  const labelDelay = (_, i): number =>
    i * delayScalar + AnimationConstants.curtainDelay;
  const calcPointX = (point: Point) =>
    common.scales.domain(point.label) + common.scales.domain.bandwidth() / 2;
  const calcPointY = (point: Point) =>
    point.value ? myRange(point.value) - 5 : 0;
  const getText = (point: Point) => {
    const formattedValue = point.value
      ? common.formatMap[point.lineLabel](point.value)
      : "";
    const displayLabels = common.fieldMap[point.fieldId].displayLabels;
    const allowLabelOverlap = common.fieldMap[point.fieldId].allowLabelOverlap;
    if (displayLabels && allowLabelOverlap) {
      return formattedValue;
    } else if (displayLabels && !allowLabelOverlap) {
      if (formattedValue !== "") {
        const labelCoord: DataLabelCoordinate = {
          x: calcPointX(point),
          y: calcPointY(point),
        };
        if (hasLabelOverlap(labelCoord, dataLabelHistory)) {
          return "";
        } else {
          dataLabelHistory.push(labelCoord);
          return formattedValue;
        }
      }
    }
    return "";
  };

  const onDataLabelEnter = (enter) =>
    enter
      .append("text")
      .text(getText)
      .attr("text-anchor", "middle")
      .attr("class", labelClass)
      .attr("x", calcPointX)
      .attr("y", (d: Point) => calcPointY(d) + 10)
      .attr("opacity", 0)
      .transition()
      .delay(labelDelay)
      .duration(1000)
      .ease(d3.easePolyOut)
      .attr("y", calcPointY)
      .attr("opacity", 1);

  const onDataLabelUpdate = (update) =>
    update
      .transition()
      .duration(AnimationConstants.duration)
      .ease(d3.easePoly)
      .delay(80)
      .text(getText)
      .attr("x", calcPointX)
      .attr("y", calcPointY)
      .attr("opacity", 1);

  dataLabelLayer
    .selectAll(`.${labelClass}`)
    .data((line: LineData) => line.points)
    .join(onDataLabelEnter, onDataLabelUpdate);
}
