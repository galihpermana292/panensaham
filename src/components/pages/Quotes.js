import './OrderBook.css';

import { stockDown } from '../dummy/stockDown';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import HargaBidOffer from '../popup/HargaBidOffer';
import React, { useEffect, useRef } from 'react';
import StockPrice from '../shared/StockPrice';
import marketInfo from '../../api/MarketInfo';

function Quotes() {
	// data quotes
	const [dataLabel, setDataLabel] = useState([]);
	const [activeQuote, setActiveQuote] = useState({ satu: [] });
	const [stockData, setStockData] = useState({ satu: [] });

	// orderbook
	const [orderBook, setOrderBook] = useState({ satu: [] });
	const [sumBook, setSumBook] = useState({ satu: { bidSum: 0, offSum: 0 } });

	// tradebook
	const [tradeBook, setTradeBook] = useState({ satu: [] });

	// state for tab stock done and stock info
	const [toggleStock, setToggleStock] = useState('stockdone');
	const toggleStockTab = (index) => {
		setToggleStock(index);
	};
	const [showSetRuningTrade, setShowSetRuningTrade] = useState(false);
	const [showHargaBidOffer, setShowHargaBidOffer] = useState(false);
	// state for tab WatchList , OrderList and Portfolio
	const [toggleWop, setToggleWop] = useState('watchlist');
	const toggleWopTab = (index) => {
		setToggleWop(index);
	};

	// state for tab Openorders, ClosedHistory, OrderHistory, TradeList in order list
	const [toggleOrder, setToggleOrder] = useState('openOrders');
	const toggleOrderTab = (index) => {
		setToggleOrder(index);
	};

	// state for tab buy/sell and ammend/withdraw
	const [togglebuyOrder, setToggleBuyorder] = useState('buy/sell');
	const togglebuyTab = (index) => {
		setToggleBuyorder(index);
	};

	// state for tab Stock , cash and mutual fund in portfolio
	const [togglePortfolio, setTogglePortfolio] = useState('stockPortfolio');
	const togglePortfolioTab = (index) => {
		setTogglePortfolio(index);
	};

	// quotes fetching
	// getting label of the quot
	const getQuotes = async () => {
		const {
			data: { quotes },
		} = await marketInfo.getQuotes();

		const newData = quotes.map((data) => ({
			label: data[0],
			labelName: data[1],
		}));
		setDataLabel(newData);
	};

	//get select box
	const getSelectedQuotes = async (val = 'AALI', from) => {
		const activeLabel = dataLabel?.filter((data) => data.label === val);
		setActiveQuote((activeQuote) => ({
			...activeQuote,
			[from]: activeLabel[0].labelName,
		}));

		const {
			data: { quotes },
		} = await marketInfo.getQuotes(val);
		const {
			data: { orderbook },
		} = await marketInfo.getOrderBook(val);

		const {
			data: { tradebook },
		} = await marketInfo.getTradebook(val);

		let bidLotSum = 0;
		orderbook.forEach((data) => (bidLotSum += data[1]));

		let offLotSum = 0;
		orderbook.forEach((data) => (offLotSum += data[4]));

		setSumBook((sumBook) => ({
			...sumBook,
			[from]: { bidSum: bidLotSum, offSum: offLotSum },
		}));

		setOrderBook((orderBook) => ({ ...orderBook, [from]: orderbook }));
		setStockData((stockData) => ({ ...stockData, [from]: quotes }));
		setTradeBook((tradeBook) => ({ ...tradeBook, [from]: tradebook }));
	};

	useEffect(() => {
		getQuotes();
	}, []);

	// TradingViewWidget.js

	let tvScriptLoadingPromise;

	const onLoadScriptRef = useRef();

	useEffect(() => {
		onLoadScriptRef.current = createWidget;

		if (!tvScriptLoadingPromise) {
			tvScriptLoadingPromise = new Promise((resolve) => {
				const script = document.createElement('script');
				script.id = 'tradingview-widget-loading-script';
				script.src = 'https://s3.tradingview.com/tv.js';
				script.type = 'text/javascript';
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
				document.getElementById('tradingview_fc40e') &&
				'TradingView' in window
			) {
				new window.TradingView.widget({
					autosize: true,
					symbol: 'NASDAQ:AAPL',
					interval: 'D',
					timezone: 'Etc/UTC',
					theme: 'light',
					style: '1',
					locale: 'en',
					toolbar_bg: '#f1f3f6',
					enable_publishing: false,
					withdateranges: true,
					hide_side_toolbar: false,
					allow_symbol_change: true,
					container_id: 'tradingview_fc40e',
				});
			}
		}
	}, []);
	return (
		<div className="big mt-5 pt-5 ">
			<div className="up-container d-lg-flex">
				{/* Running Trade */}
				<div className=" rt-container-left">
					{['satu', 'dua', 'tiga'].map((item) => (
						<div key={item} className="mb-2">
							<StockPrice
								stockData={
									Object.keys(stockData).length === 0 ? [] : stockData[item]
								}
								orderBook={
									Object.keys(stockData).length === 0 ? [] : orderBook[item]
								}
								tradeBook={
									Object.keys(stockData).length === 0 ? [] : tradeBook[item]
								}
								sumBook={
									Object.keys(stockData).length === 0 ? {} : sumBook[item]
								}
								activeQuote={activeQuote[item]}
								toggleStockTab={toggleStockTab}
								getSelectedQuotes={getSelectedQuotes}
								dataLabel={dataLabel}
								toggleStock={toggleStock}
								stockDown={stockDown}
								showStockDone={false}
								from={item}
							/>
						</div>
					))}
				</div>

				<div className=" rt-container-left ">
					{['empat', 'lima', 'enam'].map((item) => (
						<div key={item} className="mb-2 ml-1 mr-3">
							<StockPrice
								stockData={
									Object.keys(stockData).length === 0 ? [] : stockData[item]
								}
								orderBook={
									Object.keys(stockData).length === 0 ? [] : orderBook[item]
								}
								tradeBook={
									Object.keys(stockData).length === 0 ? [] : tradeBook[item]
								}
								sumBook={
									Object.keys(stockData).length === 0 ? {} : sumBook[item]
								}
								activeQuote={activeQuote[item]}
								toggleStockTab={toggleStockTab}
								getSelectedQuotes={getSelectedQuotes}
								dataLabel={dataLabel}
								toggleStock={toggleStock}
								stockDown={stockDown}
								showStockDone={false}
								from={item}
							/>
						</div>
					))}
				</div>
				<div className=" rt-container-center ml-3">
					{/* <img src={traddingView} width={500}></img> */}

					<div className="tradingview-widget-container ">
						<div className="tradeview" id="tradingview_fc40e" />
					</div>

					<div className="d-flex border justify-content-between mt-2 ">
						<div
							className={
								togglebuyOrder === 'buy/sell'
									? 'buy_amend_title p-1 font-weight-bold text-warning bg-dark'
									: 'buy_amend_title p-1'
							}
							onClick={() => togglebuyTab('buy/sell')}>
							{' '}
							BUY / SELL ORDER
						</div>
						<div
							className={
								togglebuyOrder === 'ammend/withdraw'
									? 'buy_amend_title p-1 font-weight-bold text-warning bg-dark'
									: 'buy_amend_title p-1'
							}
							onClick={() => togglebuyTab('ammend/withdraw')}>
							{' '}
							AMEND / WITHDRAW ORDER
						</div>
						<div className="buy_amend_title p-1">
							{' '}
							ID# <input className="id-pin-input p-1" type="text"></input>
						</div>
						<div className="buy_amend_title p-1">
							{' '}
							PIN <input className="id-pin-input p-1" type="password"></input>
						</div>
					</div>
					{/* Buy /Seller */}
					<div
						style={{ background: '#F4F4F4' }}
						className={togglebuyOrder === 'buy/sell' ? '' : 'd-none'}>
						<div className="mt-2 p-3  ">
							<div className="d-lg-flex justify-content-around  ">
								<div className="subtitle-order">
									<div className="d-flex mb-1">
										<div className="width-subtitle">Market</div>
										<div>
											<select className="border rounded input-order">
												<option value="1">Regular</option>
												<option value="2">Right</option>
												<option value="3">Warrant</option>
												<option value="3">Mutual/Fund</option>
											</select>
										</div>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitle">Code</div>
											<div className="">
												<input
													type="text"
													placeholder="BBRI"
													className="input-order p-1"></input>
											</div>
										</div>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitle">Price</div>
											<div className="">
												<input
													type="text"
													placeholder="0"
													className="text-right input-order p-1"></input>
											</div>
										</div>
									</div>
								</div>
								<div className="subtitle-order">
									<div className="d-flex mb-1">
										<div className="width-subtitle">Auto</div>
										<div className="">
											<input
												type="text"
												placeholder="Last Price"
												className="input-order p-1"></input>
										</div>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitle">Qty Lot</div>
											<div className="">
												<input
													type="text"
													placeholder="0"
													className="text-right input-order p-1"></input>
											</div>
										</div>
									</div>
									<div>
										<div className="d-flex">
											<div className="width-subtitle ">Total</div>
											<div className="">
												<input
													type="text"
													placeholder="0"
													className="text-right input-order p-1"></input>
											</div>
										</div>
									</div>
								</div>
								<div className="subtitle-order">
									<div className="d-flex mb-1">
										<div className="border p-1  pl-3 pr-3 width-title">
											Type
										</div>
										<div>
											<select className="border p-1 select-tbh subtitle-order">
												<option value="1" className="">
													Day
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
									<div className="d-flex mb-1">
										<div className="border p-1  pl-3 pr-3 width-title">
											Board
										</div>
										<div>
											<select className="border p-1 select-tbh subtitle-order ">
												<option value="1" className="">
													Day
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
									<div className="d-flex mb-1">
										<div className="border p-1 pl-3 pr-3 width-title">
											Haircut
										</div>
										<div>
											<select className="border p-1 select-tbh subtitle-order">
												<option value="1" className="">
													Day
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="d-lg-flex justify-content-between pl-2">
							<div className="d-flex mr-3">
								<div className="subtitle-order width-above">Trailing Stop</div>
								<div>
									<input type="text" className="small-input"></input>
								</div>
							</div>
							<div className="d-flex ">
								<div className="subtitle-order width-above ">Resistence</div>
								<div>
									<input type="text" className="small-input"></input>
								</div>
							</div>
							<div className="d-flex mr-1">
								<div className="subtitle-order width-above">Prev Status :</div>
								<div className="subtitle-order text-success">Buy</div>
							</div>
							<div className="d-flex mr-2">
								<div className="subtitle-order ">Now Status :</div>
								<div className="subtitle-order text-danger">Sell</div>
							</div>
						</div>
						<div className="text-right text-danger disclaimer pr-2">
							<span className="border p-1 rounded border-danger">
								Disclaimer Berdasarkan On Monica
							</span>
						</div>
						<div>
							<div className="pl-3 d-flex justify-content-between pr-2 mt-3">
								<div>
									<input type="checkbox" value="Prevent" />
									<span className="subtitle-order pl-1">
										Prevent Repeat Order
									</span>
								</div>
								<div>
									<button className="btn-cashlimit text-cashlimit mr-3 ">
										Cash
									</button>
									<button className="btn-cashlimit text-cashlimit ">
										Limit
									</button>
								</div>
							</div>
						</div>
						<div>
							<div className="pl-3 d-flex justify-content-between pr-2 mt-3">
								<div className="text-cash font-weight-bold">Cash on T+2</div>
								<div className="text-cash">274,796,870</div>
							</div>
							<div className="pl-3 d-flex justify-content-between pr-2 mt-1">
								<div className="text-cash font-weight-bold">
									Remain Trade Limit
								</div>
								<div className="text-cash">834,872,182</div>
							</div>
						</div>
						<div className="d-lg-flex m-3 justify-content-around">
							<button className="btn-buy mr-3 text-white">BUY</button>
							<button className="btn-sell text-white">SELL</button>
						</div>
					</div>

					{/* Amend/withdraw */}
					<div
						style={{ background: '#F4F4F4' }}
						className={togglebuyOrder === 'ammend/withdraw' ? '' : 'd-none'}>
						<div className="mt-2 p-3  ">
							<div className="d-lg-flex justify-content-around  ">
								<div className="subtitle-order">
									<div className="d-flex mb-1">
										<div className="width-subtitle">IDX NO</div>
										<div>
											<input
												type="text"
												placeholder="0"
												className="text-right input-order p-1"></input>
										</div>
										<div>
											<button
												className="ml-1 p-1"
												onClick={() => setShowHargaBidOffer(true)}>
												<FiSearch />
											</button>
										</div>
										<HargaBidOffer
											show={showHargaBidOffer}
											setShow={setShowHargaBidOffer}
										/>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitle">Code</div>
											<div className="">
												<input
													type="text"
													placeholder="BBRI"
													className="input-order p-1"></input>
											</div>
										</div>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitle">Price</div>
											<div className="">
												<input
													type="text"
													placeholder="0"
													className="text-right input-order p-1"></input>
											</div>
										</div>
									</div>
								</div>
								<div className="subtitle-order ml-2">
									<div className="d-flex mb-1">
										<div className="width-subtitle">Auto</div>
										<div className="">
											<input
												type="text"
												placeholder="Last Price"
												className="input-order p-1"></input>
										</div>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitle">Qty lot</div>
											<div className="">
												<input
													type="text"
													placeholder="0"
													className="text-right input-order p-1"></input>
											</div>
										</div>
									</div>
									<div>
										<div className="d-flex">
											<div className="width-subtitle ">Total</div>
											<div className="">
												<input
													type="text"
													placeholder="0"
													className=" text-right input-order p-1"></input>
											</div>
										</div>
									</div>
								</div>
								<div className="subtitle-order ml-3">
									<div className="d-flex mb-1">
										<div className="border p-1  pl-3 pr-3 width-title">
											Type
										</div>
										<div>
											<select className="border p-1 select-tbh subtitle-order">
												<option value="1" className="">
													Day
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
									<div className="d-flex mb-1">
										<div className="border p-1  pl-3 pr-3 width-title">
											Board
										</div>
										<div>
											<select className="border p-1 select-tbh subtitle-order ">
												<option value="1" className="">
													Day
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
									<div className="d-flex mb-1">
										<div className="border p-1 pl-3 pr-3 width-title">
											Haircut
										</div>
										<div>
											<select className="border p-1 select-tbh subtitle-order">
												<option value="1" className="">
													Day
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="d-lg-flex justify-content-between pl-2">
							<div className="d-flex mr-3">
								<div className="subtitle-order width-above">Trailing Stop</div>
								<div>
									<input type="text" className="small-input"></input>
								</div>
							</div>
							<div className="d-flex ">
								<div className="subtitle-order width-above ">Resistence</div>
								<div>
									<input type="text" className="small-input"></input>
								</div>
							</div>
							<div className="d-flex mr-1">
								<div className="subtitle-order width-above">Prev Status :</div>
								<div className="subtitle-order text-success">Buy</div>
							</div>
							<div className="d-flex mr-2">
								<div className="subtitle-order ">Now Status :</div>
								<div className="subtitle-order text-danger">Sell</div>
							</div>
						</div>
						<div className="text-right text-danger disclaimer pr-2">
							<span className="border p-1 rounded border-danger">
								Disclaimer Berdasarkan On Monica
							</span>
						</div>
						<div>
							<div className="pl-3 d-flex justify-content-between pr-2 mt-3">
								<div>
									<input type="checkbox" value="Prevent" />
									<span className="subtitle-order pl-1">
										Prevent Repeat Order
									</span>
								</div>
								<div>
									<button className="btn-cashlimit text-cashlimit mr-3 ">
										Cash
									</button>
									<button className="btn-cashlimit text-cashlimit ">
										Limit
									</button>
								</div>
							</div>
						</div>
						<div>
							<div className="pl-3 d-flex justify-content-between pr-2 mt-3">
								<div className="text-cash font-weight-bold">Cash on T+2</div>
								<div className="text-cash">274,796,870</div>
							</div>
							<div className="pl-3 d-flex justify-content-between pr-2 mt-1">
								<div className="text-cash font-weight-bold">
									Remain Trade Limit
								</div>
								<div className="text-cash">834,872,182</div>
							</div>
						</div>
						<div className="d-lg-flex m-3 justify-content-around">
							<button
								className="btn-buy mr-3 text-white "
								style={{ background: '#EAA621' }}>
								AMMEND
							</button>
							<button className="btn-sell text-white bg-dark">WITHDRAW</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Quotes;
