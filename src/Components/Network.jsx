import React, {useEffect, useState} from 'react';
import {Button, TextField} from '@material-ui/core'
import {postIP, postWhois} from '../api/api'

function Network(){
    const [hiddenGeo, setHiddenGeo] = useState(false)
    const [hiddenGeoTable, setHiddenGeoTable] = useState(true)
    const [hiddenWhois, setHiddenWhois] = useState(true)
    const [hiddenWhoisTable, sethiddenWhoisTable] = useState(true)
    const [IP, setIP] = useState('')
    const [dataIP, setDataIP] = useState([])
    const [domain, setDomain] = useState('')
    const [dataDomain, setDataDomain] = useState([])
    const [errorIP, setErrorIP] = useState(false)
    const [textIP, setTextIP] = useState('')
    const [errorWhois, setErrorWhois] = useState(false)
    const [textWhois, setTextWhois] = useState('')

    function HandleClickIpGeo(){
        setHiddenWhois(true)
        setHiddenGeo(false)
        sethiddenWhoisTable(true)
    }

    function HandleClickWhois(){
        setHiddenGeo(true)
        setHiddenWhois(false)
        setHiddenGeoTable(true)
    }   

    return(
    <>
        <form onSubmit={(event) => {
            event.preventDefault()
        
         if(hiddenGeo === false){
         
            if(IP.length != 0){
                postIP(IP).then(response => {
                    console.log(response)

                    if(!response.data.internetProvider){
                        setErrorIP(true)
                        setTextIP('IP não encontrado')
                        setHiddenGeoTable(true)
                        return
                    }
                    setDataIP(response.data)
                    setHiddenGeoTable(false)
                })
                setErrorIP(false)
                setTextIP('')
            }

            if(IP.length == 0){
                setErrorIP(true)
                setTextIP('Digite um endereço IP, exemplo: 8.8.8.8')
            }
        }
            
 

         if(hiddenWhois === false){
            postWhois(domain).then(response => {
                console.log(response)

                if(response == 500) {
                    setErrorWhois(true)
                    setTextWhois('No momento só aceitamos dominios .BR ou algo não ocorreu bem')
                    sethiddenWhoisTable(true)
                    return
                }
                
                setDataDomain(response)
                sethiddenWhoisTable(false)
                setErrorWhois(false)
                setTextWhois('')
            })
         }

         

        }}>

            <div className='buttons'>
                <Button type='button' variant="contained" color="primary" onClick={HandleClickIpGeo}>IP Geolocation</Button>
                <Button type='button' variant="contained" color="primary" onClick={HandleClickWhois}>Whois</Button>
            </div>

            <div id='ipgeo' align='center' hidden={hiddenGeo}>
                <TextField 
                id="outlined-basic" 
                label="Digite o IP" 
                variant="outlined" 
                error={errorIP}
                helperText={textIP}
                value={IP}
                onChange={(event) => {
                    setIP(event.target.value)
                }}
                
                />
            </div>

            <div id='whois' align='center' hidden={hiddenWhois}>
                <TextField 
                id="outlined-basic" 
                label="Digite o domínio" 
                variant="outlined"
                error={errorWhois}
                helperText={textWhois} 
                value={domain}
                onChange={(event)=> {
                    setDomain(event.target.value)
                }}
                
                />
            </div>
        

            <div align='center' className='consult'>
                <Button type='submit' variant="contained" color="primary" >Consult</Button>
            </div>
            
        
        </form>



        <div align='center'  >
                
                

            <table hidden={hiddenGeoTable} className='table'>
                        <tr>
                            <td>PROVEDOR:</td>
                            <td>{dataIP.internetProvider}</td>
                        </tr>
                        <tr>
                            <td>PAÍS:</td>
                            <td>{dataIP.countryName}</td>
                        </tr>
                        <tr>
                            <td>CIDADE:</td>
                            <td>{dataIP.city}</td>
                        </tr>
                        <tr>
                            <td>REGIÃO:</td>
                            <td>{dataIP.regionName}</td>
                        </tr>
                    </table>

            <table hidden={hiddenWhoisTable} className='table'>
                        <tr>
                            <td>DOMAIN:</td>
                            <td>{dataDomain.domain}</td>
                        </tr>
                        <tr>
                            <td>DONO:</td>
                            <td>{dataDomain.owner}</td>
                        </tr>
                        <tr>
                            <td>CPF/CNPJ:</td>
                            <td>{dataDomain.ownerid}</td>
                        </tr>
                        <tr>
                            <td>RESPONSÁVEL:</td>
                            <td>{dataDomain.responsible}</td>
                        </tr>
                        <tr>
                            <td>PAÍS:</td>
                            <td>{dataDomain.country}</td>
                        </tr>
                        <tr>
                            <td>USUÁRIO TITULAR:</td>
                            <td>{dataDomain.ownerC}</td>
                        </tr>
                        <tr>
                            <td>USUÁRIO TÉCNICO:</td>
                            <td>{dataDomain.techC}</td>
                        </tr>
                        <tr>
                            <td>NS1:</td>
                            <td>{dataDomain.NS1}</td>
                        </tr>
                        <tr>
                            <td>NS2:</td>
                            <td>{dataDomain.NS2}</td>
                        </tr>
                        <tr>
                            <td>NS3:</td>
                            <td>{dataDomain.NS3}</td>
                        </tr>
                        <tr>
                            <td>NS4:</td>
                            <td>{dataDomain.NS4}</td>
                        </tr>
                        <tr>
                            <td>CRIADO EM:</td>
                            <td>{dataDomain.created}</td>
                        </tr>
                        <tr>
                            <td>EXPIRA EM:</td>
                            <td>{dataDomain.expires}</td>
                        </tr>
                        <tr>
                            <td>ID's:</td>
                            <td>{dataDomain.nicHdlBr}</td>
                        </tr>
                        <tr>
                            <td>E-MAIL ID's:</td>
                            <td>{dataDomain.eMail}</td>
                        </tr>
            </table>
 
        </div>
  
     </>       
            
    )

}

export default Network