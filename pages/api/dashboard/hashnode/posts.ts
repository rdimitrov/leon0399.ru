import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from 'graphql-request'
import { CLIENT } from '../../../../utils/hashnode'

const QUERY = gql`
  query Publications($username: String!) {
    user(username: $username) {
      numPosts
    }
  }
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  const response = await CLIENT.request<{
    user: {
      numPosts: number
    }
  }>(QUERY, {
    username: 'leon0399',
  })

  res.status(200).json(response.user.numPosts)
}
