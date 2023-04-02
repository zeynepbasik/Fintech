import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

function CurrencyGraph({ ReactFC, rateList }) {
  var eurCur = rateList.find((currency) => currency.symbol === "EUR");
  var usdCur = rateList.find((currency) => currency.symbol === "USD");
  var gbpCur = rateList.find((currency) => currency.symbol === "GBP");
  var cadCur = rateList.find((currency) => currency.symbol === "CAD");

  const dataSource = {
    chart: {
      theme: "fusion",

      caption: "TRY Currency",

      yaxisname: "Rates",

      labeldisplay: "Rotate",

      slantlabels: "1",

      trendlinealpha: "10",

      trendvaluealpha: "100",
      exportEnabled: "1",
      exportFormats:
        "PNG=Export as High Quality Image|PDF=Export as Printable Document|XLS=Export Chart Data|CSV=Export Chart Data as csv",
    },

    data: [
      {
        label: "EUR",

        value: 1 / eurCur?.rate,
      },

      {
        label: "USD",

        value: 1 / usdCur?.rate,
      },

      {
        label: "GBP",

        value: 1 / gbpCur?.rate,
      },

      {
        label: "CAD",

        value: 1 / cadCur?.rate,
      },
    ],
  };
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "95%", // Width of the chart
    height: "300", // Width of the chart
    dataFormat: "json",

    dataSource: dataSource,
  };

  return (
    <>
      <div className="chart-box">
        <ReactFC {...chartConfigs} />
      </div>
      <div className="">
        <Form>
          <Form.Group>
            <Form.Check type="checkbox" label="Show TrendZone" />
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default CurrencyGraph;
