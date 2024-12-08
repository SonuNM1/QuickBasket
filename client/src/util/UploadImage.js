import Axios from "./Axios"
import SummaryApi from "../common/SummaryAPI"

const uploadImage = async (image) => {
    try{

        const formData = new FormData()
        formData.append('image', image)

        const response = await Axios({
            ...SummaryApi.uploadImage, 
            data: formData
        })

        return response 
    }catch(error){
        return error 
    }
}

export default uploadImage