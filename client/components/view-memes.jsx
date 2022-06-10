import React from 'react';

export default class MemesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      entries: [],
      activeIndex: 0,
      likeButton: '/images/thumbs-up-empty.png',
      dislikeButton: '/images/thumbs-down-empty.png'
    };
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.likeDislike = this.likeDislike.bind(this);
  }

  componentDidMount() {
    fetch('/api/entries')
      .then(response => response.json())
      .then(data => this.setState({ entries: data }));
  }

  nextImage() {
    let activeIndex = this.state.activeIndex + 1;

    if (activeIndex >= this.state.entries.length) {
      activeIndex = 0;
    }

    this.setState({ activeIndex });
  }

  previousImage() {
    let activeIndex = this.state.activeIndex - 1;

    if (activeIndex < 0) {
      activeIndex = this.state.entries.length - 1;
    }
    this.setState({ activeIndex });
  }

  likeDislike() {
    let likeButton = '/images/thumbs-up-empty.png';
    let dislikeButton = '/images/thumbs-down-empty.png';
    if (!likeButton) {
      likeButton = '/images/thumbs-up-full.png';
    } else {
      likeButton = '/images/thumbs-up-empty.png';
    }
    if (!dislikeButton) {
      dislikeButton = '/images/thumbs-down-full.png';
    } else {
      dislikeButton = '/images/thumbs-down-empty.png';
    }
    this.setState({ likeButton, dislikeButton });
  }

  render() {
    const activeIndex = this.state.activeIndex;
    const entries = this.state.entries;
    const likeButton = this.state.likeButton;
    const dislikeButton = this.state.dislikeButton;

    let imageUrl = '';

    if (entries[activeIndex]) {
      imageUrl = entries[activeIndex].entryUrl;
    }

    return (
    <div>
      <div className='row'>
        <div className='col-third row align-center justify-center comment-box-height'>
          <div className='comment-box'></div>
        </div>
        <div className='column col-third'>
          <div className='col-full'>
            <div className='row justify-left'>
              <img className='profile-img' src='https://www.denofgeek.com/wp-content/uploads/2021/03/Godzilla.jpg?resize=768%2C432' />
              <p className='light-grey profile-name'>Coolguy55</p>
            </div>
          </div>
          <div className='col-full row justify-center'>
            <div className='img-container'>
              <img className='meme-img' src={imageUrl} />
            </div>
          </div>
          <div className='phone-hidden'>
            <div className='row'>
              <div className='col-half row align-center'>
                <img className='like-dislike' onClick={this.likeDislike} src={likeButton} alt='thumbs up' />
                <h1 className='like-dislike-count'>0</h1>
              </div>
              <div className='col-half row align-center'>
                <img className='like-dislike' onClick={this.likeDislike} src={dislikeButton} alt='thumbs down' />
                <h1 className='like-dislike-count'>0</h1>
              </div>
            </div>
            <div className='row'>
              <div className='col-half row justify-left'>
                <i className="fas fa-chevron-left light-grey arrow" onClick={this.previousImage}></i>
              </div>
              <div className='col-half row justify-right'>
                <i className="fas fa-chevron-right light-grey arrow" onClick={this.nextImage}></i>
              </div>
            </div>
          </div>
          <div className='desktop-hidden'>
            <div className='row react-bar'>
              <div className='col-sixth row justify-left'>
                <i className="fas fa-chevron-left light-grey arrow" onClick={this.previousImage}></i>
              </div>
              <div className='col-sixth row align-center justify-right'>
                <img className='phone-like-dislike' src='/images/thumbs-up-empty.png' alt='thumbs up' />
              </div>
              <div className='col-sixth row align-center justify-center'>
                <h1 className='like-dislike-count'>0</h1>
              </div>
              <div className='col-sixth row align-center justify-right'>
                <img className='phone-like-dislike' src='/images/thumbs-down-empty.png' alt='thumbs down' />
              </div>
              <div className='col-sixth row align-center justify-center'>
                <h1 className='like-dislike-count'>0</h1>
              </div>
              <div className='col-sixth row justify-right'>
                <i className="fas fa-chevron-right light-grey arrow" onClick={this.nextImage}></i>
              </div>
            </div>
          </div>
          <div className='desktop-hidden'>
            <div className='row'>
              <div className='col-full'>
                <div className='phone-comment-background'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
