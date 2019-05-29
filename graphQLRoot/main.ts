import { createSchema } from './schema';
import { setupGraphQL } from '../uilts/setupGraphQL';
import { loadStitchSchema } from './loadStitchSchema';

export default async () => {
	setupGraphQL(async () => createSchema(), loadStitchSchema)
}
