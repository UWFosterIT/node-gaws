import Service from './service';

class GradPrograms extends Service {
  constructor(config) {
    super(config);
  }

  getAuthorized() {
    return this._get('gradprograms/?format=json');
  }
}

export default GradPrograms;
