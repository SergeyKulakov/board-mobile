import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ServicesList } from 'Components/Blocks'
import { Button } from 'Components/UI'

import { Header } from './innerBlocks'
import { getText } from './config'
import { Container, Content } from './style'

class SubServicesModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeItems: props.activeItems,
      text: getText(),
    }
  }

  handleClickItem = item => {
    const { activeItems } = this.state

    if (activeItems.find(el => el._id === item._id)) {
      this.setState({
        activeItems: activeItems.filter(el => el._id !== item._id),
      })

      return
    }

    this.setState({ activeItems: activeItems.concat([item]) })
  }

  handleSubmit = () => {
    const { onSubmit, navigate } = this.props
    const { activeItems } = this.state

    onSubmit(activeItems)
    navigate.hideModal()
  }

  render() {
    const { data, navigate, categoryId, t } = this.props
    const { activeItems, text } = this.state

    const subServices = data.find(el => el._id === categoryId).subservices

    return (
      <Container>
        <Header onBackClick={navigate.hideModal} />
        <Content>
          <ServicesList
            activeItems={activeItems}
            data={subServices}
            title={text.listTitle}
            getServiceTitle={text.getCategoryTitle}
            onClickItem={this.handleClickItem}
          />
        </Content>
        <Button onClick={this.handleSubmit} linear>
          {t('subscriptionScreen.select')}
        </Button>
      </Container>
    )
  }
}

SubServicesModal.propTypes = {
  t: PropTypes.func,
  navigate: PropTypes.object,
  data: PropTypes.array,
  activeItems: PropTypes.array,
  categoryId: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default SubServicesModal
