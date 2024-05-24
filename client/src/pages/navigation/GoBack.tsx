import { useNavigate } from "react-router-dom"
import { IoChevronBack } from "react-icons/io5";

const GoBack = () => {
    const navigate = useNavigate()

    return (
        <div>
            <IoChevronBack onClick={() => navigate(-1)} />
        </div>
    )
}
export default GoBack