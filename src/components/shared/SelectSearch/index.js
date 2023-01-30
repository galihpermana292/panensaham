import { Select } from 'antd';
import './index.css';

const DEFAULTOPTIONS = [
	{
		value: 'jack',
		label: 'Jack',
	},
	{
		value: 'lucy',
		label: 'Lucy',
	},
	{
		value: 'tom',
		label: 'Tom',
	},
];

const SelectSearch = ({
	onChange = () => ({}),
	onSearch = () => ({}),
	options = DEFAULTOPTIONS,
	...props
}) => {
	const handleSearch = (val) => {
		console.log(val, 'search');
	};
	return (
		<Select
			{...props}
			showSearch
			onChange={onChange}
			onSearch={handleSearch}
			filterOption={(input, option) =>
				// (option?.labelName ?? '').toLowerCase().includes(input.toLowerCase()) ||
				(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
			}
			options={options}
			className="select-search"
		/>
	);
};

export default SelectSearch;
