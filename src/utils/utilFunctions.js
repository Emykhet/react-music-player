export const secToMinFunc= (time)=>{
   try{
        if(time || time === 0){
          return Math.floor(time / 60) + ":" + 
            ("0" + Math.floor(time % 60)).slice(-2)
        } 
        if(time === ''){
            throw new Error ("Arguments missing. Location: secToMinFunc")
            }
   }catch (error){
       console.log(error.message)
   }
}