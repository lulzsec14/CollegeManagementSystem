exports.filterData = (data,dataToFilter) => {
    const filteredData = {}
        for(key in data)
        {
            if(dataToFilter[key]===1)
            {
                filteredData[key] = data[key]
            }
        }
    return filteredData
}
// input example data= {_id:"612a32sdsd23311",clubName:"First club",clubDescription:"saddeafeada"}, dataToFilter = {_id:0,clubName:1,clubDescription:0}
// output {clubName:"First club"}