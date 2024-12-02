import type { FormDataType } from "../../../types/formdata"

const addressData: FormDataType[] = [
    {
        name: "street",
        type: "text",
        label: "Street",
        required: true
    },
    {
        name: "city",
        type: "text",
        label: "City",
        required: true
    },
    {
        name: "state",
        type: "dropdown",
        label: "State",
        options: ["California", "Texas", "New York"],
        required: true
    },
    {
        name: "zipCode",
        type: "text",
        label: "Zip Code",
        required: false
    }
]

export default addressData