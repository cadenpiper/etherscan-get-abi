const axios = require('axios')
const { JsonRpcProvider, Contract } = require('ethers')
require("dotenv").config()

const address = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
const apiKey = process.env.ETHERSCAN_API_KEY
const infuraApiKey = process.env.INFURA_API_KEY
const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`

const getAbi = async () => {
	const res = await axios.get(url)
	const abi = JSON.parse(res.data.result)
	// console.log(abi)

	const provider = new JsonRpcProvider(infuraUrl)
	const contract = new Contract(address, abi, provider)

	const name = await contract.name()
	const totalSupply = await contract.totalSupply()

	console.log(name)
	console.log(totalSupply.toString())
}

getAbi()
