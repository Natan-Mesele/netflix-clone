import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css'; 
import Nav from './components/Nav'; 
import Banner from './components/Banner'; 
import Row from './components/Row'; 
import MovieDetail from './components/MovieDetail'; // MovieDetail component
import requests from './components/Requests'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchTopActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchTopComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchTopHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchTopRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchTopDocumentaries} />
    </>
  );
}

export default App;
