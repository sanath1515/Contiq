import React, { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radiobutton from '../../atoms/RadioButton';
import { Typography } from '../../atoms/Typography';
import theme from '../../../theme/theme';
import { CHOOSE_OPTIONS } from '../../../utils/constants';

interface RadioGroupProps {
  formLabel: string;
  options: string[];
}

const RadioButtonsGroup = (props: RadioGroupProps) => {
  const [selected, setSelected] = useState(CHOOSE_OPTIONS[1]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  const labelStyling = {
    color: theme.palette.textColor.white,
    paddingBottom: theme.spacing(2)
  };
  const selectedTextVarient = (option: any) => {
    return selected == option ? 'body1' : 'body2';
  };
  const radioLabelStyling = {
    paddingRight: theme.spacing(3)
  };

  return (
    <FormControl>
      <FormLabel>
        <Typography variant="body2" sx={labelStyling}>
          {props.formLabel}
        </Typography>
      </FormLabel>
      <RadioGroup
        row
        name="radio-buttons-group"
        value={selected}
        onChange={handleOptionChange}
        sx={{
          marginLeft:"0.7vw"
        }}
      >
        {props.options.map((option) => (
          <Radiobutton
            key={option}
            label={
              <Typography
                variant={selectedTextVarient(option)}
                sx={{
                  color:
                    selected == option
                      ? theme.palette.textColor.white
                      : theme.palette.textColor.highEmphasis,
                  ...radioLabelStyling
                }}
              >
                {option}
              </Typography>
            }
            value={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
