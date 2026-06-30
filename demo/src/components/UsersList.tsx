import { useState, type MouseEvent } from 'react';
import users from './users.json'
import type { User } from './types';

type Props = {
    handleSelectedUser: (user: User) => void
}


function UsersList({ handleSelectedUser }: Props) {
    // const [user, setUser] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const handleClick = (user: User, e: MouseEvent<HTMLAnchorElement>) => {
        // event.preventDefault();
        // const name = (e.target as HTMLAnchorElement).innerText;
        setSelectedUser(user);
        handleSelectedUser(user);
        // console.log(user.address.city);
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div>
                    <h2>Users</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>

                            </tr>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <a href="#!" onClick={(e) => handleClick(user, e)}>
                                            {user.name}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {selectedUser && <pre>{JSON.stringify(selectedUser, null, 2)}</pre>}
                </div>
            </div>
        </>

    )
}

export default UsersList    