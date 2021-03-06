import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';
import Flex from 'ustudio-ui/components/Flex';

// Must have had access to these styles only
// eslint-disable-next-line boundaries/allowed-types
import StyledCategories from 'modules/categories-list/categories-list.styles';

const CategoryListWrapper = styled(Flex)`
  align-items: center;

  min-height: 100vh;

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
`;

const Main = styled.main`
  overflow-y: auto;

  ${StyledCategories.Grid} {
    ${Mixin.Screen.xs(css`
      grid-auto-rows: minmax(calc(100vh / 3), auto);
    `)}
  }
`;

const Styled = { CategoryListWrapper, Main };

export default Styled;
