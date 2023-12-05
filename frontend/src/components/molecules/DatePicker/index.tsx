import React, { useRef, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Popover, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import theme from '@src/theme/theme';
import { DAYS_OF_WEEK } from '@src/utils/constants';
import Icon from '@components/atoms/Icon';
import ChevronDownIcon from '../../../../public/assets/icons/chevron-down.svg';
import ChevronUpIcon from '../../../../public/assets/icons/chevron-up.svg';
import CloseIcon from '../../../../public/assets/icons/close.svg';
import { Typography } from '@components/atoms/Typography';
import 'dayjs/locale/en';
import dayjs from 'dayjs';

export interface IDatePickerProps {
  label: string;
  date: string;
  setDatelabel: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handleSelectedEmptyStartDate?: boolean;
  handleSelectedEmptyEndDate?: boolean;
  boxWidth?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = ({
  label,
  date,
  setDatelabel,
  setDate,
  handleSelectedEmptyEndDate,
  handleSelectedEmptyStartDate,
  boxWidth,
  minDate,
  maxDate
}: IDatePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const dayOfWeekFormatterHandler = (dayOfWeek: string) =>
    DAYS_OF_WEEK.get(dayOfWeek) ?? '';

  const dateCalendarChangeHandler = (val: string | null) => {
    const date = val === '' ? undefined : new Date(val as string);
    if (setDate) setDate(date);
    if (date) {
      const month = new Intl.DateTimeFormat('en', {
        month: 'long'
      }).format(date);
      setDatelabel(`${date.getDate()} ${month} ${date.getFullYear()}`);
    }
    setAnchorEl(null);
    setOpenDatePicker(false);
  };

  const handleCloseDatePicker = () => {
    setAnchorEl(null);
    if (handleSelectedEmptyStartDate || handleSelectedEmptyEndDate) {
      dateCalendarChangeHandler('');
    }
    setDatelabel(label);
    setOpenDatePicker(false);
  };

  const handleOpenDatePicker = () => {
    setAnchorEl(datePickerRef.current);
    setOpenDatePicker(!openDatePicker);
  };
  const formatDate = (date: Date | undefined) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    }
  };
  const generateEndIcon = () => {
    if (date === label) {
      if (anchorEl !== null && openDatePicker) {
        return <Icon src={ChevronUpIcon} alt="chevron-up" />;
      } else {
        return (
          <Icon
            src={ChevronDownIcon}
            onClick={handleOpenDatePicker}
            alt="chevron-down"
          />
        );
      }
    } else {
      return (
        <Icon
          src={CloseIcon}
          alt="close-icon"
          onClick={handleCloseDatePicker}
        />
      );
    }
  };

  const id = openDatePicker ? 'date-picker-popover' : undefined;

  const datePickerStyles = {
    background: theme.palette.grey[400],
    color: theme.palette.textColor.white,

    '.MuiPickersCalendarHeader-root': {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'space-around'
    },
    '.MuiPickersCalendarHeader-label': {
      textAlign: 'center',
      color: theme.palette.textColor.white,
      fontFamily: 'Manrope-Regular',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '22px'
    },
    '.css-14ngtn2-MuiButtonBase-root-MuiPickersDay-root': {
      color: theme.palette.textColor.white,
      fontFamily: 'Manrope-Regular',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '22px'
    },
    '.MuiPickersArrowSwitcher-root': {
      display: 'inline-flex',
      marginLeft: '-12px'
    },
    '.MuiPickersArrowSwitcher-spacer': {
      width: '250px'
    },
    '.MuiPickersCalendarHeader-root:first-child': {
      order: 0,
      paddingRight: '20px',
      paddingLeft: '20px'
    },

    '.css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button':
      {
        color: theme.palette.textColor.mediumEmphasis
      },
    '.css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button.Mui-disabled':
      {
        color: theme.palette.textColor.mediumEmphasis
      },
    '.css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel': {
      color: theme.palette.textColor.mediumEmphasis,
      fontFamily: 'Manrope-Regular',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '22px'
    },
    '.css-31ca4x-MuiPickersFadeTransitionGroup-root': {
      display: 'flex',
      position: 'absolute',
      paddingLeft: '100px',
      justifyContent: 'space-between'
    },
    '.css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button':
      {
        color: theme.palette.textColor.mediumEmphasis
      },
    '.css-14ngtn2-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
      borderRadius: '2px',
      backgroundColor: theme.palette.grey[300]
    },
    '.css-1qw4l3v-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)':
      {
        color: theme.palette.textColor.mediumEmphasis
      },
    '.MuiDayCalendar-header > span': {
      color: theme.palette.textColor.highEmphasis
    },
    '.css-14ngtn2-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)':
      {
        color: theme.palette.textColor.lowEmphasis
      },
    '.css-1jba97o-MuiButtonBase-root-MuiPickersDay-root': {
      color: theme.palette.textColor.white,
      borderRadius: '0%',
      borderColor: theme.palette.grey[300]
    },
    '.css-1jba97o-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)': {
      borderRadius: '2px',
      borderColor: theme.palette.grey[300],
      backgroundColor: theme.palette.grey[300]
    },
    '.css-1qw4l3v-MuiButtonBase-root-MuiPickersDay-root': {
      color: theme.palette.textColor.lowEmphasis
    }
  };
  return (
    <>
      <Box
        ref={datePickerRef}
        data-testid="datepicker-container"
        width={boxWidth}
        height={'2.7vw'}
        sx={{
          cursor: 'pointer',
          border: `1px solid ${theme.palette.grey[100]}`,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '0.58vw',
          paddingRight: '0.58vw',
          ...(date !== label && {
            backgroundColor: theme.palette.primary[100]
          })
        }}
      >
        <Stack direction={'row'} gap={theme.spacing(2)}>
          <Typography variant="body1" color={theme.palette.textColor.black}>
            {date}
          </Typography>
          {generateEndIcon()}
        </Stack>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <Popover
          sx={{
            marginTop: '0.7vw'
          }}
          id={id}
          open={openDatePicker}
          onClose={() => setOpenDatePicker(!openDatePicker)}
          anchorEl={anchorEl}
          disableAutoFocus={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <DateCalendar
            onChange={dateCalendarChangeHandler}
            disableHighlightToday
            disableFuture
            sx={datePickerStyles}
            showDaysOutsideCurrentMonth
            dayOfWeekFormatter={dayOfWeekFormatterHandler}
            minDate={
              minDate && (dayjs(formatDate(minDate)) as unknown as string)
            }
            maxDate={
              maxDate && (dayjs(formatDate(maxDate)) as unknown as string)
            }
          />
        </Popover>
      </LocalizationProvider>
    </>
  );
};
