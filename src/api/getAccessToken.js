function getAccessToken() {
	const initialHeaders = {
		Accept: 'application/json',
		// 'Content-Type': 'application/json',
	};
	let access_token = '1b730b8cf4c4f3d4796f161410fdb935';
	if (access_token) {
		return {
			headers: {
				Authorization: `Bearer ${access_token}`,
				...initialHeaders,
			},
		};
	} else {
		return {
			headers: initialHeaders,
		};
	}
}

const getAccessTokens = { getAccessToken };

export default getAccessTokens;
