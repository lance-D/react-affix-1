import React from 'react';

const style = {
  height: '500px',
  margin: '0 20px 10px',
  padding: '16px',
  background: '#c33',
  color: '#fff',
  fontSize: '24px'
};

const paraStyle = {
  fontSize: '14px'
};

/**
 * Main Component
 * @param {Object} props
 * @returns {React.Component}
 */
const Main = (props) => (
  <div className="main">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div id={`#${item}`} key={item} style={style}>
        Section {item}
        <p style={paraStyle}>This is a two colum layout with an affixed nav bar</p>
      </div>
    ))}
  </div>
);

export default Main;
