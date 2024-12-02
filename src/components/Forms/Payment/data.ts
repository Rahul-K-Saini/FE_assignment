import type { FormDataType } from "../../../types/formdata"

const paymentData:FormDataType[] = [
    {
        name: "cardnumber",
        type: "text",
        label: "Card Number",
        required: true
    },
    {
        name: "expiryDate",
        type: "date",
        label: "Expiry Date",
        required: true
    },
    {
        name: "cvv",
        type: "password",
        label: "CVV",
        required: true
    },
    {
        name: "cardholderName",
        type: "text",
        label: "Cardholder Name",
        required: true
    }
]

export default paymentData