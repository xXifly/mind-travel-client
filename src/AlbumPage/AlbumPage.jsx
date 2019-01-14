import React from "react";
import { Link } from "react-router-dom";

import { userService, albumService } from "../_services";

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      albums: []
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      albums: { loading: true }
    });
    albumService.getAll().then(albums => this.setState({ albums }));
  }

  render() {
    const { user, albums } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Album page</h1>
        {albums.loading && <em>Loading users...</em>}
        {albums.length && (
          <ul>
            {albums.map((album, index) => (
              <li key={user.id}>{album.name}</li>
            ))}
          </ul>
        )}
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
    );
  }
}

export { AlbumPage };
