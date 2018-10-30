import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import './Movie.css';

class Movie extends Component{
    
     static propTypes = {
        // prop의 예외처리에 매우 좋을 듯 하다.
        // .isRequired 필수 title이라는 prop가 반드시 존재해야한다.
        // .string , .number 형식지정 다를 경우 경고
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired,
        synopsis: PropTypes.string.isRequired
    }

    render(){
        //console.log(this.props);
        return(
            <div className="Movie">
                <div className="Movie__poster">
                    <MoviePoster image={this.props.poster} alt={this.props.title}/>
                </div>
                <div className="Movie__Culumns">
                    <h1>{this.props.title}</h1>
                    <div className="Movie__Genres">
                        {this.props.genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                    </div>
                    <p className="Movie__Synopsis">
                        <LinesEllipsis 
                            text={this.props.synopsis}
                            maxLine='3'
                            ellipsis="..."
                            trimRight
                        />
                    </p>
                </div>
                
                
            </div>
        );
    }
}

function MovieGenre({genre}){
    return (
        <span className="Movie__Genre" alt="Movie Genre"> {genre} </span>
    )
}


// class가 아닌 function으로 정의할 경우 아래와 같이 한다.
// Movie.propTypes = {}
// MoviePoster.propTypes = { poster: PropTypes.string.isRequired }

// JSX = 리액트로 작성하는 HTML
// 큰 컴포넌트 안에 작은 컴포넌트를 넣는 방식으로 작업할 수 있다.
class MoviePoster extends Component{
    render(){
        return(
                <img src={this.props.image} alt={this.props.alt} title={this.props.alt} />
        );
    }
}



export default Movie