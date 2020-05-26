import React, { useCallback, useMemo } from 'react';
import { css } from 'styled-components';

import type { Metric, Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { formatNumber } from 'utils';

import Styled from './Metrics.styles';

export const Metrics = ({
  metrics,
  showTitles,
  hoveredObservation,
  setHoveredObservation,
}: {
  metrics: Metric[];
  showTitles: boolean;
  hoveredObservation: string;
  setHoveredObservation: (id: string) => void;
}) => {
  const getObservationUnit = useCallback((observation: Observation) => {
    if (observation.value) {
      return observation.value.currency;
    }
    if (observation.unit) {
      return observation.unit.name;
    }

    return '';
  }, []);

  const isLg = useMediaQuery('screen and (min-width: 832px)');
  const areTitlesShown = useMemo(() => !isLg || showTitles, [isLg, showTitles]);

  return (
    <Styled.Metrics direction="column">
      {metrics.map((metric) => (
        <Styled.Metric key={metric.id} direction="column">
          <Flex margin={{ bottom: 'regular' }}>
            <Text
              variant="caption"
              styled={{
                Text: areTitlesShown
                  ? css``
                  : css`
                      color: transparent;
                      user-select: none;
                      pointer-events: none;
                    `,
              }}
            >
              {metric.title}
            </Text>
          </Flex>

          {metric.observations.map((observation) => (
            <Styled.Observation
              key={observation.id}
              margin={{ bottom: 'regular' }}
              alignment={areTitlesShown ? undefined : { horizontal: 'center' }}
              onMouseEnter={() => setHoveredObservation(observation.id)}
              onMouseLeave={() => setHoveredObservation('')}
            >
              {areTitlesShown && (
                <Styled.ObservationTitle>
                  <Text variant="small" color="var(--c-dark)">
                    {observation.notes}
                  </Text>
                </Styled.ObservationTitle>
              )}

              <Styled.ObservationMeasure variant="small" align="center">
                {typeof observation.measure === 'number' ? formatNumber(observation.measure) : observation.measure}
                {formatNumber(observation.value?.amount)} {getObservationUnit(observation)}
              </Styled.ObservationMeasure>

              {isLg && metric.id !== 'economy' && (
                <Styled.Highlight isHovered={hoveredObservation === observation.id} />
              )}
            </Styled.Observation>
          ))}
        </Styled.Metric>
      ))}
    </Styled.Metrics>
  );
};