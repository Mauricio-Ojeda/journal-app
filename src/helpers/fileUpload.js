import axios from "axios";

export const fileUpload =  ( file ) => {
    const cloudURL = 'https://api.cloudinary.com/v1_1/dkchacdc4/upload ';
    const formData = new FormData();
    formData.append('upload_preset', 'React-Journal');
    formData.append('file', file);
     axios.post(cloudURL, formData)
      .then( async (res) => { 
        if (res.statusText === 'OK') {
          const fileUrl = await res.data.secure_url;
          console.log(fileUrl);       
          return  fileUrl
          
        }else {
          throw await ( res.data.message );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
}