import { Grid } from '@mui/material';
import ItemCard from '../../components/Item/ItemCard';
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useContext } from 'react';
import classes from './PaginatedItems.module.css';
import { card } from './styles/SingleItemSX';
import DataContext from '../../store/data-context';

const PaginatedItemList = (props) => {
  const userId = localStorage.getItem('userId');
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const dataCtx = useContext(DataContext);
  const { setRefetch } = dataCtx;

  const setCountHandler = () => {
    setTimeout(() => {
      setRefetch();
    }, 250);
  };

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % props.fetchedData.length;
    setItemOffset(newOffset);
  };
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setCurrentItems(props.fetchedData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.fetchedData.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, itemOffset]);

  return (
    <Grid container spacing={4}>
      <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName={classes.pagination}
          pageLinkClassName={classes.pagenum}
          previousLinkClassName={classes.pagenum}
          nextLinkClassName={classes.pagenum}
          activeClassName={classes.active}
        />
      </Grid>
      {currentItems ? (
        currentItems.map((singleItem) => {
          return (
            <Grid item md={4} key={singleItem._id}>
              <ItemCard
                cardClass={card}
                _id={singleItem._id}
                itemId={singleItem._id}
                name={singleItem.name}
                collection={singleItem.collectionName}
                isLiked={singleItem.likes.includes(userId)}
                likes={singleItem.likes ? singleItem.likes.length : null}
                refetch={setCountHandler}
              />
            </Grid>
          );
        })
      ) : (
        <p>No items</p>
      )}
    </Grid>
  );
};

export default PaginatedItemList;
