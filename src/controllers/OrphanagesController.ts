import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
  async index(_: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ['images'],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return res.json(orphanageView.render(orphanage));
  },

  async store(req: Request, res: Response) {
    const {
      title,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      latitude,
      longitude,
    } = req.body;

    const orphanageRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];

    const orphanage = orphanageRepository.create({
      title,
      about,
      instructions,
      open_on_weekends,
      latitude,
      longitude,
      opening_hours,
      images: requestImages.map((image) => ({ path: image.filename })),
    });

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },
};
