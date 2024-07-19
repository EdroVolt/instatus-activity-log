// pages/api/events.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

interface EventRequestBody {
  object: string;
  actorId: string;
  actorName: string;
  group: string;
  action: {
    object: string;
    name: string;
  };
  targetId: string;
  targetName: string;
  location: string;
  occurredAt: string;
  metadata: Record<string, any>;
}

export default async function eventsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      object,
      actorId,
      actorName,
      group,
      action,
      targetId,
      targetName,
      location,
      occurredAt,
      metadata,
    }: EventRequestBody = req.body;

    try {
      const newAction = await prisma.action.create({ data: action });

      const newEvent = await prisma.event.create({
        data: {
          object,
          actorId,
          actorName,
          group,
          actionId: newAction.id,
          targetId,
          targetName,
          location,
          occurredAt: occurredAt ? new Date(occurredAt) : undefined,
          metadata,
        },
      });
      res.status(201).json(newEvent);
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const {
      page = 1,
      limit = 10,
      search = "",
      actorId,
      targetId,
      actionId,
      name,
    } = req.query;

    const where: Record<string, any> = {
      AND: [
        search && {
          OR: [
            { actorName: { contains: search, mode: "insensitive" } },
            { targetName: { contains: search, mode: "insensitive" } },
          ],
        },
        actorId && { actorId },
        targetId && { targetId },
        actionId && { actionId },
        name && { action: { name: { contains: name, mode: "insensitive" } } },
      ].filter(Boolean),
    };

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    try {
      const events = await prisma.event.findMany({
        where,
        include: { action: true },
        skip,
        take,
      });

      const totalCount = await prisma.event.count({ where });

      res
        .status(200)
        .json({ events, totalCount, page: Number(page), limit: take });
    } catch (error) {
      res.status(500).json({ error: "Error while fetching events" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} is Not Allowed`);
  }
}
