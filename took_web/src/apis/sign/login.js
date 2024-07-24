import axios from "axios";

export const login = async (userId, password) => {
    try {
        const response = await axios.post(
            "SERVER_URL",
            {userId, password}, 
            {withCredentials : true}
        );

        const {accessToken} = response.data;
        localStorage.setItem("accessToken", accessToken);

        return accessToken;
    }catch(err){
        console.log(err)
        return -1;
    }
}

