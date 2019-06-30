import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const getCounterQuery = gql`
  query GetCount {
    getCount
  }
`;

const incrementCountMutation = gql`
  mutation IncrementCount {
    incrementCount
  }
`;

const decrementCountMutation = gql`
  mutation DecrementCount {
    decrementCount
  }
`;

function IncreaseButton({ refetch }) {
  const render = (incrementCount, { data }) => (
    <Button
      color="primary"
      onClick={() => {
        incrementCount() && refetch();
      }}
    >
      <AddIcon />
    </Button>
  );
  return <Mutation mutation={incrementCountMutation}>{render}</Mutation>;
}

function DecreateButton({ refetch }) {
  const render = (decrementCount, { data }) => (
    <Button
      color="secondary"
      onClick={() => {
        decrementCount() && refetch();
      }}
    >
      <RemoveIcon />
    </Button>
  );
  return <Mutation mutation={decrementCountMutation}>{render}</Mutation>;
}

function Counter() {
  return (
    <div>
      <Query query={getCounterQuery}>
        {({ data, loading, error, refetch }) => {
          if (loading) return <CircularProgress />;
          if (error) return <p>Error</p>;

          const count = (data && data.getCount) || 0;
          return (
            <Typography variant="h6">
              <IncreaseButton refetch={refetch} />
              <DecreateButton refetch={refetch} />
              Count: {count}
            </Typography>
          );
        }}
      </Query>
    </div>
  );
}

export default Counter;
