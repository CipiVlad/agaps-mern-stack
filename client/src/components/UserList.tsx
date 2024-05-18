import React from "react"
import { useGetAllUsersQuery } from "../services/user"


const UserList: React.FC = () => {
    const { data, isLoading, error } = useGetAllUsersQuery()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div>
            <h1>User List</h1>
            {data?.map((user: any) => (
                <ul key={user._id} >
                    <li>
                        {user.email}
                    </li>
                </ul>
            ))}
        </div>
    )
}
export default UserList