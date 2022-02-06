exports.filterData = (data, dataToFilter) => {
	const filteredData = {}
	for (key in data) {
		if (dataToFilter[key] === 1) {
			filteredData[key] = data[key]
		}
	}
	return filteredData
}
exports.filterData2D = (data, dataToFilter) => {
	for (let i = 0; i < data.length; i++) {
		const filteredData = {}
		for (key in data[i]) {
			if (dataToFilter[key] === 1) {
				filteredData[key] = data[i][key]
			}
		}
		data[i] = filteredData

	}
}
// input example data= {_id:"612a32sdsd23311",clubName:"First club",clubDescription:"saddeafeada"}, dataToFilter = {_id:0,clubName:1,clubDescription:0}
// output {clubName:"First club"}