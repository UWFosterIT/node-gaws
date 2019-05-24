const Service = require('./service');

class GradPrograms extends Service {
  getAuthorized() {
    return this.get('gradprograms/?format=json');
  }
}

module.exports = GradPrograms;
