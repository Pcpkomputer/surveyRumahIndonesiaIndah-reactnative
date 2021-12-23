const endpoint = "https://www.appdesignmaker.com/api";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


export async function upload_image(uri){
    try {

        let formData = new FormData();

        formData.append("image",{
            uri: uri,
            type: 'image/jpeg',
            name: `${makeid(5)}.jpg`,
        });

        let request = await fetch(`${endpoint}/extras/upload-image`,{
            method:"POST",
            body:formData     
        });
        let response = await request.json();
        let url = response.url;
        return {
            success:true,
            url:url
        }
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
}

export async function get_list_extras(type){
    try {
        let request = await fetch(`${endpoint}/extras/list/${type}`);
        let json = await request.json();
        return {
            success:true,
            data:json.data
        }      
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
}

export async function get_detail_extras(path){
    try {
        let request = await fetch(`${endpoint}/extras/files?path=${path}`);
        let json = await request.json();
        return {
            success:true,
            data:json.data
        }      
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
}
