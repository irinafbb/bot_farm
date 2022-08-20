import {Connection, ObjectType, EntitySchema} from 'typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';

export type EntityType<T> = ObjectType<T> | EntitySchema<T> | string

export const saveWithConflict = async <U, T extends EntityType<U>>(entity: T, values: QueryDeepPartialEntity<U>, connection: Connection) => {
    return connection
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(values)
        .onConflict('DO NOTHING')
        .execute();
};

export const seedDb = async (connection: Connection) => {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction('REPEATABLE READ');

    await queryRunner.commitTransaction();
    return Promise.resolve();
};