import { FaEdit } from "react-icons/fa";
import Container from "../../../component/Container";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../provider/AuthProvider";


const UserList = () => {

    const { user: current } = useContext(AuthContext)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUser()
    }, [])
    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
            setUsers(response.data)
        } catch (error) {

            console.log("🚀 ~ getUser ~ error:", error)
        }
    }

    const currentUser = users?.filter(u => u?.email === current?.email)

    const handleChange = (e, userID) => {

        const role = { role: e.target.value }
        console.log("🚀 ~ handleChange ~ e.target.value:", role)
        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/${userID}`, role)
            .then(response => {
                getUser()
                console.log(response.data)
            })
            .catch(error => console.error(error));
    }

    return (
        <Container>
            <h2 className="text-blue-300 text-2xl font-bold">Total User: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            {currentUser?.length > 0 && currentUser?.[0].role === 'host' && <th>Edit Role</th>}
                            {currentUser?.length > 0 && currentUser?.[0].role === 'host' && <th>Delete</th>}


                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {users?.map((user, inx) => <tr key={user?._id}>
                            <th>
                                {inx + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user?.photos}
                                                alt="user photo" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user?.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user?.email}
                            </td>
                            {currentUser?.length > 0 && currentUser?.[0].role === 'host' ?
                                (user?.role === 'host' ?
                                    (<td><span className="badge badge-secondary">{user?.role}</span></td>) :
                                    (
                                        <select
                                            className="select select-bordered select-sm w-full max-w-xs"
                                            value={user?.role}
                                            onChange={(e) => handleChange(e, user?._id)}
                                            defaultValue={user?.role}
                                        >

                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    ))
                                : (<td><span className="badge badge-secondary">{user?.role}</span></td>)}

                            {currentUser?.length > 0 && currentUser?.[0].role === 'host' && <td className="text-xl"><FaEdit /></td>}
                            {currentUser?.length > 0 && currentUser?.[0].role === 'host' && <td className="text-3xl text-red-600"><MdDelete /></td>}



                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default UserList;