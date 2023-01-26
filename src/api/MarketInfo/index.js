import api from '../index';
import token from '../getAccessToken';

function getQuotes(params = '*') {
	return api.get(`/quotes?code=${params}`, token.getAccessToken());
}

function getOrderBook(params = '*') {
	return api.get(`/orderbook?code=${params}`, token.getAccessToken());
}

function getTradebook(params = '*') {
	return api.get(`/tradebook?code=${params}`, token.getAccessToken());
}

const marketInfo = { getQuotes, getOrderBook, getTradebook };
export default marketInfo;
