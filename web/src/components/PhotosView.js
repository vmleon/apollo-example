import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const getPhotosQuery = gql`
  query GetPhotos {
    getPhotos {
      id
      name
      description
      category
      postedBy {
        name
        avatar
      }
    }
    countPhotos
  }
`;

function PhotosView() {
  const render = ({ data }, loading, error) => {
    if (loading) return <CircularProgress />;
    if (error) return <p>Error</p>;

    const photos = (data && data.getPhotos) || [];
    const numOfPhotos = (data && data.countPhotos) || 0;
    if (!numOfPhotos) return <p>No photos</p>;
    return (
      <div>
        <List>
          {photos.map(photo => (
            <ListItem key={photo.id}>
              <ListItemText
                primary={`${photo.name} (${photo.category})`}
                secondary={`${photo.description} posted by ${
                  photo.postedBy.name
                }`}
              />
            </ListItem>
          ))}
        </List>
        (Total: {numOfPhotos.toString()} photos)
      </div>
    );
  };
  return <Query query={getPhotosQuery}>{render}</Query>;
}

export default PhotosView;
