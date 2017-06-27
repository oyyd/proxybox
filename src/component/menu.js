import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { func, array } from 'prop-types'

class MenuExampleTabular extends Component {
  constructor(props) {
    super(props)

    this.handleItemClick = this.handleItemClick.bind(this)

    this.state = {
      activeItem: props.menus[0].id,
    }
  }

  handleItemClick(id) {
    this.setState({ activeItem: id })
    this.props.onChange(id)
  }

  render() {
    const { handleItemClick } = this
    const { activeItem } = this.state
    const { menus } = this.props

    return (
      <Menu
        tabular
      >
        {menus.map(item => (
          <Menu.Menu
            key={item.id}
            name={item.name}
            active={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </Menu>
    )
  }
}

MenuExampleTabular.propTypes = {
  menus: array.isRequired,
  onChange: func.isRequired,
}

export default MenuExampleTabular
