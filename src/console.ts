import { BootstrapConsole } from 'nestjs-console';
import { ReadAdministrativeUnitsModule } from './modules/read-administrative-units/read-administrative-units.module';

const bootstrap = new BootstrapConsole({
  module: ReadAdministrativeUnitsModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
