import React from 'react';
import ReactDOM from 'react-dom';
import './application.scss';

const rootElement = document.getElementById('app');

class MemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memoCount: 0,
      memo: '',
      data: []
    };
  }

  handleChange(e) {
    if (e.target.value.length > 140) {
      e.target.value = e.target.value.substring(0, 140);
      alert('140 글자를 넘을 수 없습니다.');
    } else {
      this.setState({ memo: e.target.value });
    }
  }

  handleKeyDown(e) {
    if (e.keyCode !== 13 && e.which !== 13) {
      return;
    } else {
      e.preventDefault();
      this.handleClick();
    }
  }

  handleClick(e) {
    let memoCount = this.state.memoCount;
    let memo = this.state.memo;
    let data = this.state.data;

    if (memo) {
      this.setState({
        memoCount: memoCount + 1,
        memo: '',
        data: [memo, ...data]
      });
    } else {
      return;
    }
  }

  deleteMemo(key) {
    let memoCount = this.state.memoCount;
    let data = this.state.data;

    data.splice(key, 1);
    this.setState({
      memoCount: memoCount - 1,
      memo: '',
      data: data
    });
  }

  render() {
    let items = this.state.data.map((memo, i) => {
      return (
        <li key={ i }>
          <p>
            { memo }
            <span>{ '\u00a0' }</span>
            <i className="fa fa-close"
               type="button"
               onClick={ () => this.deleteMemo(i) }>
            </i>
          </p>
        </li>
      );
    });

    let display = (
      <div>
        <div className="alert alert-success">
          { this.state.memo } ({ this.state.memo.length } / 140 글자)
        </div>
      </div>
    );

    return (
      <div className="memos">
        <h1>MEMO</h1>
        <form>
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   placeholder="Input text..."
                   onChange={ this.handleChange.bind(this) }
                   onKeyDown={ this.handleKeyDown.bind(this) }
                   autoFocus={ true }
                   value={ this.state.memo } />
            <button className="btn btn-success"
                    type="button"
                    onClick={ this.handleClick.bind(this) }>
              등록
            </button>
          </div>
        </form>
        { display }
        <hr />
        <p>{ this.state.memoCount } 개의 메모</p>
        <ul className="list-layout">
          { items }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<MemoApp />, rootElement);

