import { prisma } from '@/lib/prisma/prisma-client'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOption } from '../auth/[...nextauth].api'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOption(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  // console.log('body', req.body)

  const { intervals } = timeIntervalsBodySchema.parse(req.body)
  // console.log('parse', intervals)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
