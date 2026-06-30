import UsersList from './UsersList'
import { useState } from 'react'
import type { User } from './types'


function Users() {
    const [user, setUser] = useState<User | null>(null)

    const handleSelectedUser = (user: User) => {
        // console.log(user);
        setUser(user);
    }

    return (
        <>
            <pre style={{ backgroundColor: 'lightgray' }}    >{user && user.username}</pre>
            <UsersList handleSelectedUser={handleSelectedUser} />
        </>

    )
}

export default Users    