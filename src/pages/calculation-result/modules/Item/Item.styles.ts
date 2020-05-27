import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';
import { itemWidth } from '../../CalculationResult.module';

import { EfficiencyClass as EfficiencyClassType, efficiencyClasses, getEfficiencyColor } from './Item.module';

const ImageContainer = styled(Flex)`
  position: relative;

  justify-content: space-between;
  flex-shrink: 0;

  width: 100%;

  padding: var(--i-regular) 0 var(--i-medium);

  object-fit: cover;
`;

const Image = styled.img`
  position: absolute;

  top: 0;
  left: 50%;

  transform: translateX(-50%);

  height: 100%;
  width: auto;
`;

const EfficiencyClass = styled(Flex)<{ efficiencyClass: EfficiencyClassType; trianglePosition: 'left' | 'right' }>(
  ({ efficiencyClass, trianglePosition }) => {
    const classIndex = Object.keys(efficiencyClasses).indexOf(efficiencyClass);
    const isSeparate = trianglePosition === 'right';
    const labelHeight = isSeparate ? 36 : 24;

    return css`
      align-items: center;

      position: relative;
      
      z-index: 2;

      width: ${isSeparate ? 40 : 40 + classIndex * 4}px;
      height: ${labelHeight}px;

      padding-${trianglePosition}: var(--i-medium);

      background: ${getEfficiencyColor(efficiencyClass)};

      color: var(--c-white);

      pointer-events: none;
      user-select: none;

      &:before {
        content: '';

        position: absolute;

        border: ${labelHeight / 2}px solid transparent;
        border-${trianglePosition}: ${labelHeight / 2}px solid ${
      isSeparate ? 'var(--c-darkest)' : getEfficiencyColor(efficiencyClass)
    };

        ${trianglePosition}: 100%;
      }

      ${
        isSeparate
          ? css`
              margin-top: ${classIndex * (labelHeight / 1.5) + classIndex / 2 - 3}px;
              background: var(--c-darkest);
            `
          : ``
      };
  `;
  }
);

const EfficiencyClassesList = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    margin: 0.5px 0;
  }
`;

const Economy = styled(Flex)<{ $backgroundColor: string }>(
  ({ $backgroundColor }) => css`
    align-items: center;

    padding: var(--i-medium);
    margin-top: var(--i-small);

    background-color: ${`var(--c-${$backgroundColor})`};
    color: var(--c-light);

    pointer-events: none;
    user-select: none;
  `
);

const EconomyContainer = styled.div`
  display: inline-flex;
  flex-direction: column;

  position: relative;

  z-index: 2;

  min-width: 40%;
  max-width: 195px;
`;

const EconomyMeasure = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  margin-left: var(--i-regular);

  width: 45%;
`;

const EconomyTimesMeasure = styled(Text)`
  ${Mixin.Font.h2()};

  line-height: 1;
`;

const EconomyNote = styled(Text)`
  width: 55%;

  line-height: 1.5;
`;

const EconomyUnit = styled(Text)`
  margin-top: -4px;
`;

const BoldText = styled(Text)`
  font-weight: 700;
`;

const Item = styled(Flex)`
  position: relative;

  min-width: ${itemWidth}px;

  flex-shrink: 0;

  @media screen and (min-width: 798px) {
    ${ImageContainer} {
      height: 190px;
    }
  }

  &:not(:last-child) {
    border-right: 1px solid var(--c-light);
  }

  ${ImageContainer} {
    height: 240px;
  }
`;

const Content = styled(Flex)``;

const ItemDescription = styled(Flex)`
  flex-direction: column;
  align-items: center;

  margin-bottom: var(--i-regular);
`;

const Classifications = styled(Flex)`
  margin-bottom: var(--i-large);
`;

const AdditionalClassification = styled(Flex)`
  &:not(:last-child) {
    padding-bottom: var(--i-regular);
  }
`;

export default {
  Item,
  ImageContainer,
  Image,
  Content,
  ItemDescription,
  Classifications,
  AdditionalClassification,
  EfficiencyClass,
  EfficiencyClassesList,
  Economy,
  EconomyContainer,
  EconomyMeasure,
  EconomyTimesMeasure,
  EconomyNote,
  EconomyUnit,
  BoldText,
};
