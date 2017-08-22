import DS from 'ember-data';
import PaginationSerializer from 'ember-mu-application-generator/mixins/pagination-serializer';

export default DS.JSONAPISerializer.extend(PaginationSerializer, {
});
