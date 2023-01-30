import { IoMdArrowDropup } from 'react-icons/io';
import SelectSearch from '../SelectSearch';
const StockPrice = ({
	stockData = [],
	orderBook = [],
	sumBook = { bidSum: 0, offSum: 0 },
	toggleStockTab,
	getSelectedQuotes,
	dataLabel,
	activeQuote,
	toggleStock,
	stockDown,
	tradeBook,
	showStockDone = true,
	from = undefined,
}) => {
	return (
		<div className="rt-container-left border" style={{ height: 'max-content' }}>
			{/* Stock Price */}
			<div className="border">
				<div className="d-flex bg-warning">
					<div className="sp-head p-3">Stock Price</div>
					<div className="ml-3 ">
						<div className="sp-sub p-2 d-flex">
							<div className="pr-3">Training Stop</div>
							<div className="pr-3">4,200</div>
							<div className="pr-3">Prev Status </div>
							<div className="pl-3 text-success">BUY</div>
						</div>
						<div className="sp-sub p-2">
							<div className="pr-4">Resistence</div>
							<div className="pr-3">4,400</div>
							<div className="pr-3">Next Status </div>
							<div className="pl-3 text-danger">SELL</div>
						</div>
					</div>
				</div>
				<div className="d-flex">
					{/* <div className="border p-2 pl-3 pr-3 sp-sub-title">BBRI</div> */}
					<div className="border sp-sub-title">
						<SelectSearch
							placeholder="Quotes"
              optionFilterProp="children"
							onChange={(val) =>
								from ? getSelectedQuotes(val, from) : getSelectedQuotes(val)
							}
							options={dataLabel}
						/>
						{/* <select
							className="p-1 select-tbh-table subtitle-order-table"
							onChange={(e) =>
								from
									? getSelectedQuotes(e.target.value, from)
									: getSelectedQuotes(e.target.value)
							}>
							<option value="1">Quotes</option>
							{dataLabel.map((data, idx) => (
								<option value={data.label} key={idx}>
									{data.label}
								</option>
							))}
						</select> */}
					</div>
					<div className="border p-2 sp-sub-title pl-5 pr-5 label-name">
						{activeQuote}
					</div>
					<div className="border p-2 pl-2 sp-sub-right pl-3 pr-4">
						<span className="text-success">
							Last: {stockData.length < 1 ? '-' : stockData[13]}
						</span>
					</div>
				</div>
				<div className="d-flex justify-content-between ml-3 mr-3 text-center sp-detail">
					<div className="p-2">
						<div>
							Prev <span className="text-success pl-3">{'-'}</span>
						</div>
						<div>
							Chg{' '}
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[19]}
							</span>
						</div>
						<div className="text-right">
							%{' '}
							<span className="text-success pl-4">
								{stockData.length < 1 ? '-' : stockData[20]}
							</span>
						</div>
						<div>
							Freq{' '}
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[23]}
							</span>
						</div>
					</div>
					<div>
						<div>
							Open{' '}
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[14]}
							</span>
						</div>
						<div>
							High{' '}
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[15]}
							</span>
						</div>
						<div className="text-right">
							Low{' '}
							<span className="text-danger pl-3">
								{stockData.length < 1 ? '-' : stockData[16]}
							</span>
						</div>
						<div>
							IEP{' '}
							<span className="pl-3">
								{stockData.length < 1 ? '-' : stockData[11]}
							</span>
						</div>
					</div>
					<div>
						<div>
							Lot
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[21]}
							</span>
						</div>
						<div>
							Val{' '}
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[22]}
							</span>
						</div>
						<div>
							Avg{' '}
							<span className="text-success pl-3">
								{stockData.length < 1 ? '-' : stockData[18]}
							</span>
						</div>
						<div>
							IEV{' '}
							<span className="pl-3">
								{stockData.length < 1 ? '-' : stockData[12]}
							</span>
						</div>
					</div>
				</div>
				<div className="table-wrapper-sp">
					<table className="rt-subtitle scroll ">
						<tbody>
							<tr className="sticky bg-warning">
								<th className=" pl-3 pr-3">Add</th>
								<th className=" pl-3 pr-3">Lot</th>
								<th className=" pl-3 pr-3">Bid</th>
								<th className="pl-3 pr-3">Offer</th>
								<th className=" pl-4 pr-4 ">Lot</th>
								<th className=" pl-4 pr-4 ">Add</th>
							</tr>
							{orderBook.map((item, index) => (
								<tr className="" key={index}>
									<td className="font-weight-bold p-1">{item[0]}-</td>
									<td className="font-weight-bold">{item[1]}</td>
									<td className="font-weight-bold">{item[2]}</td>
									<td className="font-weight-bold">{item[3]}</td>
									<td className="font-weight-bold">{item[4]}</td>
									<td className="font-weight-bold">{item[5]}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="bg-warning d-flex sp-footer justify-content-around p-2 text-center">
					<div>{sumBook.bidSum}</div>
					<div>Total</div>
					<div>{sumBook.offSum}</div>
				</div>
				{/* <div className="text-center sp-footer sp-footer-color p-2 ">Change</div> */}
			</div>
			{/* Stock Done and Stock Info*/}
			{showStockDone && (
				<div className="">
					{/* Title Stock Tabs */}
					<div className="bg-warning d-flex m-auto justify-content-start stock-title ">
						<div
							className={
								toggleStock === 'stockdone' ? 'p-2 stock-title-active' : 'p-2  '
							}
							onClick={() => toggleStockTab('stockdone')}>
							STOCK DONE
						</div>
						<div
							className={
								toggleStock === 'stockinfo'
									? 'p-2 stock-title-active'
									: 'p-2   '
							}
							onClick={() => toggleStockTab('stockinfo')}>
							STOCK INFO
						</div>
					</div>
					{/* Stock Done */}
					<div
						className={
							toggleStock === 'stockdone'
								? 'table-wrapper-sd stock-active-content'
								: 'table-wrapper-sd stock-content'
						}>
						<table className="rt-subtitle scroll ">
							<tbody>
								<tr className="sticky ">
									<th className=" pl-3 pr-3">Time</th>
									<th className=" pl-3 pr-3">Last</th>
									<th colspan="2" className=" pl-3 pr-3">
										Change(%)
									</th>
									<th className="pl-4 pr-4">DoneQty</th>
									<th className=" pl-4 pr-4 ">Strength</th>
								</tr>
								{stockDown.map((item, index) => (
									<tr className="font-weight-bold">
										<td className="p-1">{item.time}</td>
										<td className="text-success">{item.last}</td>
										<td className="text-success">
											<IoMdArrowDropup />
											{item.changeFirst}
										</td>
										<td className="text-success">
											<IoMdArrowDropup />
											{item.changeLast} %
										</td>
										<td className="">{item.doneqty}</td>
										<td className="">{item.strength} %</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Stock Info */}
					<div
						className={
							toggleStock === 'stockinfo'
								? 'table-wrapper-sd stock-active-content'
								: 'table-wrapper-sd stock-content'
						}>
						<table className="rt-subtitle scroll ">
							<tbody>
								<tr className="sticky ">
									<th className=" pl-3 pr-3">Price</th>
									<th className=" pl-3 pr-3">Freq</th>
									<th className=" pl-3 pr-3">B Lot</th>
									<th className="pl-4 pr-4">S Lot</th>
									<th className=" pl-2 pr-2 ">Lot</th>
									<th className=" pl-2 pr-2 ">B Freq</th>
									<th className=" pl-2 pr-2 ">S Freq</th>
								</tr>
								{tradeBook.map((item, index) => (
									<tr className="font-weight-bold" key={index}>
										<td className="p-1">{item[0]}</td>
										<td className="">{item[4]}</td>
										<td className="">{item[1]}</td>
										<td className="">{item[2]}</td>
										<td className="">{item[3]}</td>
										<td
											className={
												item.Bfreq > item.Sfreq ? 'text-success' : 'text-danger'
											}>
											0
										</td>
										<td
											className={
												item.Sfreq > item.Bfreq ? 'text-success' : 'text-danger'
											}>
											0
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default StockPrice;
