import { ApolloClient, InMemoryCache, createHttpLink, from, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.warn(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.warn(`Network error: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: 'https://countries.trevorblades.com',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        countries: {
          merge(existing = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        code
        name
      }
      currency
      languages {
        code
        name
      }
      capital
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      continent {
        code
        name
      }
      currency
      languages {
        code
        name
      }
      capital
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;