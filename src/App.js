import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import Navigation from './navigation';

class App extends Component {
  // 흐름은 예정(will) -> 할 수 있다, 존재(did)
  // Render: componentWillMount() -> render() -> componentDidMount()
  
  // UpDate componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> [ render() ] -> component
  // ☆ old prop != new prop -> shouldComponentUpdate() == ture

  state = {
    selected: "download_count"
  }

  componentWillMount(){
    // console.log("will mount");
    this._getMovies(this.state.selected);
  }

  componentDidMount(){
    // console.log("did mount");
    // state를 바꿀 때는 반드시 this.setState({})를 사용해야한다.
    // 기존의 데이터를 추가한다고 생각하자 '...' 을 += 라고 이해하면 편할거같다.
    // ...this.state.movieList
  }
  
  // 메뉴정보 최초 생성
  // state에 해도 같음
  _createNavigationData = () =>{
    this.setState({
      sortList : [
        {
          value: "date_added",
          krLan: "최신"
        },
        {
          value: "title",
          krLan: "제목"
        },
        {
          value: "year",
          krLan: "날짜"
        },
        {
          value: "download_count",
          krLan: "다운로드"
        },
        {
          value: "like_count",
          krLan: "좋아요"
        }
      ]
    })

  return "Test";
  }

  // 영화정보를 가져오도록 요청한다.
  // 정보 획득을 대기 후, 획득한 정보로 리스트를 만든다.
  // async 동기함수 선언 await 사용가능 promises의 종료를 기다림, await this.~~~ 뒤에 오는 함수가 끝나길 기다리고 리턴 값을 받아라.
  _getMovies = async (value) => {
    const movieList = await this._callApi(value)
    this.setState({
      movieList
    })
  }

  // 영화정보를 얻어온다.
  _callApi = (value) => {
    console.log(this._createNavigationData());
    // AJAX 를 fetch 를 이용하여 간단히 불러올 수 있다. 비동기화
    // body 부분에 ReadableStream 로 표현된 것을 볼 수있다. (제이슨으로 바꾸어줘야한다.)
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by="+ value)
    .then((response) => response.json())
    // ' => ' 자체에 return 이라는 뜻이 내제되어 있다.
    .then(json => json.data.movies)
    .catch((error)=>{
      console.log("getData err :" + error);
    })
  }

  // 함수의 이름 앞에 _ 를 사용하는 이유는 React의 기능이 많기 때문에 이를 구분하기 위해서
  // = () => 
  /* Movie 컴포넌트에 title이라는 이름으로 movie[0] 데이터를 전송 */
  /* 데이터의 전달은 부모 컴포넌트가 자식 컴포넌트에게 행할 수 있다. */
  /* patch Array나 foreach 라고 생각하면 편하다. for문의 동작도 합쳐진 느낌 */
  /* 컴포넌트의 key는 상대적으로 느리다. */
  _renderMovieList = () => {
    
    const movieList = this.state.movieList.map((movie) => {
      return <Movie 
                title={movie.title_english} 
                poster={movie.medium_cover_image} 
                key={movie.id} 
                genres={movie.genres}
                synopsis={movie.synopsis}
              />
    })
    // const movieList 를 완성하고 반환한다.
    return movieList;
  }

  // 메뉴정보를 구체화한다.
  _renderNavigation = () => {
    const navigation = this.state.sortList.map((data, index) => {
      return <Navigation 
                name={data.krLan}
                event={data.value}
                key={index}
                navUpdate={this._changeSort}
              />
    })

    return navigation;
  }

  // 검색조건에 맞춰서 정보를 얻어온다.
  _changeSort = (value) => {
    this.setState({
      movieList : null
    })
    this._getMovies(value)
  }

  render() {
    // console.log("did render");
    return (
      <div className={this.props.MovieList ? "App" : "App--loading"}>
        <div className="App--nav">
          {/* 검색조건 */}
          { this._renderNavigation() }
        </div>
        <div className="App--loading">
          {/* ? 를 통해 앞의 데이터가 존재하는지를 확인하고 true : false 로 처리한다. false 부분에는 로딩중인 컴포넌트를 따로 불러도 될 것 같다. */}
          {this.state.movieList ? this._renderMovieList() : "Loading"}
        </div>
      </div>
    );
  }
}

export default App;
