import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export abstract class AbstractRepository<T> {
  private readonly modelName: string;
  private readonly searchFields: Record<string, string>;

  protected constructor(
    private readonly model: Model<T>,
    params: {
      modelName: string;
      searchFields?: Record<string, string>;
    },
  ) {
    this.modelName = params.modelName;
    this.searchFields = params.searchFields;
  }

  protected getSearchFieldName(fieldName: string): string {
    return this.searchFields && this.searchFields[fieldName]
      ? this.searchFields[fieldName]
      : fieldName;
  }

  public create(object: T): Promise<T> {
    if (this.searchFields) {
      for (const [fieldName, searchFieldName] of Object.entries(
        this.searchFields,
      )) {
        if (typeof object[fieldName] === 'string') {
          object[searchFieldName] = object[fieldName].toLowerCase();
        }
      }
    }

    return this.model.create(object);
  }

  public async findOne(
    conditions: Partial<Record<keyof T, unknown>>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T> {
    this.checkFieldsForSearchName(conditions);

    return await this.model.findOne(
      this.checkFieldsForSearchName(conditions) as FilterQuery<T>,
      projection,
      options,
    );
  }

  public async findAll(
    conditions: Partial<Record<keyof T, unknown>>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T[]> {
    return await this.model
      .find(
        this.checkFieldsForSearchName(conditions) as FilterQuery<T>,
        projection,
        options,
      )
      .exec();
  }

  public async aggregate(pipeline): Promise<T[]> {
    return await this.model.aggregate(pipeline).exec();
  }

  protected checkFieldsForSearchName(
    conditions: Partial<Record<keyof T, unknown>>,
  ): Partial<Record<keyof T, unknown>> {
    const mappedConditions = {};
    for (const [field, value] of Object.entries(conditions)) {
      const searchField = this.getSearchFieldName(field);
      mappedConditions[searchField] = value;
    }

    return mappedConditions;
  }
}
