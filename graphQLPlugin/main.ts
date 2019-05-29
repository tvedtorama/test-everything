import { createSchema } from './schema';
import { setupGraphQL } from '../uilts/setupGraphQL';

export default () => {
	setupGraphQL(async () => createSchema())
}