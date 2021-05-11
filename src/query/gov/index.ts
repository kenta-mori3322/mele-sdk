import * as Types from '../../common'
import { ITransport } from '../../transport'

const Keys = {
    Query: {
        QueryPath: 'mgov',

        ParametersPath: 'params',
        ProposalsPath: 'proposals',
        ProposalPath: 'proposal',
        DepositsPath: 'deposits',
        DepositPath: 'deposit',
        VotesPath: 'votes',
        VotePath: 'vote',
        TallyPath: 'tally',

        ParamDepositPath: 'deposit',
        ParamVotingPath: 'voting',
        ParamTallyingPath: 'tallying',
    }
}

/**
 * Governance Query
 * @namespace mele.query.gov
 * @type {object}
 * @memberof mele
 */

export default class GovQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.gov.**getParameters**
     *
     * Fetch governance module parameters.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name GovParams
     *
     * @returns {GovParams} govParams - Governance parameters.
     */
    async getParameters(): Promise<Types.GovParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        const ParamDepositPath = Keys.Query.ParamDepositPath
        const ParamVotingPath = Keys.Query.ParamVotingPath
        const ParamTallyingPath = Keys.Query.ParamTallyingPath

        let deposit = await this._transport.query<Types.DepositParams>(
            [ParamDepositPath],
            '',
            QueryPath,
            ParametersPath
        )
        let voting = await this._transport.query<Types.VotingParams>(
            [ParamVotingPath],
            '',
            QueryPath,
            ParametersPath
        )
        let tallying = await this._transport.query<Types.TallyParams>(
            [ParamTallyingPath],
            '',
            QueryPath,
            ParametersPath
        )

        return {
            deposit: deposit,
            tally: tallying,
            voting: voting,
        }
    }
    /**
     * mele.query.gov.**getProposals**
     *
     * Fetch governance module proposals.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Proposals
     *
     * @returns {[Proposal]} proposals - Proposals.
     */
    getProposals(
        voter: string = '',
        depositor: string = '',
        status: string = '',
        page: number = 1,
        limit: number = 100
    ): Promise<Types.Proposal[]> {
        const QueryPath = Keys.Query.QueryPath
        const ProposalsPath = Keys.Query.ProposalsPath

        return this._transport.query<Types.Proposal[]>(
            [],
            JSON.stringify({
                Page: String(page),
                Limit: String(limit),
                Voter: voter,
                Depositor: depositor,
                ProposalStatus: status,
            }),
            QueryPath,
            ProposalsPath
        )
    }

    /**
     * mele.query.gov.**getProposal**
     *
     * Fetch governance module proposal.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Proposal
     *
     * @returns {Proposal} proposal - Proposal.
     */
    getProposal(id: string): Promise<Types.Proposal> {
        const QueryPath = Keys.Query.QueryPath
        const ProposalPath = Keys.Query.ProposalPath

        return this._transport.query<Types.Proposal>(
            [],
            JSON.stringify({
                ProposalID: id,
            }),
            QueryPath,
            ProposalPath
        )
    }

    /**
     * mele.query.gov.**getDeposits**
     *
     * Fetch governance module proposal deposits.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Deposits
     *
     * @returns {[Deposit]} deposits - Deposits.
     */
    getDeposits(id: string): Promise<Types.Deposit[]> {
        const QueryPath = Keys.Query.QueryPath
        const DepositsPath = Keys.Query.DepositsPath

        return this._transport.query<Types.Deposit[]>(
            [],
            JSON.stringify({
                ProposalID: id,
            }),
            QueryPath,
            DepositsPath
        )
    }

    /**
     * mele.query.gov.**getDeposit**
     *
     * Fetch governance module proposal deposit.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Deposit
     *
     * @returns {Deposit} deposit - Deposit.
     */
    getDeposit(id: string, depositor: string): Promise<Types.Deposit> {
        const QueryPath = Keys.Query.QueryPath
        const DepositPath = Keys.Query.DepositPath

        return this._transport.query<Types.Deposit>(
            [],
            JSON.stringify({
                ProposalID: id,
                Depositor: depositor,
            }),
            QueryPath,
            DepositPath
        )
    }

    /**
     * mele.query.gov.**getVotes**
     *
     * Fetch governance module proposal votes.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Votes
     *
     * @returns {[Vote]} votes - Votes.
     */
    getVotes(id: string, page: number = 1, limit: number = 100): Promise<Types.Vote[]> {
        const QueryPath = Keys.Query.QueryPath
        const VotesPath = Keys.Query.VotesPath

        return this._transport.query<Types.Vote[]>(
            [],
            JSON.stringify({
                ProposalID: id,
                Page: String(page),
                Limit: String(limit),
            }),
            QueryPath,
            VotesPath
        )
    }

    /**
     * mele.query.gov.**getVote**
     *
     * Fetch governance module proposal vote.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Vote
     *
     * @returns {Vote} vote - Vote.
     */
    getVote(id: string, voter: string): Promise<Types.Vote> {
        const QueryPath = Keys.Query.QueryPath
        const VotePath = Keys.Query.VotePath

        return this._transport.query<Types.Vote>(
            [],
            JSON.stringify({
                ProposalID: id,
                Voter: voter,
            }),
            QueryPath,
            VotePath
        )
    }

    /**
     * mele.query.gov.**getTally**
     *
     * Fetch governance module proposal tally results.
     *
     * @memberof mele.query.gov
     * @inner
     *
     * @name Tally
     *
     * @returns {TallyResult} tally - Tally results.
     */
    getTally(id: string): Promise<Types.TallyResult> {
        const QueryPath = Keys.Query.QueryPath
        const TallyPath = Keys.Query.TallyPath

        return this._transport.query<Types.TallyResult>(
            [],
            JSON.stringify({
                ProposalID: id,
            }),
            QueryPath,
            TallyPath
        )
    }
}
