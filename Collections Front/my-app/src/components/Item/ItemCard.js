import { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography, Badge } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import useLikeItem from '../../Hooks/useLikeItem';
import AuthorizationContext from '../../store/authorization-context';
import DataContext from '../../store/data-context';

const ItemCard = (props) => {
  const navigate = useNavigate();
  const gotoItemPage = (path) => {
    navigate(`/items/${path}`);
  };

  const { mutate: likeHandlerApi } = useLikeItem();
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useContext(AuthorizationContext);
  const dataCtx = useContext(DataContext);
  const { theme } = dataCtx;

  return (
    <Card
      onClick={(e) => {
        gotoItemPage(props._id);
      }}
      elevation={12}
      sx={props.cardClass}
    >
      <CardContent>
        <Typography
          sx={{
            fontFamily: 'Quicksand',
            fontSize: '1.5em',
            fontWeight: '800',
            borderBottom: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            paddingBottom: '2px',
            width: '90%',
          }}
        >
          {props.name}
        </Typography>
        {props.author ? (
          <Box>
            <Typography
              sx={{
                marginTop: '15px',
                fontSize: '0.8em',
                fontFamily: 'Quicksand',
              }}
            >
              Author:
            </Typography>
            <Typography
              sx={{
                fontWeight: '600',
                fontFamily: 'Quicksand',
                fontSize: '1.5em',
              }}
            >
              {props.author}
            </Typography>
          </Box>
        ) : null}

        <Typography
          sx={{ marginTop: '15px', fontSize: '0.8em', fontFamily: 'Quicksand' }}
        >
          Collection:
        </Typography>

        <Typography
          sx={{
            padding: 0,
            fontWeight: '600',
            fontFamily: 'Quicksand',
            fontSize: '1.5em',
            marginBottom: '1.2rem',
          }}
          gutterBottom
        >
          {props.collection}
        </Typography>

        {isLoggedIn && (
          <Box
            sx={{
              padding: 0,
              margin: 0,
              width: '100%',
              justifyContent: 'end',
              display: 'flex',
            }}
          >
            <Box
              onClick={(e) => {
                e.stopPropagation();
                likeHandlerApi(props.itemId, token).then(props.refetch());
              }}
              sx={
                theme === 'light'
                  ? {
                      width: '25px',
                      borderRadius: '8px',
                      border: 'solid 1px secondar.dark',
                      background: '#1A373C',
                      display: 'flex',
                      justifyContent: 'center',
                      letterSpacing: 1,
                      paddingX: '25px',
                      paddingY: '10px',
                      textTransform: 'none',
                      fontSize: '1em',
                      '&:hover': {
                        color: '#A2CDCB',
                        background: '#1A373C',
                        boxShadow: 5,
                        transition: 'all 0.3s ease 0s',
                        transform: 'translateY(-1px)',
                      },
                    }
                  : {
                      width: '25px',
                      borderRadius: '8px',
                      border: 'solid 1px secondar.dark',
                      background: '#413F42',
                      display: 'flex',
                      justifyContent: 'center',
                      letterSpacing: 1,
                      paddingX: '25px',
                      paddingY: '10px',
                      textTransform: 'none',
                      fontSize: '1em',
                      '&:hover': {
                        color: '#A2CDCB',
                        background: '#302E31',
                        boxShadow: 5,
                        transition: 'all 0.3s ease 0s',
                        transform: 'translateY(-1px)',
                      },
                    }
              }
            >
              <Badge
                sx={
                  theme === 'light'
                    ? {
                        '& .MuiBadge-badge': {
                          color: '#55a693',
                          fontSize: '1rem',
                        },
                      }
                    : {
                        '& .MuiBadge-badge': {
                          color: '#55a693',
                          fontSize: '1rem',
                        },
                      }
                }
                badgeContent={props.likes}
              >
                {props.isLiked && (
                  <FavoriteIcon
                    sx={
                      theme === 'light'
                        ? {
                            color: '#55a693',
                            '&:hover': {
                              color: '#A2CDCB',
                              cursor: 'pointer',
                            },
                          }
                        : {
                            color: '#55a693',
                            '&:hover': {
                              color: '#A2CDCB',
                              cursor: 'pointer',
                            },
                          }
                    }
                  />
                )}

                {!props.isLiked && (
                  <FavoriteBorderIcon
                    sx={{
                      color: '#55a693',
                      '&:hover': {
                        color: '#A2CDCB',
                        cursor: 'pointer',
                      },
                    }}
                  />
                )}
              </Badge>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
