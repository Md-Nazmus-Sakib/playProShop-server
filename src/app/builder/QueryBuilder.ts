/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "minPrice",
      "maxPrice",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Remove undefined or empty string fields from queryObj
    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] === undefined || queryObj[key] === "") {
        delete queryObj[key];
      }
    });

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  priceRange() {
    const minPrice = this?.query?.minPrice;
    const maxPrice = this?.query?.maxPrice;

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter: any = {};

      if (minPrice !== undefined) {
        priceFilter.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        priceFilter.$lte = Number(maxPrice);
      }

      this.modelQuery = this.modelQuery.find({
        price: priceFilter,
      });
    }

    return this;
  }

  sort() {
    const sort = this?.query?.sort || "-createAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}

export default QueryBuilder;
