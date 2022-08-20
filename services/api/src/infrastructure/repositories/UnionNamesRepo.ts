import {EntityRepository, Repository} from 'typeorm';
import {UnionMember} from '../entities/UnionNames';

@EntityRepository(UnionMember)
export class UnionNamesRepository extends Repository<UnionMember> {
    public async findMembersByLastName(lastName: string): Promise<string[]> {
        const members = await this.createQueryBuilder('member')
            .select('CONCAT_WS(\' \', member.first_name, member.last_name, \'(\'||member.other_name||\')\')', 'full_name')
            .where('LOWER(member.last_name) = LOWER(:surname) OR LOWER(member.other_name) = LOWER(:surname)', {surname: lastName})
            .execute() as {full_name: string}[];   

        return members.map((member) => member.full_name);
    }
}
