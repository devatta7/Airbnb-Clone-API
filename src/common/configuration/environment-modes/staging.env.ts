import { EnvironmentInterface } from '../environment.interface';
import { defaultEnv } from './default.env';

export const stagingEnv = (): EnvironmentInterface => ({ ...defaultEnv() });
