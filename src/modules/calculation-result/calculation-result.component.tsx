import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import { useMedia } from 'shared/hooks';

import { ErrorBoundary, Container, Loader, Fade } from 'shared/components';
import { useCalculation } from 'shared/context/calculation';
import { useCategory } from 'core/context/category-provider';
import { Layout } from './layout';
import FilterIcon from '../../assets/icons/filter.inline.svg';

import Styled from './calculation-result.styles';

const CalculationResult: React.FC = () => {
  const isLg = useMedia('screen and (min-width: 832px)');
  const [isLoading, setLoading] = useState(true);

  const { calculationData, calculationPayload, dispatch } = useCalculation();

  const { availableVariants, requestedVariant } = calculationData ?? {};
  const itemsQuantity = useMemo(() => (availableVariants ?? []).length, [availableVariants?.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  const {
    category: { id: categoryId },
    version,
  } = useCategory();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      dispatch.addCalculationPayload(parsedData.payload);
      dispatch.addCalculationData(parsedData.response);
    }
    setLoading(false);
  }, []);

  return (
    <Fade>
      <ErrorBoundary>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {calculationPayload && availableVariants && (
              <>
                <Layout
                  itemsQuantity={itemsQuantity}
                  hasMany={hasMany}
                  availableVariants={availableVariants}
                  requestedVariant={requestedVariant}
                />

                {!isLg() && (
                  <Styled.MobileFilterButton onClick={() => setDrawerOpen(!isDrawerOpen)}>
                    <FilterIcon />
                  </Styled.MobileFilterButton>
                )}
              </>
            )}

            {(!calculationPayload || !availableVariants) && (
              <Container>
                <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
                  <Text color="negative">
                    На жаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для
                    цієї категорії ☹️
                  </Text>
                </Flex>
              </Container>
            )}
          </>
        )}
      </ErrorBoundary>
    </Fade>
  );
};

export default CalculationResult;
