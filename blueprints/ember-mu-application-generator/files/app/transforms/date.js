import Transform from 'ember-data/transform';
import moment from 'moment';

const DateTransform = Transform.extend({
  deserialize(serialized) {
    if (serialized != null) {
      serialized = moment(serialized).format('YYYY. MM. DD.');
    }
    return serialized;
  },
  serialize(deserialized) {
    return deserialized;
  }
});

export default DateTransform;
