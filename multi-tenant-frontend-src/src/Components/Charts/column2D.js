import Form from "react-bootstrap/Form";
import { useState } from "react";

const Column2D = ({ ReactFC, companyName }) => {
  // Preparing the chart data

  const [isTrendZone, setIsTrendZone] = useState("0");
  const dataSource = {
    chart: {
      theme: "fusion",

      caption: "Sydney Passenger Train Capacity",

      subcaption: "City bound routes",

      yaxisname: "Capacity",

      labeldisplay: "Rotate",

      slantlabels: "1",

      trendlinealpha: "10",

      trendvaluealpha: "100",
      palettecolors: "29c3be,f2726f",
      exportEnabled: "1",
      exportFormats:
        "PNG=Export as High Quality Image|PDF=Export as Printable Document|XLS=Export Chart Data|CSV=Export Chart Data as csv",
    },

    data: [
      {
        label: "Main Western",

        value: "48000",
      },

      {
        label: "Illawarra",

        value: "21000",
      },

      {
        label: "North Shore",

        value: "18000",
      },

      {
        label: "Eastern Suburbs",

        value: "18000",
      },

      {
        label: "Revesby / E Hills",

        value: "15000",
      },

      {
        label: "Bankstown",

        value: "12000",
      },
    ],
    trendlines: [
      {
        line: [
          {
            istrendzone: isTrendZone,

            startvalue: "15000",

            endvalue: "30000",

            color: "#212344",

            valueonright: "1",

            tooltext:
              "Comfortable accomodation{br}with the available train count",

            displayvalue:
              "Reasonable Capacity{br}to accomodate with {br}available trains",
          },
        ],
      },
    ],
  };

  // Create a JSON object to store the chart configurations

  const chartConfigs = {
    type: "column2d", // The chart type
    width: "95%", // Width of the chart
    height: "300", // Width of the chart
    dataFormat: "json",

    dataSource: dataSource,
  };

  const onChangeTrendZone = () => {
    if (isTrendZone === "1") {
      setIsTrendZone("0");
    } else {
      setIsTrendZone("1");
    }
  };

  return companyName === "TTnet" ? (
    <>
      <div className="chart-box">
        <ReactFC {...chartConfigs} />
      </div>
      <div className="">
        <Form>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Show TrendZone"
              onChange={onChangeTrendZone}
            />
          </Form.Group>
        </Form>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Column2D;
