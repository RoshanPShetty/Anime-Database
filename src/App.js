import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");

  const GetTopAnime = async () => {
    // Retrieve 50 anime from the 1st page of the API
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`).then(res => res.json());

    // Slices the array to give the first 5 anime
    SetTopAnime(temp.top.slice(0, 13));
  }

  const HandleSearch = e => {
    e.preventDefault();

    FetchAnime(search);
  }

  const FetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`).then(res => res.json());

    SetAnimeList(temp.results);
  }

  useEffect(() => {
    GetTopAnime();
  }, []);


  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}

        />

      </div>
    </div>
  );
}

export default App;