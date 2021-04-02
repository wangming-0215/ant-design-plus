import styled from '@emotion/styled';

import IconPaths from './IconPaths';

type FontSize = 'inherit' | 'small' | 'medium' | 'large' | number;

interface ISvgRootProps {
  fontSize?: FontSize;
  color?: string;
}

const SvgIconRoot = styled('svg')<ISvgRootProps>(
  ({ fontSize = 'inherit', color = 'inherit' }) => ({
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentcolor',
    flexShrink: 0,
    transition: 'fill 200ms',
    fontSize:
      typeof fontSize === 'number'
        ? fontSize
        : {
            inherit: 'inherit',
            small: 20,
            medium: 24,
            large: 35,
          }[fontSize],
    color,
  })
);

interface ISvgIconProps {
  fontSize?: FontSize;
  color?: `#${string}`;
  variant?: 'line' | 'fill';
  name: keyof typeof IconPaths;
  viewBox?: string;
}

const SvgIcon: React.FC<ISvgIconProps> = ({
  fontSize = 'inherit',
  color = 'inherit',
  variant = 'line',
  viewBox = '0 0  24 24',
  name,
}) => {
  const paths = IconPaths[name][variant];

  return (
    <SvgIconRoot fontSize={fontSize} color={color} viewBox={viewBox}>
      {paths.map((path, index) => (
        <path d={path} key={index} />
      ))}
    </SvgIconRoot>
  );
};

export default SvgIcon;
