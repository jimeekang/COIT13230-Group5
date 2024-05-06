class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const features = ['limit', 'filter', 'page', 'sort'];
    let queryCopy = { ...this.queryString };
    console.log(queryCopy);
    features.forEach((el) => {
      delete queryCopy[el];
    });

    // TODO - 2) Advance Filtering
    const stringQuery = JSON.stringify(queryCopy);
    let newqueryString = stringQuery.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    queryCopy = JSON.parse(newqueryString);

    this.query = this.query.find(queryCopy);

    return this;
  }

  sort() {
    // TODO -- sorting
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort('name');
    }

    return this;
  }

  limiting() {
    //TODO -- fields Limiting
    if (this.queryString.limit) {
      const limit = this.queryString.limit.split(',').join(' ');

      console.log(limit);
      this.query = this.query.select(limit);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    //TODO -- pagination
    if (this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}

module.exports = ApiFeatures;
