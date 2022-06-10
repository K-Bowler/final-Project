import React from 'react';

export default class PostMemes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryUrl: ''
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addEntry = this.addEntry.bind(this);
  }

  handleUrlChange(event) {
    this.setState({ entryUrl: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newEntry = {
      entryUrl: this.state.entryUrl
    };
    this.addEntry(newEntry);
    this.setState({ entryUrl: '' });
  }

  addEntry(newEntry) {
    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then(response => response.json())
      .then(data => {
        const entriesCopy = this.state.entries.slice();
        entriesCopy.push(data);
        this.setState({ todos: entriesCopy });
      });
  }

  render() {
    let addBtnHidden = '';
    let imghidden = 'hidden';

    if (this.state.entryUrl === '') {
      addBtnHidden = '';
      imghidden = 'hidden';
    } else {
      addBtnHidden = 'hidden';
      imghidden = '';
    }

    return (
      <div>
        <form>
          <div className='row'>
            <div className='col-third phone-hidden'>
              <div className='row'>
                <div className='col-full row justify-center'>
                  <button className='wip edit-entry-btns edit-entry-top-btn-margin'>ADD TEXT</button>
                </div>
              </div>
              <div className='row'>
                <div className='col-full row justify-center'>
                  <button className='wip edit-entry-btns'>FILTER</button>
                </div>
              </div>
              <div className='row'>
                <div className='col-full row justify-center'>
                  <button className='wip edit-entry-btns'>RESET</button>
                </div>
              </div>
              <div className='row'>
                <div className='col-full row justify-center'>
                  <button onSubmit={this.addEntry} className='edit-entry-btns edit-entry-bottom-btn-margin'>SUBMIT</button>
                </div>
              </div>
            </div>
            <div className='col-full-col-third'>
              <div className='row'>
                <div className='col-full row justify-center post-image-container-margin'>
                  <div className='post-image-container row justify-center align-center'>
                    <img className={`meme-img ${imghidden}`} src={this.state.entryUrl} />
                    <button className={ `add-entry-btn row justify-center align-center position-relative ${addBtnHidden}`}>
                      <div className='horizontal-btn-line position-absolute'></div>
                      <div className='vertical-btn-line position-absolute'></div>
                    </button>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-full row justify-center'>
                  <div>
                    <input className='insert-url-input' type="text" value={this.state.entryUrl} onChange={this.handleUrlChange} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-full row justify-center'>
                  <span className='insert-url-text light-grey'>Select a file from divice or insert url</span>
                </div>
              </div>
              <div className='row desktop-hidden'>
                <div className='col-full row justify-evenly'>
                  <button className='wip edit-entry-btns'>ADD TEXT</button>
                  <button className='wip edit-entry-btns'>FILTER</button>
                </div>
              </div>
              <div className='row desktop-hidden'>
                <div className='col-full row justify-evenly'>
                  <button className='wip edit-entry-btns'>RESET</button>
                  <button className='edit-entry-btns'>SUBMIT</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
