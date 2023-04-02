import React, { useRef, useEffect, useState } from "react";

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Column2D from "./column2D";
import CurrencyGraph from "./graphs/CurrencyGraph";
import UsdTry from "./graphs/UsdTry";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import "./charts.scss";
import RGL, { WidthProvider, GridItem } from "react-grid-layout";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import { toast } from "react-toastify";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TbPin, TbPinnedOff } from "react-icons/tb";

/* import RiDeleteBinFill from "react-icons/ri"; */

const ReactGridLayout = WidthProvider(RGL);

ReactFC.fcRoot(FusionCharts, PowerCharts, Charts, FusionTheme);

function ChartsPage({ rateList }) {
  const firstdiv = useRef(null);

  const [layout, setLayout] = useState([]);
  const [pinned, setPinned] = useState([]);

  const onLayoutChange = (layout) => {
    setLayout(layout);
    console.log(layout);
  };
  const companyName = localStorage.getItem("CompanyName");
  const charts = [
    {
      index: 0,
      data: <UsdTry ReactFC={ReactFC} />,
    },
    {
      index: 1,
      data: <CurrencyGraph ReactFC={ReactFC} rateList={rateList} />,
    },
    {
      index: 2,
      data: <Column2D ReactFC={ReactFC} companyName={companyName} />,
    },
    {
      index: 3,
      data: <Column2D ReactFC={ReactFC} companyName={companyName} />,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("layout")) {
      setLayout(JSON.parse(localStorage.getItem("layout")));
    } else {
      setLayout([
        { i: "a", x: 0, y: 0, w: 1, h: 1 },
        { i: "b", x: 1, y: 0, w: 1, h: 1 },
        { i: "c", x: 0, y: 1, w: 1, h: 1 },
        { i: "d", x: 1, y: 1, w: 1, h: 1 },
      ]);
    }
    if (localStorage.getItem("pinned")) {
      setPinned(JSON.parse(localStorage.getItem("pinned")));
    }
  }, []);

  const saveLayout = () => {
    localStorage.setItem("layout", JSON.stringify(layout));
    toast.success("Grafik sıralamanız kaydedildi.");
  };
  const savePin = () => {
    localStorage.setItem("pinned", JSON.stringify(pinned));
    toast.success("Grafik pinleriniz kaydedildi.");
  };

  const pin = (component) => {
    const index = pinned.findIndex((pin) => {
      console.log(pin);
      console.log(component);
      return pin === component;
    });
    console.log(index);
    if (index + 1) {
      console.log("isu");
      setPinned(pinned.filter((item) => item !== component));
    } else {
      setPinned([...pinned, component]);
    }
  };

  return (
    <div className="chart-page">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <h3>Pinned Charts</h3>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="pinned-row">
            <span>
              <button className="save-button" onClick={savePin}>
                Save Pins
              </button>
            </span>

            <div className="pinned-charts">
              {pinned.map((pins) => (
                <div className="grid-div">
                  <button
                    className="pin-button"
                    onClick={() => pin(charts[pins].index)}
                  >
                    <TbPinnedOff />
                  </button>
                  {charts[pins].data}
                </div>
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="charts-row">
        <div className="header-save">
          <h3>Charts</h3>
          <button className="save-button" onClick={saveLayout}>
            Save Layout
          </button>
        </div>

        <ReactGridLayout
          layout={layout}
          rowHeight={400}
          preventCollision={false}
          cols={2}
          isBounded={true}
          isResizable={true}
          draggableHandle=".drag-handle"
          onLayoutChange={onLayoutChange}
        >
          <div key="a" className="grid-div">
            <button className="drag-handle">
              <OpenWithIcon />
            </button>
            <button className="pin-button" onClick={() => pin(0)}>
              <TbPin />
            </button>
            <UsdTry ReactFC={ReactFC} />
          </div>

          <div key="b" className="grid-div">
            <button className="drag-handle">
              <OpenWithIcon />
            </button>
            <button className="pin-button" onClick={() => pin(1)}>
              <TbPin />
            </button>
            <CurrencyGraph ReactFC={ReactFC} rateList={rateList} />
          </div>
          <div key="c" className="grid-div">
            <button className="drag-handle">
              <OpenWithIcon />
            </button>
            <button className="pin-button" onClick={() => pin(2)}>
              <TbPin />
            </button>
            <Column2D ReactFC={ReactFC} companyName={companyName} />
          </div>
          <div key="d" className="grid-div">
            <button className="drag-handle">
              <OpenWithIcon />
            </button>
            <button className="pin-button" onClick={() => pin(3)}>
              <TbPin />
            </button>
            <Column2D ReactFC={ReactFC} companyName={companyName} />
          </div>
        </ReactGridLayout>
      </div>
    </div>
  );
}

export default ChartsPage;
