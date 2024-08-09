import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

export type RedisClientType = ReturnType<typeof createClient>;
@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  protected redisClient;
  constructor(private configService: ConfigService) {}

  async connectToRedis() {
    try {
      const redisHost = this.configService.get<string>('REDIS.HOST');
      const redisPort  = this.configService.get<number>('REDIS.PORT');
      
      this.redisClient = createClient({
        socket: {
          host: redisHost,
          port: redisPort,
        },
      });

      await this.redisClient.connect();

      this.redisClient.on('ready', () => {
        this.logger.debug('Redis client connected to server.');
      });

      this.redisClient.on('connect', () => {
        this.logger.debug('Redis client connected.');
      });

      this.redisClient.on('error', (err) => {
        this.logger.error(`Redis error: ${err}`);
      });
      this.logger.debug('Connection to redis successfully!');
    } catch (error) {
      this.logger.error('Redis ERROR.', error);
    }
  }

  async disconnect(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
      this.logger.warn('Redis client disconnected.');
    }
  }

  async set(key: string, value: string): Promise<string> {
    try {
      return await this.redisClient.set(key, value);
    } catch (error) {
      throw error;
    }
  }

  async get(key: string): Promise<string> {
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      throw error;
    }
  }

  async getAllKeys(pattern: string): Promise<string[]> {
    try {
      const keys = await this.redisClient.keys(pattern);
      return keys;
    } catch (error) {
      throw error;
    }
  }

  async del(key: string) {
    try {
      return await this.redisClient.del(key);
    } catch (error) {
      throw error;
    }
  }

  async exists(key: string) {
    try {
      return await this.redisClient.exists(key);
    } catch (error) {
      throw error;
    }
  }
}
