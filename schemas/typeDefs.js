import { gql } from 'apollo-server-express';

// Lỗi này xuất hiện vì bạn đang gửi một giá trị null cho một trường yêu cầu là String!(non - nullable).Điều này xảy ra trước khi resolver của bạn được gọi, tức là lỗi xảy ra trong quá trình xác thực schema GraphQL

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    role: String!
    token: String
  }

  type Movie {
    _id: ID
    title: String
    year: String
    poster: String
  }

  type LogoutResponse {
    success: Boolean!
    message: String!
  }

  type DeleteMovieResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    getMovies: [Movie]
    getMovieById(id: ID!): Movie
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: LogoutResponse 
    createNewMovie(title: String!, year: String!, poster: String!): Movie
    updateMovie(id: ID!, title: String, year: String, poster: String): Movie
    deleteMovie(id: ID!): DeleteMovieResponse
  }
`;

export default typeDefs
