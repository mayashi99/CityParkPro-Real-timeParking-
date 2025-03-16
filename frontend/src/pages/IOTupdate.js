import React from "react";
import "../styles/IOTupdate.css";

const IOTupdate = () => {
  const cards = [
    { value: 150, label: "Total Booking", icon: "📖", color: "bg-teal-500" },
    {
      value: 53,
      label: "Total Parking Slot",
      icon: "🅿️",
      color: "bg-green-500",
    },
    { value: 53, label: "Total Vehicles", icon: "🚗", color: "bg-blue-500" },
    {
      value: 53,
      label: "Total Vehicle Owner",
      icon: "👥",
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="body">
    <div className="dashboard-container">
      <div className="nav">
        <ul>
          <li>
            <a class="active" href="#home">
              Home
            </a>
          </li>
          <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </div>

      <div className="box">
        {cards.map((card, index) => (
          <div key={index} className={`card ${card.color}`}>
            <div className="card-value">{card.value}</div>
            <div className="card-label">{card.label}</div>
            <div className="card-icon">{card.icon}</div>
            <button className="card-button">More info →</button>
          </div>
        ))}
      </div>

      <div className="tabale">
        <table id="customers">
          <tr>
            <th>Vehicle Plate NO</th>
            <th>Check-IN</th>
            <th>Redirect</th>
          </tr>
          <tr>
            <td>PQ3009</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>ABC4090</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>KW6009</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>UY8907</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>MN2030</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>BCD8009</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    </div>
  );
};

export default IOTupdate;
