import axios from "axios";

export const fileUpload =  ( file ) => {
    const cloudURL = 'https://api.cloudinary.com/v1_1/dkchacdc4/upload ';
    const formData = new FormData();
    formData.append('upload_preset', 'React-Journal');
    formData.append('file', file);
    
    return(
       axios.post(cloudURL, formData)
        .then( (res) => { 
          if (res.statusText === 'OK') {
            const fileUrl = res.data.secure_url;
            console.log(fileUrl+' file url');
            return fileUrl     
                      
          }else {
            throw ( res.data.message );
          }
        })
        .catch( (error) => {
          console.log(error);
        })
    );
}