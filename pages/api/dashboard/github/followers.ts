// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/core'

const octokit = new Octokit()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  const userResponse = await octokit.request('GET /users/{username}', {
    username: 'leon0399',
  })

  res.status(200).send(userResponse.data.followers)
}
