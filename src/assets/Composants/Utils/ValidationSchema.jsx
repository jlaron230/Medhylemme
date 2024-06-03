import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string().required("le nom est requis"),
    email : Yup.string().required("Le champ email est requis")
    .email("Veuillez entrer une adresse email correcte"),
    phone : Yup.string().required("Le téléphone est requis")
    .min(8, "le téléphone dois contenir au moins 10 chiffres"),
    phoneConfirmations : Yup.string().required("Le champ du téléphone est requis").oneOf([Yup.ref('phone')], "le téléphone ne correspond pas")
})
