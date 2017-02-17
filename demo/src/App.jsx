import React, { PureComponent } from 'react';

import Main from './Main';
import Side from './Side';

const headerStyle = {
  margin: '20px 10px',
  fontSize: '20px'
};

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header style={headerStyle}>
              Fake Header Section
              <hr />
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8">
            <Main />
          </div>
          <div className="col-xs-4">
            <Side />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
