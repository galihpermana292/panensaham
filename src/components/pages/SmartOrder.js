import './OrderBook.css';
import './SmartOrder.css';
import { runningTrade } from '../dummy/runningTrade';
import { stockDown } from '../dummy/stockDown';
import { marketNews } from '../dummy/marketNews';
import { useState } from 'react';
import { SlKey } from 'react-icons/sl';
import { FiSearch } from 'react-icons/fi';
import Setruningtrade from '../popup/Setruningtrade';
import HargaBidOffer from '../popup/HargaBidOffer';
import React, { useEffect, useRef } from 'react';
import StockPrice from '../shared/StockPrice';
import marketInfo from '../../api/MarketInfo';

function SmartOrder() {
	// data quotes
	const [dataLabel, setDataLabel] = useState([]);
	const [activeQuote, setActiveQuote] = useState('-');
	const [stockData, setStockData] = useState([]);
	const [activeQuotesAcronym, setActiveQuotesAcronym] = useState('TLKM');

	// orderbook
	const [orderBook, setOrderBook] = useState([]);
	const [sumBook, setSumBook] = useState({ bidSum: 0, offSum: 0 });

	// tradebook
	const [tradeBook, setTradeBook] = useState([]);

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
	const [togglebuyOrder, setToggleBuyorder] = useState('auto-buy');
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
			value: data[0],
		}));
		setDataLabel(newData);
	};

	//get select box
	const getSelectedQuotes = async (val = 'AALI') => {
		const activeLabel = dataLabel?.filter((data) => data.label === val);
		setActiveQuote(activeLabel[0].labelName);
		setActiveQuotesAcronym(val);

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

		setSumBook({ bidSum: bidLotSum, offSum: offLotSum });

		setOrderBook(orderbook);
		setStockData(quotes);
		setTradeBook(tradebook);
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
					symbol: activeQuotesAcronym,
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
	}, [activeQuotesAcronym]);
	return (
		<div className="big mt-5 pt-5 ">
			<div className="up-container d-lg-flex">
				{/* Running Trade */}
				<div className="border  rt-container-left">
					<div className="d-flex justify-content-between">
						<div className="rt-head p-2">Running Trade</div>
						<div className="">
							<button
								className="btn-trading"
								onClick={() => setShowSetRuningTrade(true)}>
								<SlKey />
							</button>
							<button className="btn-trading ml-2 mr-2">Start</button>
							<button className="btn-trading">Stop</button>
						</div>
						<Setruningtrade
							show={showSetRuningTrade}
							setShow={setShowSetRuningTrade}
						/>
					</div>
					<div className="bg-warning d-flex justify-content-between rt-title p-2">
						<div>IHSG</div>
						<div className="text-success">7083,097</div>
						<div className="text-success">45,532</div>
						<div className="text-success">0,66 %</div>
						<div>14.734.500</div>
						<div>9.642.766</div>
						<div>922.930</div>
					</div>
					<div className="table-wrapper">
						<table className="rt-subtitle scroll">
							<tbody>
								<tr className="sticky">
									<th className=" pl-3 pr-3">Time</th>
									<th className=" pl-3 pr-3">Code</th>
									<th className=" pl-3 pr-3">Price</th>
									<th colspan="2" className="pl-4 pr-5">
										Change
									</th>
									<th className=" pl-4 pr-4 ">Vol</th>
								</tr>
								{runningTrade.map((item, index) => (
									<tr className="">
										<td className="font-weight-bold p-1">{item.time}</td>
										<td className="font-weight-bold">{item.code}</td>
										<td className="font-weight-bold">{item.price}</td>
										<td className="font-weight-bold">{item.changeFirst}</td>
										<td className="font-weight-bold">{item.changeSecond} %</td>
										<td className="font-weight-bold">{item.volume}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Trading view */}
				<div className="border  rt-container-center ml-3 mr-3 ">
					{/* <img src={traddingView} width={500}></img> */}

					<div className="tradingview-widget-container ">
						<div className="tradeview" id="tradingview_fc40e" />
					</div>

					<div className="d-flex border justify-content-between mt-2 ">
						<div
							className={
								togglebuyOrder === 'auto-buy'
									? 'buy_amend_title p-1 font-weight-bold text-warning bg-dark'
									: 'buy_amend_title p-1'
							}
							onClick={() => togglebuyTab('auto-buy')}>
							{' '}
							AUTO BUY
						</div>
						<div
							className={
								togglebuyOrder === 'auto-sell'
									? 'buy_amend_title p-1 font-weight-bold text-warning bg-dark'
									: 'buy_amend_title p-1'
							}
							onClick={() => togglebuyTab('auto-sell')}>
							{' '}
							AUTO SELL
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
					{/* Auto Buy */}
					<div
						style={{ background: '#F4F4F4' }}
						className={togglebuyOrder === 'auto-buy' ? '' : 'd-none'}>
						<div className="mt-2 p-3  ">
							<div className="d-lg-flex justify-content-around  ">
								<div className="subtitle-order">
									<div>
										<input type="checkbox" value="Lp>=" />
										<span className="subtitle-order pl-1 mr-3">
											Last Price &gt;=
										</span>
										<input type="text" className="input-text" />
										Rp
									</div>
									<div>
										<input type="checkbox" value="Lp<=" />
										<span className="subtitle-order pl-1 mr-3">
											Last Price &lt;=
										</span>
										<input type="text" className="input-text" />
										Rp
									</div>
									<div>
										<input type="checkbox" value="Buyifdrop" />
										<span className="subtitle-order pl-1 mr-4">
											Buy if drop
										</span>
										<input type="text" className="small-input " />% Of Tracking
										Price
									</div>
								</div>
								<div className="subtitle-order">
									<div className="d-flex mb-1">
										<div className="width-subtitles">Order Price</div>
										<div className="">
											<input type="radio" className="radio-order p-1 "></input>{' '}
											select
											<input
												type="radio"
												className="radio-order p-1 ml-2"></input>{' '}
											input
										</div>
									</div>
									<div>
										<div className="d-flex mb-1">
											<div className="width-subtitles">Last Price</div>
											<div className="">
												<select class="form-select border rounded ">
													<option selected>0 Thick</option>
													<option value="1">One</option>
													<option value="2">Two</option>
													<option value="3">Three</option>
												</select>
											</div>
										</div>
									</div>
									<div>
										<div className="d-flex">
											<div className="width-subtitles">Order Qty</div>
											<div className="">
												<input type="text" className="input-text" />
											</div>
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

					{/* auto-sell */}
					<div
						style={{ background: '#F4F4F4' }}
						className={togglebuyOrder === 'auto-sell' ? '' : 'd-none'}>
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

				{/* column stock price */}
				<StockPrice
					stockData={stockData}
					orderBook={orderBook}
					sumBook={sumBook}
					toggleStockTab={toggleStockTab}
					getSelectedQuotes={getSelectedQuotes}
					tradeBook={tradeBook}
					dataLabel={dataLabel}
					activeQuote={activeQuote}
					toggleStock={toggleStock}
					stockDown={stockDown}
				/>
			</div>

			<div className="down-container  d-lg-flex justify-content-arround mt-3 mb-5">
				<div className="border marketContainer mr-3 ">
					<div className="bg-warning title-market p-2">Market News</div>
					<div className="market-wrapper">
						{marketNews.map((item, index) => (
							<div className="market-card">
								<div className="market-subtitle pl-2">{item.title}</div>
								<div className="market-content pl-2">{item.content}</div>
								<div className="market-date pl-2">{item.date}</div>
							</div>
						))}
					</div>
				</div>
				<div className="border wopContainer">
					{/* Title WOP */}
					<div className="bg-warning title-wop p-2 d-flex p-2">
						<div
							className={
								toggleWop === 'watchlist'
									? 'ml-2 mr-2 font-weight-bold text-dark wop'
									: 'wop ml-2 mr-2'
							}
							onClick={() => toggleWopTab('watchlist')}>
							WATCHLIST
						</div>
						<div
							className={
								toggleWop === 'orderlist'
									? 'ml-2 mr-2 font-weight-bold text-dark wop'
									: 'wop ml-2 mr-2'
							}
							onClick={() => toggleWopTab('orderlist')}>
							ORDER LIST
						</div>
						<div
							className={
								toggleWop === 'portfolio'
									? 'ml-2 mr-2 font-weight-bold text-dark wop'
									: 'wop ml-2 mr-2'
							}
							onClick={() => toggleWopTab('portfolio')}>
							PORTFOLIO
						</div>
					</div>

					{/* WatchList */}
					<div
						className={
							toggleWop === 'watchlist' ? 'wop-active-content' : 'wop-content'
						}>
						<div className="p-2">
							<input
								type="text"
								className="input-watchlist"
								placeholder="BBRI"></input>
							<button className="btn-watchlist ml-2 ">Add</button>
						</div>
						<div className="watchlist-wrap">
							<table width={'890px'} className="border ">
								<thead>
									<tr className="text-detail-watchlist text-center">
										<td className="p-1">Code</td>
										<td>Last</td>
										<td>Change</td>
										<td>Change%</td>
										<td>Volume</td>
										<td>Strength%</td>
										<td>Code</td>
										<td>Code</td>
										<td>Last</td>
										<td>Change</td>
										<td>Change%</td>
										<td>Volume</td>
										<td>Strength%</td>
									</tr>
								</thead>
								<tbody>
									<tr className="text-detail-watchlist text-center">
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Order List  */}
					<div
						className={
							toggleWop === 'orderlist' ? 'wop-active-content' : 'wop-content'
						}>
						{/* Title part of order list */}
						<div className="p-2 order-title d-flex m-1 ">
							<div
								className={
									toggleOrder === 'openOrders'
										? 'ml-2 mr-2 font-weight-bold text-dark wop '
										: 'wop ml-2 mr-2'
								}
								onClick={() => toggleOrderTab('openOrders')}>
								Open Orders
							</div>
							<div
								className={
									toggleOrder === 'closedHistory'
										? 'ml-2 mr-2 font-weight-bold text-dark wop'
										: 'wop ml-2 mr-2'
								}
								onClick={() => toggleOrderTab('closedHistory')}>
								Closed History
							</div>
							<div
								className={
									toggleOrder === 'orderHistory'
										? 'ml-2 mr-2 font-weight-bold text-dark wop'
										: 'wop ml-2 mr-2'
								}
								onClick={() => toggleOrderTab('orderHistory')}>
								Order History
							</div>
							<div
								className={
									toggleOrder === 'tradeList'
										? 'ml-2 mr-2 font-weight-bold text-dark wop'
										: 'wop ml-2 mr-2'
								}
								onClick={() => toggleOrderTab('tradeList')}>
								Trade List
							</div>
						</div>
						<div className="watchlist-wrap">
							{/* // Open Orders */}
							<table
								width={'890px'}
								className={
									toggleOrder === 'openOrders'
										? 'border '
										: 'border order-content'
								}>
								<thead>
									<tr className="text-detail-watchlist text-center">
										<td className="p-1">W Time</td>
										<td>Order #</td>
										<td>Code</td>
										<td>Board</td>
										<td>Type</td>
										<td>Price</td>
										<td>Qty</td>
										<td>Matched Qty</td>
										<td>Ball Qty</td>
										<td>User ID</td>
										<td>Queue</td>
										<td>Media</td>
										<td className="pl-3 pr-3">Stg ID</td>
									</tr>
								</thead>
								<tbody>
									<tr className="text-detail-watchlist text-center">
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
								</tbody>
							</table>

							{/* // Closed History */}
							<table
								width={'890px'}
								className={
									toggleOrder === 'closedHistory'
										? 'border '
										: 'border order-content'
								}>
								<h1 className="text-center">Closed History In Progresss</h1>
								{/* <thead>
                                    <tr className="text-detail-watchlist text-center">
                                        <td className="p-1">W  Time</td>
                                        <td>Order #</td>
                                        <td>Code</td>
                                        <td>Board</td>
                                        <td>Type</td>
                                        <td>Price</td>
                                        <td>Qty</td>
                                        <td>Matched Qty</td>
                                        <td>Ball Qty</td>
                                        <td>User ID</td>
                                        <td>Queue</td>
                                        <td>Media</td>
                                        <td className="pl-3 pr-3">Stg ID</td>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr className="text-detail-watchlist text-center">
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        
                                    </tr>  
                                </tbody> */}
							</table>

							{/* // Order History */}
							<table
								width={'890px'}
								className={
									toggleOrder === 'orderHistory'
										? 'border '
										: 'border order-content'
								}>
								<h1 className="text-center">Order History In Progresss</h1>
								{/* <thead>
                                    <tr className="text-detail-watchlist text-center">
                                        <td className="p-1">W  Time</td>
                                        <td>Order #</td>
                                        <td>Code</td>
                                        <td>Board</td>
                                        <td>Type</td>
                                        <td>Price</td>
                                        <td>Qty</td>
                                        <td>Matched Qty</td>
                                        <td>Ball Qty</td>
                                        <td>User ID</td>
                                        <td>Queue</td>
                                        <td>Media</td>
                                        <td className="pl-3 pr-3">Stg ID</td>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr className="text-detail-watchlist text-center">
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        <td>s</td>
                                        
                                    </tr>  
                                </tbody> */}
							</table>

							{/* //  Trade List  */}
							<table
								width={'890px'}
								className={
									toggleOrder === 'tradeList'
										? 'border'
										: 'border order-content'
								}>
								<thead>
									<tr className="text-detail-watchlist text-center">
										<td className="p-1">Code</td>
										<td>Time</td>
										<td>Trade #</td>
										<td>Order #</td>
										<td>Code</td>
										<td>Board</td>
										<td>BuySell</td>
										<td>Matched Price</td>
										<td>Matched Qty</td>
										<td>Amount</td>
										<td>Media</td>
										<td className="pl-3 pr-3">Stg ID</td>
									</tr>
								</thead>
								<tbody>
									<tr className="text-detail-watchlist text-center">
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Portfolio */}
					<div
						className={
							toggleWop === 'portfolio' ? 'wop-active-content' : 'wop-content'
						}>
						{/* Title part of order list */}
						<div className="p-2 order-title d-flex m-1 ">
							<div
								className={
									togglePortfolio === 'stockPortfolio'
										? 'ml-2 mr-2 font-weight-bold text-dark wop '
										: 'wop ml-2 mr-2'
								}
								onClick={() => togglePortfolioTab('stockPortfolio')}>
								Stock
							</div>
							<div
								className={
									togglePortfolio === 'cashPortfolio'
										? 'ml-2 mr-2 font-weight-bold text-dark wop'
										: 'wop ml-2 mr-2'
								}
								onClick={() => togglePortfolioTab('cashPortfolio')}>
								Cash
							</div>
							<div
								className={
									togglePortfolio === 'mutualPortfolio'
										? 'ml-2 mr-2 font-weight-bold text-dark wop'
										: 'wop ml-2 mr-2'
								}
								onClick={() => togglePortfolioTab('mutualPortfolio')}>
								Mutual Fund
							</div>
						</div>
						<div className="watchlist-wrap">
							{/* // Stock Portfolio */}
							<table
								width={'890px'}
								className={
									togglePortfolio === 'stockPortfolio'
										? 'border '
										: 'border portfolio-content'
								}>
								<thead>
									<tr className="text-detail-watchlist text-center">
										<td className="p-1">Code</td>
										<td>Average</td>
										<td>Last</td>
										<td>Lot</td>
										<td>Shares</td>
										<td>Open Sell</td>
										<td>Stock Value</td>
										<td>Market Value</td>
										<td>Haircut Value</td>
										<td>Hair Cut</td>
										<td>PTsL(+/-)</td>
										<td>%</td>
									</tr>
								</thead>
								<tbody>
									<tr className="text-detail-watchlist text-center">
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
								</tbody>
							</table>

							{/* // cash Portfolio */}
							<table
								width={'890px'}
								height={'200px'}
								className={
									togglePortfolio === 'cashPortfolio'
										? 'border '
										: 'border portfolio-content'
								}>
								<thead>
									<tr className="text-detail-watchlist text-center">
										<td></td>
										<td className="pt-2 pb-2 ">FDorced Sell</td>
										<td>Suspend</td>
										<td>T + 0 (03/06/2022)</td>
										<td>T + 1 (06/06/2022)</td>
										<td>T + 2 (07/06/2022)</td>
									</tr>
								</thead>
								<tbody>
									<tr className="text-detail-watchlist text-center">
										<td className="pt-2 pb-2">Receivable</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
									<tr className="text-detail-watchlist text-center">
										<td className="pt-2 pb-2">Payable</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
									<tr className="text-detail-watchlist text-center">
										<td className="pt-2 pb-2">Withdraw</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
									<tr className="text-detail-watchlist text-center">
										<td className="pt-2 pb-2">Cash</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
									<tr className="text-detail-watchlist text-center">
										<td className="pt-2 pb-2">NetCash</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
								</tbody>
							</table>

							{/* // Mutual Fund Portfolio */}
							<table
								width={'890px'}
								className={
									togglePortfolio === 'mutualPortfolio'
										? 'border '
										: 'border portfolio-content'
								}>
								<thead>
									<tr className="text-detail-watchlist text-center">
										<td className="p-1">Code Unit</td>
										<td>AVG</td>
										<td>Last Nav</td>
										<td>Fund Value</td>
										<td>Market Value</td>
										<td>Pts (+/-)</td>
										<td>Earnings</td>
									</tr>
								</thead>
								<tbody>
									<tr className="text-detail-watchlist text-center">
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
										<td>s</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SmartOrder;
