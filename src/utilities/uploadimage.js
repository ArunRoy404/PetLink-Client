import axios from "axios"

const imageBBApiKey = import.meta.env.VITE_imgbb_apiKey

const uploadImageToImageBB = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imageBBApiKey}`, formData)
    return res

}

export { uploadImageToImageBB }