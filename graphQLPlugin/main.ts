import { createSchema } from './schema';
import { setupGraphQL } from '../utils/setupGraphQL';

export default () => {
	setupGraphQL({main: createSchema()})
}
