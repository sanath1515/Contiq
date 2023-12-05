import {
  Badge,
  Box,
  Button,
  ButtonProps,
  SxProps,
  styled
} from '@mui/material';
import theme from '@src/theme/theme';

export interface ButtonComponentProps extends ButtonProps {
  startIconPath?: string;
  name?: string;
  icon?: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  sx?: SxProps;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconHeight?: string;
  iconWidth?: string;
  testId?: string;
  badgeCount?: number;
  innerRef?: React.RefObject<Element>;
}

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    width: 12px;
    height: 12px;
  }
`;

export const ButtonWithIcon = (props: ButtonComponentProps) => {
  const StyledButton = styled(Button)({
    backgroundColor: props.backgroundColor,
    color: props.color,
    borderRadius: '.5rem',
    width: props.width,
    height: props.height,
    border: props.border,
    '&:hover': {
      backgroundColor: props.backgroundColor
    },
    maxWidth: theme.spacing(11)
  });
  return (
    <Box ref={props.innerRef}>
      <StyledButton
        data-testid={props.testId}
        type="button"
        variant={props.variant}
        sx={props.sx}
        name={props.name}
        onClick={props.onClick}
        disableTouchRipple
        disableRipple
      >
        <StyledBadge badgeContent={props.badgeCount} color={'error'}>
          <img
            src={props.startIconPath}
            alt={''}
            height={props.iconHeight}
            width={props.iconWidth}
          />
        </StyledBadge>
      </StyledButton>
    </Box>
  );
};

export default ButtonWithIcon;
