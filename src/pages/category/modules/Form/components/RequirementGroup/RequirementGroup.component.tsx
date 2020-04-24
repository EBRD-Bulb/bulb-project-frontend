import React from 'react';
import { RequirementGroup as OCDSRequirementGroup } from 'ts4ocds/extensions/requirements';
import { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { FieldSet } from 'formfish';

import { sortById } from 'utils';

import { HiddenRequirement } from '../HiddenRequirement';
import { Requirement } from '../Requirement';

// Another incrorrectly written interface
// @ts-ignore
interface RequirementGroupProps extends OCDSRequirementGroup {
  requirements: RequirementWithOptionDetails[];
}

export const RequirementGroup: React.FC<
  RequirementGroupProps & {
    isActive: boolean;
    setActive: (id: string) => void;
  }
> = ({ isActive, setActive, id, description, requirements }) => {
  const hasSingleRequirement = () => requirements.length === 1;

  const Title = (
    <Flex alignment={{ vertical: 'center' }}>
      <Text
        color={isActive ? 'var(--c-primary)' : 'var(--c-darkest)'}
        isActive={isActive}
        // `Text` props declaration is broken, so had to ignore the `appearance` error
        // @ts-ignore
        appearance="bold"
      >
        {description || requirements[0].title}
      </Text>

      {hasSingleRequirement() && isActive && (
        // Component here seems to think it's a NumberRequirement only
        // @ts-ignore
        <FieldSet name={id}>
          <Requirement
            {...{
              ...requirements[0],
              title: '',
              expectedValue: requirements[0].dataType === 'boolean' ? true : undefined,
            }}
          />
        </FieldSet>
      )}
    </Flex>
  );

  return (
    <Flex margin={{ top: 'regular' }}>
      <Dropdown isDefaultOpen={isActive} onChange={() => setActive(id)} title={Title}>
        <FieldSet name={id}>
          {!hasSingleRequirement() ? (
            <>
              <HiddenRequirement {...requirements[0]} />

              {requirements
                .slice(1)
                .sort(sortById)
                .map((requirement) => (
                  <Requirement {...requirement} key={requirement.id} />
                ))}
            </>
          ) : (
            <Text>Proceed to the next step</Text>
          )}
        </FieldSet>
      </Dropdown>
    </Flex>
  );
};