import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom  } from '@visx/axis';
import {GradientOrangeRed } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';

// Initialize some variables
const axisColor = '#929292';
const axisBottomTickLabelProps = {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: axisColor,
};
const axisLeftTickLabelProps = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end' ,
    fill: axisColor,
};

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;

export default function AreaChart({
                                      data,
                                      gradientColor,
                                      width,
                                      yMax,
                                      margin,
                                      xScale,
                                      yScale,
                                      hideBottomAxis = false,
                                      hideLeftAxis = false,
                                      top,
                                      left,
                                      children,
                                  }) {
    if (width < 10) return null;
    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <GradientOrangeRed id={"gradient"}  />

            <AreaClosed
                data={data}
                x={d => xScale(getDate(d)) || 0}
                y={d => yScale(getStockValue(d)) || 0}
                yScale={yScale}
                strokeWidth={1}
                stroke="url(#gradient)"
                fill="url(#gradient)"
                curve={curveMonotoneX}
                />
                {!hideBottomAxis && (
                    <AxisBottom
                        top={yMax}
                        scale={xScale}
                        numTicks={width > 520 ? 10 : 5}
                        stroke={axisColor}
                        tickStroke={axisColor}
                        tickLabelProps={() => axisBottomTickLabelProps}
                    />
                )}
                {!hideLeftAxis && (
                    <AxisLeft
                        scale={yScale}
                        numTicks={5}
                        stroke={axisColor}
                        tickStroke={axisColor}
                        tickLabelProps={() => axisLeftTickLabelProps}
                    />
                )}
                {children}
        </Group>
);
}
