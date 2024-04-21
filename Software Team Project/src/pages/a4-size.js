import React, { useEffect } from 'react';
import { useState } from 'react';
import './a4-size.css'; // Import your CSS file

const A4Size = () => {
    // Mock data
    const mockdata = [
      { id: 1, content: 'Data 1' },
      { id: 2, content: 'Data 2' },
      { id: 3, content: 'Data 3' },
      { id: 4, content: 'Data 4' },
      { id: 5, content: 'Data 5' },
      { id: 6, content: 'Data 6' },
      { id: 7, content: 'Data 7' },
      { id: 8, content: 'Data 7' },
      { id: 9, content: 'Data 7' },
      { id: 10, content: 'Data 7' },
      // Add more mock data as needed
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(mockdata)
    }, [])
  
  // Split data into groups of 4
  const groupsOfFour = [];
  for (let i = 0; i < data.length; i += 4) {
    groupsOfFour.push(data.slice(i, i + 4));
  }

  window.print()

  return (
    <div>
      {groupsOfFour.map((group, index) => (
        <div className="a4-page" key={index}>
          <div className="grid-container">
            {group.map((item, idx) => (
              <div className="box" key={idx}>
                {item.content}
                <p>Address</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default A4Size;