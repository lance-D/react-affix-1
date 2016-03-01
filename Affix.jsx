import React, { PropTypes, Component } from 'react';
import cn from 'classnames';

export default class Affix extends Component {

  state = {
    affixTop: true,
    affix: false,
    affixBottom: false
  }

  constructor(props) {
    super(props);

    this.updateAffix = this.updateAffix.bind(this)
  }

  /**
   * @return <void>
   */
  updateAffix() {
    let offsetTop = this.props.offsetTop();
    let offsetBottom = this.props.offsetBottom();
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (offsetBottom === offsetTop || !this.props.enable()) {
      this.setState({
        affix: false,
        affixBottom: false,
        affixTop: false
      });
    } else {
      this.setState({
        affix: scrollTop >= offsetTop && scrollTop <= offsetBottom,
        affixTop: scrollTop < offsetTop,
        affixBottom: scrollTop > offsetBottom
      });
    }
  }

  /**
   * @return <void>
   */
  componentDidMount() {
    window.addEventListener('scroll', this.updateAffix);
  }

  /**
   * @return <void>
   */
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

  /**
   * @return <void>
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateAffix);
  }

  render() {
    const { id, className } = this.props;

    return (
      <div ref={this.props.ref} id={id} className={cn(className, { affix: this.state.affix, 'affix-bottom': !this.state.affix && this.state.affixBottom, 'affix-top': !this.state.affix && this.state.affixTop })}>
        {this.props.children}
      </div>
    );
  }

}
