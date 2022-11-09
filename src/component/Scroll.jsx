import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from './Comment'
import Loader from './Loader';
import EndMsg from './EndMsg';

function Scroll() {
    const [items, setItems] = useState([]);

    const [hasMore, sethasMore] = useState(true);
  
    const [page, setpage] = useState(2);
  
    useEffect(() => {
      const getComments = async () => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=3`
        );
        const data = await res.json();
        setItems(data);
      };
  
      getComments();
    }, []);
  
    const fetchComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=3`
      );
      const data = await res.json();
      return data;
    };
  
    const fetchData = async () => {
      const commentsFormServer = await fetchComments();
  
      setItems([...items, ...commentsFormServer]);
      if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
        sethasMore(false);
      }
      setpage(page + 1);
    };


  return (
    <InfiniteScroll
    dataLength={items.length}
    next={fetchData}
    hasMore={hasMore}
    loader={<Loader />}
    endMessage={<EndMsg />}
  >
    <div className="container">
      <div className="row m-2">
        {items.map((item) => {
          return <Comment key={item.id} item={item} />;
        })}
      </div>
    </div>
  </InfiniteScroll>
  )
}

export default Scroll