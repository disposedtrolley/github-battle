var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;


class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(players) {
      if (players === null) {
        return this.setState(function() {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false
          }
        });
      }

      this.setState(function() {
        console.log("kdjfdkfj");
        return {
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
        }
      });
    }.bind(this))
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        
      </div>
    )
  }
}

module.exports = Results;