import { Inject, Injectable } from '@nestjs/common';
import { Options, EnvConfig } from './interfaces';
import { CONFIG_OPTIONS } from './constants';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';


@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: Options) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(options.folder, filePath);
    try {
      this.envConfig = JSON.parse(fs.readFileSync(envFile).toString());
    }
    catch( error ) {
      Logger.error( 'Failed to read config file!!!', 'ApplicationError');
    }
    
    console.log('Config values in use:');
    console.log(this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
