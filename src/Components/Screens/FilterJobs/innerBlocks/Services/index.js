import React from 'react'
import PropTypes from 'prop-types'
import { sortedService } from 'Helpers/services'

import { ServicesList } from 'Components/Blocks'
import { InputBlock } from 'Components/UI'

import { Container, ListContainer, InputContainer } from './style'

const Services = ({
  text,
  popularData,
  data,
  onItemClick,
  filterProps,
  isSelectedAll,
  activeItems,
  onSelectAll,
}) => (
  <Container>
    <InputContainer>
      <InputBlock {...filterProps} />
    </InputContainer>
    <ListContainer>
      <ServicesList
        onClickItem={onItemClick}
        getServiceTitle={text.getCategoryTitle}
        activeItems={activeItems}
        title={text.popular}
        data={sortedService(popularData)}
        horizontal
      />
    </ListContainer>
    <ListContainer>
      <ServicesList
        onClickItem={onItemClick}
        getServiceTitle={text.getCategoryTitle}
        activeItems={activeItems}
        title={text.all}
        onSelectAll={onSelectAll}
        isSelectedAll={isSelectedAll}
        data={data}
      />
    </ListContainer>
  </Container>
)

Services.propTypes = {
  text: PropTypes.object.isRequired,
  data: PropTypes.array,
  popularData: PropTypes.array,
  onItemClick: PropTypes.func,
  activeItems: PropTypes.array,
  isSelectedAll: PropTypes.bool,
  onSelectAll: PropTypes.func,
  filterProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    animatedLine: PropTypes.bool,
  }),
}

export { Services }
