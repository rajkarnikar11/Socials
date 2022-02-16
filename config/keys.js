
if(process.env.NODE_ENV==="production"){
    modules.exoprts=require('./prod')
}else{
    module.exports=require('./dev')
}