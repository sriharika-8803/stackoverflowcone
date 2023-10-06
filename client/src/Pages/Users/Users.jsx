import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom'
import './User.css'
import UsersList from './UsersList'


const Users = () => {

  const location = useLocation()
  //console.log(location);

  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className="home-container-2" style={{marginTop: '30px'}}>
            {
              location.pathname === '/Users' ?
              <>
              <h1 style={{fontWeight:'400'}}>Users</h1>
              <UsersList />
              </> :
              <></>
            }
        </div>
    </div>
  )
}

export default Users
