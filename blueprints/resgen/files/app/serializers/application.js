import DS from 'ember-data';numberOfPages
import PaginationSerializer from '../mixins/pagination-serializer';

export default DS.JSONAPISerializer.extend(PaginationSerializer, {

});
