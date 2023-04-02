import { useEffect, useState } from "react";
import axios from "axios";
import { date } from "yup/lib/locale";
import Form from "react-bootstrap/Form";

function UsdTry({ ReactFC }) {
  const [rateList, setRateList] = useState([]);

  const now = new Date();
  const weekly = new Date(now);
  weekly.setDate(weekly.getDate() - 7);
  const monthly = new Date(now);
  monthly.setDate(monthly.getDate() - 30);
  const yearly = new Date(now);
  yearly.setDate(yearly.getDate() - 365);
  let [startDate, setStartDate] = useState(yearly);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  var dateNow = formatDate(now);
  var startDateStr = formatDate(startDate);

  const getRates = async () => {
    try {
      const res = await axios.get(
        `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDateStr}&end_date=${dateNow}&symbols=TRY&base=USD`,
        {
          headers: {
            apikey: "s7HybjrggD5DDnuDhrDcU6r1UyKH8dj7",
            "Content-Type": "application/json",
          },
        }
      );

      const { rates } = res.data;
      const ratesTemp = [];
      for (const [symbol, rate] of Object.entries(rates)) {
        ratesTemp.push({ symbol, rate });
      }
      setRateList(ratesTemp);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getRates();
  }, []);

  var dataTemp = [];
  const [time, setTime] = useState(7);

  var counter = 0;
  for (let i = rateList?.length - time; i < rateList.length; i++) {
    dataTemp[counter] = {
      label: rateList[i]?.symbol,
      value: rateList[i]?.rate.TRY,
    };
    counter++;
  }

  const dataSource = {
    chart: {
      theme: "fusion",
      caption: "USDT/TRY",
      xAxisName: "Date",
      yAxisName: "Value",
      lineThickness: "2",
      yAxisMaxValue: "18",
      yAxisMinValue: "17",
      exportEnabled: "1",
      exportFormats:
        "PNG=Export as High Quality Image|PDF=Export as Printable Document|XLS=Export Chart Data|CSV=Export Chart Data as csv",
    },
    data: dataTemp,
  };
  const chartConfigs = {
    type: "line", // The chart type

    width: "95%", // Width of the chart
    height: "300", // Width of the chart

    dataFormat: "json",

    dataSource: dataSource,
  };

  const handleSelect = (e) => {
    if (e.target.value === "week") {
      setTime(7);
    } else if (e.target.value === "month") {
      setTime(30);
    } else if (e.target.value === "year") {
      setTime(365);
    } else {
      setTime(7);
    }
  };

  /* if (document.querySelector("#time").value === "week") {
    setStartDate(weekly);
  } else if (document.getElementById("time").value === "month") {
    setStartDate(monthly);
  } else if (document.getElementById("time").value === "year") {
    setStartDate(yearly);
  } else {
    setStartDate(weekly);
  } */

  return (
    <>
      <div className="chart-box">
        <ReactFC {...chartConfigs} />
      </div>
      <div className="container">
        <Form>
          <select id="time" onChange={handleSelect}>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </Form>
      </div>
    </>
  );
}

export default UsdTry;
