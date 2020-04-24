import React from 'react';

import Styled from '../../Card.styles';

export const ErrorCard = ({ updateCategoryData }: { updateCategoryData: () => void }) => {
  return (
    <Styled.BaseCard alignment={{ horizontal: 'center' }}>
      <button type="button" onClick={updateCategoryData}>
        <Styled.ReloadIcon />
      </button>
    </Styled.BaseCard>
  );
};