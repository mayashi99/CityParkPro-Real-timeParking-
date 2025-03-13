import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const navItems = [1, 2, 3, 4, 5]; // List of numbers you want to show in the navbar

  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
        {navItems.map((item) => (
          <li key={item} style={{ margin: '0 10px' }}>
            <a href={`#${item}`} style={{ textDecoration: 'none', color: 'black' }}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ParkingSlot = () => {
    const [floors, setFloors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/floors')
            .then(response => {
                setFloors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the floors!', error);
            });
    }, []);

    return (
        <div>
            <h1>Select Floors</h1>
            <ul>
                {floors.map(floor => (
                    <li key={floor._id}>{floor.floorNumber}</li>
                ))}
            </ul>
            <button>Continue</button>
        </div>
    );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <ParkingSlot />
    </div>
  );
};

export default App;
