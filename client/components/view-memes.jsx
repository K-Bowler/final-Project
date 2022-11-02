import React from 'react';

export default class MemesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      entries: [],
      activeIndex: 0,
      likeCount: 0,
      dislikeCount: 0
    };
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  getMemeData() {
    fetch('/api/entries')
      .then(response => response.json())
      .then(data => this.setState({ entries: data }));
  }

  componentDidMount() {
    this.getMemeData();
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

  handleLike(like, dislike) {
    const { activeIndex, entries } = this.state;
    const tempMeme = entries[activeIndex];

    if (!tempMeme) return;

    const meme = { ...tempMeme };
    const { entryId } = meme;

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isLiked: like,
        isDisliked: dislike
      })
    };

    fetch(`/api/likesDislikes/${entryId}`, request)
      .then(res => res.json())
      .then(data => {
        if (meme.userLiked && !data.isLiked) {
          meme.likes--;
        } else if (!meme.userLiked && data.isLiked) {
          meme.likes++;
        }

        if (meme.userDisliked && !data.isDisliked) {
          meme.dislikes--;
        } else if (!meme.userDisliked && data.isDisliked) {
          meme.dislikes++;
        }

        meme.userLiked = Number(data.isLiked);
        meme.userDisliked = Number(data.isDisliked);

        const updatedEntries = entries.map(m => {
          if (m.entryId === data.entryId) {
            return meme;
          }
          return m;
        });

        this.setState({ entries: updatedEntries });
      });

  }

  render() {
    const activeIndex = this.state.activeIndex;
    const entries = this.state.entries;
    const meme = entries[activeIndex];
    let imageUrl = '';
    let likes = 0;
    let dislikes = 0;
    let likeBtn = 'thumbs-up-empty.png';
    let dislikeBtn = 'thumbs-down-empty.png';

    if (meme) {
      imageUrl = meme.entryUrl;
      likes = meme.likes;
      dislikes = meme.dislikes;

      if (meme.userLiked) {
        likeBtn = 'thumbs-up-full.png';
      } else if (meme.userDisliked) {
        dislikeBtn = 'thumbs-down-full.png';
      }
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
            <div className='img-container' onDoubleClick={() => this.handleLike(true, false)}>
              <img className='meme-img' src={imageUrl} />
            </div>
          </div>
          <div className='phone-hidden'>
            <div className='row'>
              <div className='col-half row align-center justify-center'>
                <img className='like-dislike' onClick={() => this.handleLike(true, false)} src={`/images/${likeBtn}`} alt='thumbs up' />
                <h1 className='like-dislike-count'> {likes} </h1>
              </div>
              <div className='col-half row align-center'>
                <img className='like-dislike' onClick={() => this.handleLike(false, true)} src={`/images/${dislikeBtn}`} alt='thumbs down' />
                <h1 className='like-dislike-count'> {dislikes} </h1>
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
                  <img className='phone-like-dislike' onClick={() => this.handleLike(true, false)} src={`/images/${likeBtn}`} alt='thumbs up' />
              </div>
              <div className='col-sixth row align-center justify-center'>
                <h1 className='like-dislike-count'> {likes} </h1>
              </div>
              <div className='col-sixth row align-center justify-right'>
                  <img className='phone-like-dislike' onClick={() => this.handleLike(false, true)} src={`/images/${dislikeBtn}`} alt='thumbs down' />
              </div>
              <div className='col-sixth row align-center justify-center'>
                  <h1 className='like-dislike-count'> {dislikes} </h1>
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
