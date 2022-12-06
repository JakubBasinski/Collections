// import {  } from '@material-ui/core/';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ReactMarkdown from 'react-markdown';
import * as cls from './CollectionCardSX';

const CollectionCard = (props) => {
  return (
    <Card
      onClick={(e) => {
        props.onClick();
      }}
      sx={props.card}
    >
      
      <CardActionArea sx={props.cardActionImage}>
        {props.url ? (
          <CardMedia
            sx={cls.cardMediaBox}
            component="img"
            image={props.url}
            title=""
            alt={props.name}
          />
        ) : (
          <Box sx={cls.noImageBox}>
            <ImageNotSupportedIcon fontSize="large" />
          </Box>
        )}
      </CardActionArea>
      
      <CardActionArea sx={props.cardActionDetails}>
        <CardContent sx={props.cardContent}>
          <Typography sx={cls.header} variant="h4">
            {props.name}
          </Typography>

          <Typography
            sx={{ paddingLeft: '2px' }}
            variant="body2"
            component="p"
            gutterBottom
          >
            # {props.topic}
          </Typography>

          {props.description ? (
            <Box
              sx={{
                color: 'primary.light',
                fontSize: '1.1em',
                lineHeight: '110%',
                fontFamily: 'QuickSand',
              }}
            >
              <ReactMarkdown children={props.description} />
            </Box>
          ) : null}

          {props.authorName ? (
            <Typography
              sx={{ paddingLeft: '2px' }}
              variant="body2"
              component="p"
            >
              # {props.authorName}
            </Typography>
          ) : null}

          {props.informations ? (
            <Typography
              sx={cls.additionalInfoHeader}
              gutterBottom
              variant="body1"
              component="p"
            >
              Additional informations
            </Typography>
          ) : null}

          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {props.informations
              ? props.informations.map((info, index) => {
                  return info ? (
                    <Typography sx={cls.additionalInfo} key={'info' + index}>
                      {info}
                    </Typography>
                  ) : null;
                })
              : null}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;
