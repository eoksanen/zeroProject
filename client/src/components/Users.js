import React from 'react'

const Users = ({users, show}) => {


if(!show) return null

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                <tr>
                    <th>name</th>
                    <th>
                    username
                    </th>

                </tr>
                {users.allUsers.map(a =>
                    <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.username}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )

}

export default Users