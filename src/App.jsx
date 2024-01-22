import { useEffect, useState } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration ,getGenres } from './store/homeSlice'
import Home from './Pages/home/Home'
import Details from './Pages/details/Details'
import SearchResult from './Pages/searchResult/SearchResult'
import Explore from './Pages/explore/Explore'
import PageNotFound from './Pages/404/PageNotFound'
import Header from './Components/header/Header'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) =>state.home)
  // console.log(url)

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  } ,[])

  // to fetch image for background
  const fetchApiConfig  = () => {
    fetchDataFromApi('/configuration').then((res) => {
      // console.log(res)

      //creating object for background 
      const url = {
        backdrop : res.images.secure_base_url + 'original',
        poster : res.images.secure_base_url + 'original',
        profile : res.images.secure_base_url + 'original'

      }
      dispatch(getApiConfiguration(url))
    })
  }

  // to call multiple api we use promise
  const genresCall = async() => {
    let promises = []
    //tv and movie to both api fetch
    let endpoints = ["tv" , "movie"]
    let allGenres = {}

    // for loop on endpoint
    endpoints.forEach((url) => {
      // we fetch both enpont tv and movie
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    console.log(data)
    data.map(({genres}) => {
      // [item.id] is a key
      return genres.map((item) => (allGenres[item.id] = item))
    })
    // console.log(allGenres)
    dispatch(getGenres(allGenres))
  }

  return (

    // <div className='App'>
    //   {url?.total_pages}
    //   <Home />
    // </div>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:mediaType/:id' element={<Details />}/>
        <Route path='/search/:query' element={<SearchResult />}/>
        <Route path='/explore/:mediaType' element={<Explore />}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
