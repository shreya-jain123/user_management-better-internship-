import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);
  const [name, setName] = useState('');

  
  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/users');
      
      setArray(response.data.users || response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  
  const handleAddUser = async () => {
    if (!name) return alert('Please enter a name');
    try {
      await axios.post('http://127.0.0.1:5000/api/users', { name: name });
      setName(''); 
      fetchAPI(); 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

 
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/users/${id}`);
      fetchAPI(); 
    } catch (error) {
      console.error('Error deleting user:', error);
      alert("Failed to delete user. Make sure Backend has DELETE route.");
    }
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1>User Management</h1>

          {/* --- Input Section --- */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Enter new user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                color: 'white',
                background: '#242424'
              }}
            />
            <button
              onClick={handleAddUser}
              style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Add User
            </button>
          </div>

          {/* --- User List Section (Fixed Display) --- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            {array.map((user, index) => (
              <div key={user.id || index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '300px', 
                background: '#333', 
                padding: '10px', 
                borderRadius: '8px' 
              }}>
                <span>👤 {user.name }</span>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  style={{ 
                    backgroundColor: 'red', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    padding: '2px 8px'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="counter" onClick={() => setCount((c) => c + 1)} style={{ marginTop: '20px' }}>
          Count is {count}
        </button>
      </section>
    </>
  );
}

export default App;
