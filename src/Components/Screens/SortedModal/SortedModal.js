import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'Components/UI'

import { Header, SortItem } from './innerBlocks'

import { Container, Content } from './style'

class SortedModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      sortedBy: props.value || '',
      isStartList: props.bool,
    }
  }

  handleSetSorted = type => this.setState({ sortedBy: type, isStartList: true })

  handleTargetValue = () =>
    this.setState(prevState => ({ isStartList: !prevState.isStartList }))

  handleSubmit = () => {
    const { onSubmit, navigate } = this.props
    const { sortedBy, isStartList } = this.state

    onSubmit(sortedBy, isStartList)
    navigate.hideModal()
  }

  render() {
    const { navigate, isHelpPage, t } = this.props
    const { sortedBy, isStartList } = this.state

    return (
      <Container>
        <Header onClickBack={navigate.hideModal} />
        <Content>
          <SortItem
            key={0}
            title={t('findJobPage.new')}
            isActive={sortedBy === 'new'}
            value={sortedBy === 'new' ? !isStartList : null}
            onClick={() => this.handleSetSorted('new')}
            onSwitchClick={this.handleTargetValue}
            activeText={t('common.on')}
            disableText={t('common.off')}
          />
          <SortItem
            key={1}
            title={t('findJobPage.distance')}
            isActive={sortedBy === 'distance'}
            value={sortedBy === 'distance' ? isStartList : null}
            onClick={() => this.handleSetSorted('distance')}
            onSwitchClick={this.handleTargetValue}
            activeText={`${t('findJobPage.closest')} ${t('common.on')}`}
            disableText={`${t('findJobPage.closest')} ${t('common.off')}`}
          />
          {isHelpPage ? (
            <>
              <SortItem
                key={2}
                title={t('findJobPage.rate')}
                value={sortedBy === 'rating' ? !isStartList : null}
                isActive={sortedBy === 'rating'}
                onClick={() => this.handleSetSorted('rating')}
                onSwitchClick={this.handleTargetValue}
                activeText={t('findJobPage.highToLow')}
                disableText={t('findJobPage.lowToHigh')}
              />
              <SortItem
                key={3}
                title={t('findJobPage.pros')}
                value={sortedBy === 'proStatus' ? !isStartList : null}
                isActive={sortedBy === 'proStatus'}
                onClick={() => this.handleSetSorted('proStatus')}
                onSwitchClick={this.handleTargetValue}
                activeText={t('common.on')}
                disableText={t('common.off')}
              />
              <SortItem
                key={4}
                title={t('findJobPage.verified')}
                value={sortedBy === 'verifiedStatus' ? isStartList : null}
                isActive={sortedBy === 'verifiedStatus'}
                onClick={() => this.handleSetSorted('verifiedStatus')}
                onSwitchClick={this.handleTargetValue}
                activeText={t('common.on')}
                disableText={t('common.off')}
              />
            </>
          ) : (
            <>
              <SortItem
                key={2}
                title={t('findJobPage.budget')}
                isActive={sortedBy === 'budget'}
                value={sortedBy === 'budget' ? !isStartList : null}
                onClick={() => this.handleSetSorted('budget')}
                onSwitchClick={this.handleTargetValue}
                activeText={t('findJobPage.highToLow')}
                disableText={t('findJobPage.lowToHigh')}
              />
              <SortItem
                key={3}
                title={t('findJobPage.expiryDate')}
                value={sortedBy === 'expiryDate' ? isStartList : null}
                isActive={sortedBy === 'expiryDate'}
                onClick={() => this.handleSetSorted('expiryDate')}
                onSwitchClick={this.handleTargetValue}
                activeText={`${t('findJobPage.closest')} ${t('common.on')}`}
                disableText={`${t('findJobPage.closest')} ${t('common.off')}`}
              />
            </>
          )}
        </Content>
        <Button
          visible={Boolean(sortedBy)}
          text={t('sign.submit')}
          linear
          onClick={this.handleSubmit}
        />
      </Container>
    )
  }
}

SortedModal.propTypes = {
  navigate: PropTypes.shape({
    hideModal: PropTypes.func.isRequired,
  }),
  isHelpPage: PropTypes.bool,
  value: PropTypes.string,
  bool: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
}

SortedModal.defaultProps = {
  bool: true,
}

export default SortedModal
