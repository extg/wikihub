import React, {Component} from 'react'
import cn from 'classnames'

import css from './MobileAdvancedSearch.scss'

class MobileAdvancedSearch extends Component {
  state = {
    isOpen: false,
  }

  onClickToggler = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    const {children} = this.props
    const {isOpen} = this.state

    return (
      <div className={cn(css.root, {[css.open]: isOpen})}>
        <div className={css.content}>
          {children}
        </div>
        <span className={css.toggler} onClick={this.onClickToggler}>
          {isOpen ? 'Скрыть расширенный поиск' : 'Расширенный поиск'}
        </span>
      </div>
    )
  }
}

export default MobileAdvancedSearch
