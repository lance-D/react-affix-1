import React, { PureComponent } from 'react';

// Import Lib
import Affix from '../../index';

const style = {
  height: '150px',
  width: '100%',
  background: '#343bcc',
  color: '#fff',
  fontSize: '16px',
  padding: '16px',
};

/**
 * Side Component
 * @param {Object} props
 * @returns {React.Component}
 */
export default class Side extends PureComponent {
  render() {
    return (
      <Affix
        enable={() => true}
        offsetBottom={() => {
          window.offset
        }}
        offsetTop={() => {
        }}
      >
        <div
          className="side"
          style={style}
          ref={(ref) => {
            this.side = ref;
          }}
        >
          This will be affixed at some point
        </div>
      </Affix>
    );
  }
}
