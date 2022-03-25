import axios from "axios";

const api = axios.create( {
    baseURL: 'http://localhost:3002'
})

async function postIP(ip){
    
    try{
        const data = {
            ip
        }
        
        const response = await api.post('/ip', data)
        
        return response
    }
    catch(error){
        return error
    }
    
}

async function postWhois(domain){

    try{
        const data = {
            domain
        }
    
        const response  = await api.post('/whois', data)
        
        return response.data[0]
    }
    catch(error){
        return 500
    }
    
}

export  {postIP, postWhois}