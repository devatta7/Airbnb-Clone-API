import { developmentEnv } from './environment-modes/development.env';
import { productionEnv } from './environment-modes/production.env';
import { stagingEnv } from './environment-modes/staging.env';
import { EnvironmentInterface } from './environment.interface';

const environment: Record<string, () => EnvironmentInterface> = {
  development: developmentEnv,
  staging: stagingEnv,
  production: productionEnv,
};

export default (): EnvironmentInterface => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const getEnvToLoad = environment[nodeEnv];
  return getEnvToLoad();
};
