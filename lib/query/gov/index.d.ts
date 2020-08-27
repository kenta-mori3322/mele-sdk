import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class GovQuery {
    private _transport;
    constructor(transport: ITransport);
    getParameters(): Promise<Types.GovParams>;
    getProposals(voter?: string, depositor?: string, status?: string, page?: number, limit?: number): Promise<Types.Proposal[]>;
    getProposal(id: string): Promise<Types.Proposal>;
    getDeposits(id: string): Promise<Types.Deposit[]>;
    getDeposit(id: string, depositor: string): Promise<Types.Deposit>;
    getVotes(id: string, page?: number, limit?: number): Promise<Types.Vote[]>;
    getVote(id: string, voter: string): Promise<Types.Vote>;
    getTally(id: string): Promise<Types.TallyResult>;
}
