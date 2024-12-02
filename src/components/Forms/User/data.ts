
import type { FormDataType } from "../../../types/formdata"

const userData: FormDataType[] = [
    {
        name: "firstName",
        type: "text",
        label: "First Name",
        required: true
    },
    {
        name: "lastName",
        type: "text",
        label: "Last Name",
        required: true
    },
    {
        name: "age",
        type: "text",
        label: "Age",
        required: false
    }
]

export default userData