const axios = require('axios').default

const consultAdress = (params) => {
  return axios(`https://viacep.com.br/ws/${params}/json/`,{
    method: "GET"
  })
}

const consultDataCnpj = (params)=>{
  return axios(`https://www.receitaws.com.br/v1/cnpj/${params}`, {
    method: "GET"
  })
}

module.exports = {consultAdress, consultDataCnpj}