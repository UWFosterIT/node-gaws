const Service = require('./service');

class GradPrograms extends Service {
  constructor(config) {
    super(config);
  }

  getAuthorized() {
    return this._get('gradprograms/?format=json');
  }
}

module.exports = GradPrograms;
