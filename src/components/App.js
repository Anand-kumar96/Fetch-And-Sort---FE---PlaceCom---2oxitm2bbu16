import React, { useState } from 'react'
import '../styles/App.css';


const App = () => {

  const [users, setUsersData] = useState([]);
  const [isLoading, setIsLoadingData] = useState(false);
  const [sortAscending, setSortAscendingData] = useState(true);  

  const fetchData = async () => {
    setIsLoadingData(true);
    const response = await fetch('https://content.newtonschool.co/v1/pr/main/users');
    const data = await response.json();
    setIsLoadingData(false);
    setUsersData(data);
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortAscending) {
        return a.name.length - b.name.length;
      } else {
        return b.name.length - a.name.length;
      }
    });
    setUsersData(sortedUsers);
    setSortAscendingData(!sortAscending);
  };

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchData}>Fetch User Data</button>
      <button className="sort-btn" onClick={handleSort}>
        {sortAscending ? "Sort by name length (ascending)" : "Sort by name length (descending)"}
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className='users-section'>
          {users.map(user => (
            <li key={user.id}>
              <section className='id-section'>{user.id}</section>
              <section className='name-email-section'>
                <p className='name'>Name: {user.name}</p>
                <p className='email'>Email: {user.email}</p>
              </section>
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;