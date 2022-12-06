import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import useGetSingleItem from '../../Hooks/useGetSingleItem';
import ItemCard from '../../components/Item/ItemCard';
import CommentList from '../Comment/CommenList';
import CommentContext from '../../store/comment-context';
import { card } from './styles/SingleItemSX';

const SingleItem = () => {
  const { itemId } = useParams();
  const {
    mutate: getSingleItem,
    fetchedItem,
    comments,
    likes,
    isLiked,
  } = useGetSingleItem();

  const userId = localStorage.getItem('userId');

  const { count, setCount } = useContext(CommentContext);
  const setCountHandler = () => {
    setTimeout(() => {
      setCount((p) => p + 1);
    }, 250);
  };

  useEffect(() => {
    getSingleItem(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        sx={{
          marginY: '75px',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}
        gap={5}
        container
      >
        <Grid item md={3} sx={{ height: '100%' }}>
          <ItemCard

            cardClass={card}
            name={fetchedItem.name}
            collection={fetchedItem.collectionName}
            author={fetchedItem.author}
            itemId={fetchedItem._id}
            _id={fetchedItem._id}
            refetch={setCountHandler}
            likes={likes}
            isLiked={isLiked}
          />
        </Grid>
        <Grid item md={6} sx={{ height: '100%' }}>
          <CommentList currentUserId={userId} comments={comments} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleItem;
