import { Typography } from '../../../components/atoms/Typography';
import { Box, Grid, styled } from '@mui/material';
import { ImageData } from '../../../utils/interfaces/ImageData';
import { SearchData } from '../../../utils/interfaces/SearchData';
import Icon from '@components/atoms/Icon';
import theme from '@src/theme/theme';
import { SEARCH_RESULT, OTHER_DOCUMENTS } from '@src/utils/constants';

interface SearchResultsProps {
  SEARCH_DATA: SearchData[];
  IMAGES: ImageData[];
  onSearchClick: (id: number, keyword: string, fileName: string) => void;
  onDocumentClick: (id: number) => void;
  searchWord: string;
  setShowPopup: boolean;
}
const StyledBox = styled(Box)({
  height: theme.spacing(70.5),
  width: theme.spacing(88),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.textColor.white,
  boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.15)',
  overflowY: 'auto',
  flex: 1,
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '1.02vw'
  },
  '&::-webkit-scrollbar-track': {
    background: '#F0F0F0',
    borderRadius: theme.spacing(3)
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#D9D9D9',
    borderRadius: theme.spacing(3),
    width: '0.44vw',
    height: '14.34vw',
    border: ' 4px solid transparent',
    backgroundClip: 'content-box'
  }
});
const TextContainer = styled(Box)({
  padding: '10px'
});
const SearchResults = (props: SearchResultsProps) => {
  return (
    <>
      {props.setShowPopup && (
        <StyledBox sx={{ width: '25.75vw' }}>
          <TextContainer>
            <Grid container direction={'column'} gap={3} paddingLeft={3}>
              <Grid item>
                <Grid container direction={'column'} gap={2}>
                  <Grid item>
                    <Typography variant="body1">{SEARCH_RESULT}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction={'column'} gap={3}>
                      {props.SEARCH_DATA.map((file) => {
                        return (
                          file.fileName
                            .toLowerCase()
                            .includes(
                              props.searchWord.toLowerCase().trim()
                            ) && (
                            <Grid
                              item
                              key={file.id}
                              sx={{ cursor: 'pointer' }}
                              onClick={() => {
                                props.onSearchClick(
                                  file.id,
                                  file.keyword,
                                  file.fileName
                                );
                              }}
                            >
                              <Typography
                                variant="body2"
                                color={theme.palette.textColor.lowEmphasis}
                              >
                                {file.fileName}
                              </Typography>
                            </Grid>
                          )
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction={'column'} gap={4}>
                  <Grid item>
                    <Typography variant="body1">{OTHER_DOCUMENTS}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container gap={4}>
                      {props.IMAGES.map((path) => {
                        return (
                          <Grid
                            item
                            key={path.id}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              props.onDocumentClick(path.id);
                            }}
                          >
                            <Icon
                              src={path.imageName}
                              alt={'image'}
                              style={{
                                width: '10.68vw'
                              }}
                            ></Icon>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TextContainer>
        </StyledBox>
      )}
    </>
  );
};

export default SearchResults;
