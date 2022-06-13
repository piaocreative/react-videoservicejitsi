import axios from 'axios';
import config from '../config';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized:false
});

export function login(user)
{
    return new Promise((resolve,reject)=>{
        axios.post(config.apiurl + "/api/user/login",user,{headers:{'content-type': 'application/json','Access-Control-Allow-Origin': '*',Cors:true},httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res);
        }).catch(err=>reject(err));
    })
}

export function register(user)
{
    return new Promise((resolve,reject)=>{
        axios.post(config.apiurl + "/api/user/register",{user:user},{httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res);
        }).catch(err=>reject(err))
    })
}

export function updateprofile(user)
{
    return new Promise(async(resolve,reject)=>{
        if(user.photo)
        {
            user.photo = await uploadimage(user.photo);
        }   
        axios.post(config.apiurl + "/api/user/update",{user:user},{httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res);
        }).catch(err=>reject(err))
    })
}

export function uploadimage(file)
{
    return new Promise((resolve,reject)=>{
        var formdata = new FormData();
        formdata.append('fileImg',file);
        axios.post(config.apiurl + "/api/upload_avatar",formdata,{headers:{'Content-Type':'multipart/form-data'},httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res.data.file);
        }).catch(err=>reject(err))
    })
}

export function createconference(conferencename,id)
{
    return new Promise((resolve,reject)=>{
        axios.post(config.apiurl + "/api/conference/create",{name:conferencename,created_id:id},{httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res);
        }).catch(err=>reject(err))
    })
}

export function startmeeting(meeting,status)
{
    return new Promise((resolve,reject)=>{
        axios.post(config.apiurl + "/api/conference/start",{name:meeting,status:status},{httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res);
        }).catch(err=>reject(err));
    })
}

export function getconference(id)
{
    return new Promise((resolve,reject)=>{
        axios.get(config.apiurl + "/api/conference/get",{params:{id:id},httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res);
        }).catch(err=>reject(err))
    })
}

export function getmeeting(id)
{
    return new Promise((resolve,reject)=>{
        axios.get(config.apiurl + "/api/conference/meeting",{params:{id:id},httpsAgent:agent,withCredentials:true}).then(res=>{
            resolve(res)
        }).catch(err=>reject(err))
    })
}