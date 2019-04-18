import axios from 'axios';

class ESI {
    static async getAllContractInfo(regionId) {
        const response = await axios.head(`https://esi.evetech.net/latest/contracts/public/${regionId}/?datasource=tranquility`);
        let pages = response.headers['x-pages'];
        let contracts = [];

        // Retrieve all pages of contracts at same time.
        let calls = [];
        for (let i=1;i<=pages;i++) {
            calls.push(ESI.getAllContractInfoByPage(regionId, i));
        }
        return await axios.all(calls)
            .then(axios.spread(function (...responses) {
                for (let j=0;j<responses.length;j++) {
                    for (let k=0;k<responses[j].length;k++) {
                        contracts.push(responses[j][k]);
                    }
                }
                return contracts;
            }));
    }

    static async getAllContractInfoByPage(regionId, page) {
        console.log('Retrieving contract list.');
        let contracts = await ESI.getContractsByRegion(regionId, page);

        let stationContracts = [];
        let endLocationIds = [];
        let issuerIds = [];

        // Collect IDs of end locations and issuers so we can query them all at once for their names.
        // let index = 0;
        for (const contract of contracts) {
            // console.log(`Contract ${++index}/${contracts.length}`);

            // TODO: A citadel can be returned instead of a station, and it has an ID like 1022875242907
            // which is greater than an int32. Not sure how to handle these yet.
            if (contract.start_location_id < 2147483647 &&
                contract.end_location_id < 2147483647) {

                if (!contracts.for_corporation) {
                    endLocationIds.push(contract.end_location_id);
                    issuerIds.push(contract.issuer_id);
                }
            }
            else { 
            // TODO Is this a citadel?
            }
        }

        // Rip out the duplicates, as the ESI API doesn't like them in the following calls.
        let uniqueEndLocationIds = [...new Set(endLocationIds)];
        let uniqueIssuerIds = [...new Set(issuerIds)];
        const endLocationNames = await ESI.getNamesForIds(uniqueEndLocationIds);
        const issuerNames = await ESI.getNamesForIds(uniqueIssuerIds);

        // Tie the name back to the actual contract for easy retrieval later.
        for (const contract of contracts) {
            if (contract.start_location_id < 2147483647 &&
                contract.end_location_id < 2147483647) {

                contract.info = {};
                contract.info.end_location_name = endLocationNames.find(function(element) {
                    return contract.end_location_id === element.id;
                }).name;
                contract.info.issuer_name = issuerNames.find(function(element) {
                    return contract.issuer_id === element.id;
                }).name;

                stationContracts.push(contract);
            }
        }

        return stationContracts;
    }

    static async getNamesForIds(ids) {
        try {
            const response = await axios.post(`https://esi.evetech.net/latest/universe/names/?datasource=tranquility`,ids);
            if (response.statusText != 'OK') {
                throw Error(response.statusText);
            }
    
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 1800 seconds
    static async getContractsByRegion(regionId, page) {
        try {
            const response = await axios.get(`https://esi.evetech.net/latest/contracts/public/${regionId}/?datasource=tranquility&page=${page}`, 1800);
            if (response.statusText != 'OK') {
                throw Error(response.statusText);
            }
    
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default ESI;