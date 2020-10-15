import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

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

    const data = {
      title,
      about,
      instructions,
      open_on_weekends,
      latitude,
      longitude,
      opening_hours,
      images: requestImages.map((image) => ({ path: image.filename })),
    };

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },
};
