import Slider from "react-slick";
import "./Market.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import Gplay from "../../assets/logogoogleplay.png";
import AppStore from "../../assets/appstore.png";
import MonikaImage from "../../assets/xgambarmonika.png";
import { TiArrowUnsorted } from "react-icons/ti";
import { ringkasanSaham } from "../dummy/ringkasanSaham";
import { introductionMonica } from "../dummy/IntroductionMonica";
import { indexGraph } from "../dummy/indexGraph";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { useEffect } from "react";
import { useRef } from "react";
import { Register } from "../../api/API";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import Charts from "../Charts";

function Market() {
  const settings = {
    infinite: false,
    className: "text-center w-100",
    slidesToShow: 5,
    swipeToSlide: true,
    nextArrow: <GrNext />,
    prevArrow: <GrPrevious />,
    lazyLoad: true,
  };
  const [data, setData] = useState({
    status: false,
    dataQuotes: [],
  });
  const [defaultData, setDefaultData] = useState({
    status: false,
    data: [],
  });
  const [indices, setIndices] = useState({
    status: false,
    data: [],
  });
  const [dataTable, setDataTable] = useState([]);
  const [Pagination, setPagination] = useState({
    button: 0,
    current: 1,
  });

  const onLoadScriptRef = useRef();
  let tvScriptLoadingPromise;

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("basic-area-chart-demo") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          container_id: "basic-area-chart-demo",
          width: "100%",
          height: "250px",
          autosize: false,
          symbol: "COMPOSITE  ",
          interval: "D",
          timezone: "exchange",
          theme: "light",
          style: "3",
          toolbar_bg: "#f1f3f6",
          hide_top_toolbar: true,
          save_image: false,
          locale: "en",
        });
      }
    }
  }, []);

  useEffect(() => {
    Register(async (val) => {
      window.sessionStorage.setItem("access_token", val.data.data.access_token);
      await axios
        .get("http://103.102.177.243:20222/api/v1/quotes", {
          params: { code: "*" },
          headers: {
            Authorization: `Bearer ${val.data.data.access_token}`,
          },
        })
        .then((val) => {
          setData({
            status: val.data.status,
            dataQuotes: val.data.quotes,
          });
          setDataTable(val.data.quotes);
          setPagination({
            ...Pagination,
            button: Math.ceil(val.data.quotes.length / 10),
          });

          const composite = val.data.quotes.filter((comp) =>
            comp.includes("COMPOSITE")
          );
          // console.log(composite, "jaja");
          setDefaultData({
            status: true,
            data: composite[0],
          });
        })
        .catch((err) => console.log(err));

      // await axios
      //   .get("http://103.102.177.243:20222/api/v1/quotes", {
      //     params: { code: "COMPOSITE" },
      //     headers: {
      //       Authorization: `Bearer ${val.data.data.access_token}`,
      //     },
      //   })
      //   .then((Composite) => {
      //     // setDefaultData({
      //     //   status: Composite.data.status,
      //     //   data: Composite.data.quotes,
      //     // });

      //     console.log(Composite.data.quotes);
      //   })
      //   .catch((err) => console.log(err));

      await axios
        .get("http://103.102.177.243:20222/api/v1/indices", {
          headers: {
            Authorization: `Bearer ${val.data.data.access_token}`,
          },
        })
        .then((indices) =>
          setIndices({
            status: indices.data.status,
            data: indices.data.indices,
          })
        )
        .catch((err) => console.log(err));
    });
  }, []);

  function PaginationTable(dataArray, indexes) {
    const end = indexes * 10;
    const start = end - 10;
    return dataArray.slice(start, end);
  }

  // console.log(Pagination, dataTable.length);

  return (
    <div className="container mt-5 pt-5 ">
      <h4 className="text-left text-title font-weight-bold">Index</h4>
      {/* /Slider Index Graph */}
      <div className="w-100">
        {data.status === false ? (
          <div className="w-full h-28 bg-gray-200 animate-pulse rounded-md"></div>
        ) : (
          <Slider {...settings}>
            {data.dataQuotes.map((val) => {
              return (
                <div
                  key={val[0]}
                  className="w-20  border-2 rounded-sm text-mini "
                >
                  <div className="w-full h-5 flex bg-white border-b-2 justify-around items-center">
                    <p className="font-bold">{val[1]}</p>
                    <p>{val[13]}</p>
                  </div>
                  <Charts
                    color={
                      val[20] < 0
                        ? "#ff1100"
                        : val[20] === 0
                        ? "#d5e000"
                        : "#5fe650"
                    }
                  />
                  <div className="flex w-full px-2 font-bold">
                    <p
                      className={`${
                        val[20] < 0
                          ? "text-red-600"
                          : val[20] === 0
                          ? "text-black"
                          : "text-green-500"
                      }`}
                    >
                      {val[20]} %
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
      {/* {[1, 2, 3, 4, 5, 6].map((val) => (
        <Charts />
      ))} */}

      {/* IHSG GRAFIK */}
      {defaultData.status === false ? (
        <div className="w-full h-28 bg-slate-200 animate-pulse mt-10"></div>
      ) : (
        <div className={` border rounded mt-3`}>
          <div className="w-100 p-3 ">
            <h4 className="text-left text-title font-weight-bold pl-3">IHSG</h4>
            <p className="text-left pl-3 sub-ihsg">
              Index Harga Saham Gabungan
            </p>
            <hr />
            <div className="text-left d-flex flex-row pl-3">
              <div className="w-60  text-xs flex justify-around">
                <span className="font-weight-bold">{defaultData.data[13]}</span>
                <span
                  className={` ${
                    defaultData.data[19] < 0
                      ? "text-red-600"
                      : defaultData.data[19] === 0
                      ? "text-black"
                      : "text-green-500"
                  } flex items-start ml-2`}
                >
                  {defaultData.data[19] < 0 ? (
                    <IoMdArrowDropdown />
                  ) : defaultData.data[19] === 0 ? null : (
                    <IoMdArrowDropup />
                  )}
                  {defaultData.data[19]} {"("}
                  {defaultData.data[20]}
                  {"%)"}
                </span>
              </div>
              <div className="detail val-ihsg">{defaultData.data[22]}</div>
              <div className="val-ihsg">{defaultData.data[18]}</div>
            </div>

            <div className="flex">
              <div className="w-60 sub-ihsg">monday 11:30 WIB</div>
              <div className="detail sub-ihsg w-10 ml-3">Value</div>
              <div className="sub-ihsg">Avg Value</div>
            </div>
          </div>
        </div>
      )}
      <div className="tradingview-widget-container ">
        <div id="basic-area-chart-demo" />
      </div>

      {/* Ringkasan Saham Table */}
      {indices.status === false ? (
        <div className="w-full h-96 bg-slate-300 animate-pulse"></div>
      ) : (
        <div className="rounded mt-32 ">
          <div className="d-flex justify-content-between m-3">
            <h4 className="text-left text-title font-weight-bold">
              Ringkasan Saham
            </h4>
            <select
              className="form-select border rounded "
              onChange={async (e) => {
                await axios
                  .get("http://103.102.177.243:20222/api/v1/constituents", {
                    params: { code: e.target.value },
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem(
                        "access_token"
                      )}`,
                    },
                  })
                  .then((val) => {
                    if (e.target.value === "*") {
                      setDataTable(data.dataQuotes);
                      setPagination({
                        current: 1,
                        button: Math.ceil(data.dataQuotes.length / 10),
                      });
                      // console.log(data.dataQuotes);
                    } else {
                      let filter = [];
                      data.dataQuotes.map((all) => {
                        val.data.constituents.map((val) => {
                          if (all[0] === val) {
                            // console.log(all);
                            filter.push(all);
                          }
                        });
                      });
                      setDataTable(filter);
                      setPagination({
                        current: 1,
                        button: Math.ceil(filter.length / 10),
                      });
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              {/* <option selected>Pilih Index</option> */}
              <option value={"*"} selected>
                All
              </option>
              {indices.data.map((val, index) => {
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="table-responsive">
            <table className="w-100 table  table-bordered ">
              <thead>
                <tr className="table-dark text-dark">
                  <th scope="col">
                    Code <TiArrowUnsorted />
                  </th>
                  <th scope="col">
                    Last <TiArrowUnsorted />
                  </th>
                  <th scope="col">
                    Change <TiArrowUnsorted />
                  </th>
                  <th scope="col">
                    % <TiArrowUnsorted />
                  </th>
                  <th scope="col">
                    Frequency <TiArrowUnsorted />
                  </th>
                  <th scope="col">
                    Volume <TiArrowUnsorted />
                  </th>
                  <th scope="col">
                    Value <TiArrowUnsorted />
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {ringkasanSaham.map((item, index) => (
                  <tr key={index}>
                    <td>{item.code}</td>
                    <td>{item.last}</td>
                    <td>{item.change}</td>
                    <td
                      className={
                        item.percen >= 0.5 ? "text-success" : "text-danger"
                      }
                    >
                      + {item.percen} %
                    </td>
                    <td>{item.frequency}</td>
                    <td>{item.volume}</td>
                    <td>{item.value} B</td>
                  </tr>
                ))} */}
                {PaginationTable(dataTable, Pagination.current).map(
                  (val, index) => {
                    return (
                      <tr key={index}>
                        <td>{val[0]}</td>
                        <td>
                          {new Intl.NumberFormat("en-DE").format(val[13])}
                        </td>
                        <td
                          className={`${
                            val[19] < 0
                              ? "text-red-600"
                              : val[19] === 0
                              ? "text-black"
                              : "text-green-600"
                          }`}
                        >
                          {val[19]}
                        </td>
                        <td
                          className={`${
                            val[20] < 0
                              ? "text-red-600"
                              : val[20] === 0
                              ? "text-black"
                              : "text-green-600"
                          }`}
                        >
                          {val[20]}%
                        </td>
                        <td>{val[23]}</td>
                        <td>{val[12]}</td>
                        <td>
                          {new Intl.NumberFormat("en-DE").format(val[22])}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div className="flex  justify-between text-medium">
            <p>on Page {Pagination.current}</p>

            <Slider
              initialSlide={1}
              slidesToScroll={5}
              infinite={false}
              className={"text-center w-48"}
              slidesToShow={5}
              swipeToSlide={true}
              nextArrow={<GrNext />}
              prevArrow={<GrPrevious />}
            >
              {[...Array(Pagination.button).keys()].map((val, index) => {
                return (
                  <p
                    onClick={() => {
                      setPagination({
                        ...Pagination,
                        current: val + 1,
                      });
                    }}
                    className={`${
                      Pagination.current === val + 1
                        ? "bg-green-400"
                        : "bg-white"
                    } rounded-lg cursor-pointer`}
                    key={val + 1}
                  >
                    {val + 1}
                  </p>
                );
              })}
            </Slider>
          </div>
        </div>
      )}

      {/* Title introduction Monica  */}
      <div className="title-display d-md-flex d-lg-flex justify-content-between mt-2 ">
        <h4 className="text-left text-title text-dark font-weight-bold">
          Mengenal Monica Lebih Dekat!
        </h4>
        <p className="text-left sub-title-intro">Pelajari Lebih Lanjut</p>
      </div>

      {/* Card Introduction Monica */}
      <div className="d-lg-flex d-md-flex  w-lg-100% justify-content-between">
        {introductionMonica.map((item, index) => (
          <div key={index} class="card m-2 pt-2">
            <img class="img-card" src={item.img} alt="Card image cap" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{item.title}</h5>
              <p class="card-text">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="footer d-lg-flex w-100 justify-content-lg-between mt-5 mb-5">
        <div className="footer-title w-lg-25% text-left">
          <p className="w-75">
            Download MONIKA dan Jadi Investor Cerdas Sekarang!
          </p>
          <img src={Gplay} className="mr-2"></img>
          <img src={AppStore} className="ml-2"></img>
        </div>
        <div className="w-lg-25%">
          <img src={MonikaImage}></img>
        </div>
      </div>
    </div>
  );
}

export default Market;
