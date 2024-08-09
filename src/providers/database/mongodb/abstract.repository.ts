import {
  Model,
  Connection,
  SaveOptions,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  ClientSession,
} from 'mongoose';

interface PaginateOptions {
  pageNo: number;
  limit: number;
}

export abstract class AbstractRepository<TDocument> {
  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async create(document, options?: SaveOptions) {
    const createdDocument = new this.model({ ...document });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection: ProjectionType<TDocument> = {},
    options: QueryOptions = { lean: true },
    sort?: any,
    populateQuery?: any,
  ) {
    try {
      const ModelName = this.model;
      options = { ...options, lean: true };
      const queryBuilder = ModelName.findOne(filterQuery, projection, options);

      if (sort) {
        queryBuilder.sort(sort);
      }

      if (populateQuery) {
        queryBuilder.populate(populateQuery);
      }

      return queryBuilder.exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: QueryOptions = {
      lean: true,
      new: true,
    },
  ) {
    const document = this.model.findOneAndUpdate(filterQuery, update, options);
    return document;
  }

  async updateOne(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: QueryOptions = { new: true },
  ) {
    try {
      const ModelName = this.model;
      return ModelName.updateOne(filterQuery, update);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: QueryOptions = { multi: true },
  ) {
    try {
      const ModelName = this.model;
      return ModelName.updateMany(filterQuery, update);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async upsert(filterQuery: FilterQuery<TDocument>, document: any) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }
  async insertMany(data, options?: any): Promise<any> {
    try {
      const ModelName = this.model;
      return ModelName.collection.insertMany(data, options);
    } catch (error) {
      throw error;
    }
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    projection: ProjectionType<TDocument> | null,
    options: QueryOptions = { lean: true },
    sort?: any,
    paginate?: PaginateOptions,
    populateQuery?: any,
  ) {
    try {
      const ModelName = this.model;
      options = { ...options, lean: true };
      if (sort && paginate && !populateQuery) {
        // sorting with pagination
        return ModelName.find(filterQuery, projection, options)
          .sort(sort)
          .skip((paginate.pageNo - 1) * paginate.limit)
          .limit(paginate.limit)
          .exec();
      } else if (!sort && paginate && !populateQuery) {
        // pagination
        return ModelName.find(filterQuery, projection, options)
          .skip((paginate.pageNo - 1) * paginate.limit)
          .limit(paginate.limit)
          .exec();
      } else if (!sort && !paginate && populateQuery) {
        // populate
        return ModelName.find(filterQuery, projection, options)
          .populate(populateQuery)
          .exec();
      } else if (!sort && paginate && populateQuery) {
        // pagination with populate
        return ModelName.find(filterQuery, projection, options)
          .skip((paginate.pageNo - 1) * paginate.limit)
          .limit(paginate.limit)
          .populate(populateQuery)
          .exec();
      } else if (sort && !paginate && !populateQuery) {
        // only sorting
        return ModelName.find(filterQuery, projection, options)
          .sort(sort)
          .exec();
      } else {
        // no sorting, pagination or population
        console.log('-----', filterQuery, projection, options);
        return ModelName.find(filterQuery, projection, options).exec();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async count(query: FilterQuery<TDocument>): Promise<number> {
    try {
      return this.model.countDocuments(query).exec();
    } catch (error) {
      throw error;
    }
  }

  async countDocuments(query: FilterQuery<TDocument>): Promise<number> {
    try {
      return this.model.countDocuments(query).exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Add skip and limit to pipeline
   */
  addSkipLimit = (limit: number | undefined, pageNo: number | undefined) => {
    if (limit) {
      limit = Math.abs(limit);
      // If limit exceeds max limit
      if (limit > 100) {
        limit = 100;
      }
    } else {
      limit = 10;
    }
    if (pageNo && pageNo !== 0) {
      pageNo = Math.abs(pageNo);
    } else {
      pageNo = 1;
    }
    const skip = limit * (pageNo - 1);
    return [{ $skip: skip }, { $limit: limit + 1 }] as const;
  };

  async paginate(
    pipeline: any[],
    limit: number,
    pageNo: number,
    options: { collation?: any } = {},
    pageCount = false,
  ) {
    try {
      pipeline = [...pipeline];
      const ModelName = this.model;
      let promiseAll = [];
      if (Object.keys(options).length !== 0) {
        if (options.collation) {
          promiseAll = [
            ModelName.aggregate(pipeline)
              .collation({ locale: 'en' })
              .allowDiskUse(true),
          ];
        } else {
          promiseAll = [ModelName.aggregate(pipeline).allowDiskUse(true)];
        }
      } else {
        promiseAll = [ModelName.aggregate(pipeline).allowDiskUse(true)];
      }
      if (pageCount) {
        for (let index = 0; index < pipeline.length; index++) {
          if ('$skip' in pipeline[index]) {
            pipeline = pipeline.slice(0, index);
          }
        }
        pipeline.push({ $count: 'total' });
        promiseAll.push(ModelName.aggregate(pipeline).allowDiskUse(true));
      }

      const result = await Promise.all(promiseAll);

      let nextHit = 0;
      let total = 0;
      let totalPage = 0;

      if (pageCount) {
        total = result[1]?.[0]?.['total'] ?? 0;
        totalPage = Math.ceil(total / limit);
      }

      let data: any[] = result[0];
      if (result[0].length > limit) {
        nextHit = pageNo + 1;
        data = result[0].slice(0, limit);
      }
      return {
        data: data,
        total: total,
        pageNo: pageNo,
        totalPage: totalPage,
        nextHit: nextHit,
        limit: limit,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOne(query: FilterQuery<TDocument>): Promise<any> {
    try {
      const ModelName = this.model;
      return ModelName.deleteOne(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteMany(query: FilterQuery<TDocument>): Promise<any> {
    try {
      const ModelName = this.model;
      return ModelName.deleteMany(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async aggregate(aggPipe: any, options: any = {}) {
    try {
      const ModelName = this.model;
      const aggregation: any = ModelName.aggregate(aggPipe);
      if (options) {
        aggregation.options = options;
      }
      return aggregation.allowDiskUse(true).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async distinct(path: string, query: FilterQuery<TDocument>) {
    try {
      const ModelName = this.model;
      return ModelName.distinct(path, query);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
