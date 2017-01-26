import React, { PropTypes, Component } from 'react';

/**
 * @param {*} test
 * @returns {boolean}
 */
function isDefined(test) {
  return test !== 'undefined';
}

/**
 *
 * @param {Object} state
 * @param {String} className
 * @returns {String}
 */
function getAffixClassNames(state, className) {
  let affixClassNames = '';
  if (this.state.affix) {
    affixClassNames = ' affix';
  } else if (this.state.affixTop) {
    affixClassNames = ' affix-top';
  } else if (this.state.affixBottom) {
    affixClassNames = ' affix-bottom';
  }

  return `${className}${affixClassNames}`
}

/**
 * @param document
 * @returns {number}
 */
function getScrollTop() {
  if (isDefined(document.documentElement.scrollTop)) {
    return document.documentElement.scrollTop;
  }
  return document.body.scrollTop;
}

export default class Affix extends Component {

  static displayName = '@@react-affix/Affix';

  static propTypes = {
    offsetTop: PropTypes.func,
    offsetBottom: PropTypes.func,
    enable: PropTypes.func
  }

  state = {
    affixTop: true,
    affix: false,
    affixBottom: false
  }

  constructor(props) {
    super(props);

    this.updateAffix = this.updateAffix.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateAffix);
  }

  componentWillReceiveProps(nextProps) {
    // If affix needs to be disable, disable it here by resetting state
    if (!nextProps.enable()) {
      this.setState({
        affix: false
      });
    } else {
      this.updateAffix();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateAffix);
  }

  /**
   * @type {null|ref}
   */
  affix = null;

  /**
   * @return <void>
   */
  updateAffix() {
    let offsetTop = this.props.offsetTop();
    let offsetBottom = this.props.offsetBottom();
    let scrollTop = getScrollTop();

    if (offsetBottom === offsetTop || !this.props.enable()) {
      this.setState({
        affix: false,
        affixBottom: false,
        affixTop: false,
      });
    } else {
      this.setState({
        affix: scrollTop >= offsetTop && scrollTop <= offsetBottom,
        affixTop: scrollTop < offsetTop,
        affixBottom: scrollTop > offsetBottom,
      });
    }
  }

  enableAffix() {
    this.setState({
      affix: true,
    });
  }

  disableAffix() {
    this.setState({
      affix: false,
    });
  }

  render() {
    const {
      className,
      children,
      ...rest,
    } = this.props;

    return (
      <div
        {...rest}
        ref={(ref) => {
          this.affix = ref;
        }}
        className={getAffixClassNames(this.state, className)}
      >
        {children}
      </div>
    );
  }

}
