import { baseurl } from "./constant";

export const GenerateNewToken = () => {
    try {
        let payload = {
            refreshToken  : sessionStorage.getItem('refresh_token')
          }
         

        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(payload);

       
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`${baseurl.url}/auth/generateNewAccessToken`, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.status === 200) {
                    sessionStorage.setItem("access_token", res.data.accessToken);
                    window.instance = res.data.accessToken;
                    window.location.reload();
                    console.log(res);
                } else if (res?.message === "Token Invalid/Expired") {
                        sessionStorage.clear();
                        // props.navigate("/")
                        window.location.reload();
                    }
                
             
            });
    } catch (error) {
        console.log("Error:", error);
    }
};


