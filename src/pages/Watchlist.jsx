import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import WatchlistItems from './WatchlistItems';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Wrapper, FirstComponent, SecondComponent, ThirdComponent, StockItem, ItemContainer,Scrollable } from '../components/Items';




import { BlackBox } from './ViewStock';
import { Link } from 'react-router-dom';






export default function Watchlist() {
  const api = useAxios();
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/account/my_watchlist/");
        setWatchlists(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <hr></hr>
      <Wrapper>
      <FirstComponent>
          <Scrollable>          
          <h2><center>News Feed</center></h2>
          <hr></hr>
          {loading ? (
            <div>Loading...</div>
          ) : (
            watchlists.map((item) => (
              <ItemContainer key={item.id}>
                <center><h3>{item.name}</h3></center>
                <ul>
                  {item.stock.map((stock) => (
                    <StockItem key={stock.id}>
                      <WatchlistItems stock={stock} key={stock.id} />
                    </StockItem>
                  ))}
                </ul>
              </ItemContainer>
            ))
          )}
          </Scrollable>
        </FirstComponent>

        <SecondComponent>
          <Scrollable>          
          <h2><center>Your Watchlist</center></h2>
          <hr></hr>
          {loading ? (
            <div>Loading...</div>
          ) : (
            watchlists.map((item) => (
              <ItemContainer key={item.id}>
                <center><h3>{item.name}</h3></center>
                <ul>
                  {item.stock.map((stock) => (
                    <BlackBox>
                    <StockItem key={stock.id}>
                    <Link to={`/stock/${stock.id}`}>
                      <WatchlistItems stock={stock} key={stock.id} />
                      </Link>
                    </StockItem>
                    </BlackBox>
                   
                  ))}
                </ul>
              </ItemContainer>
            ))
          )}
          </Scrollable>
        </SecondComponent>





        <ThirdComponent>
          <Scrollable>          
          <h2><center>Trending traders</center></h2>
          <hr></hr>
          {loading ? (
            <div>Loading...</div>
          ) : (
            watchlists.map((item) => (
              <ItemContainer key={item.id}>
                <center><h3>{item.name}</h3></center>
                <ul>
                  {item.stock.map((stock) => (
                    <StockItem key={stock.id}>
                      <WatchlistItems stock={stock} key={stock.id} />
                    </StockItem>
                  ))}
                </ul>
              </ItemContainer>
            ))
          )}
          </Scrollable>
        </ThirdComponent>

      </Wrapper>
    </>
  );
}