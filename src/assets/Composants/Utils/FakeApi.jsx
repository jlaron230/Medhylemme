export const register = (data) => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.email == "test@email.com"){
                    reject({
                        Error: {
                            email: "l'email est déjà choisi par un autre utilisateur"
                        }
                    })
                } else {
                    resolve({
                        message : "vous êtes inscrit avec succès",
                        sucess : true
                    })
                }
                
            }, 2000);
    })
}