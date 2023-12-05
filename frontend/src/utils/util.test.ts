import {
  getIconSrc,
  generateFileTypeOptions,
  generatePublishSettingOptions,
  handleTestClick
} from './utils';
import { FILES } from './constants';

describe('test utility functions', () => {
  it('should return chevron-up.svg when isOpen is true and label matches specific values', () => {
    expect(getIconSrc(true, FILES.FILE_TYPE)).toBe('chevron-up.svg');
  });

  it('should return close.svg when isOpen is false and label does not match specific values', () => {
    expect(getIconSrc(false, 'SomeOtherLabel')).toBe('close.svg');
  });

  it('should return chevron-down.svg for other cases', () => {
    expect(getIconSrc(true, 'SomeOtherLabel')).toBe('chevron-down.svg');
  });

  it('should generate options with correct labels and onClick handlers', () => {
    const handleOptionFileTypeClick = jest.fn();
    const options = generateFileTypeOptions(handleOptionFileTypeClick);
    expect(options).toHaveLength(3);
    expect(options[0].label).toBe(FILES.PDF);
    expect(options[1].label).toBe(FILES.PPT);
    expect(options[2].label).toBe(FILES.IMAGE);
  });

  it('should generate options with correct labels and onClick handlers', () => {
    const handleOptionPublishClick = jest.fn();
    const options = generatePublishSettingOptions(handleOptionPublishClick);

    expect(options).toHaveLength(3);
    expect(options[0].label).toBe(FILES.PUBLISHED_BY_ME);
    expect(options[1].label).toBe(FILES.PUBLISHED_SALES);
    expect(options[2].label).toBe(FILES.PUBLISHED_OTHERS);
  });
});
